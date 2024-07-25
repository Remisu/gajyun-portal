// src/components/Schedule.tsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Assumindo que você já configurou o Firestore
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const Schedule: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [newSchedule, setNewSchedule] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, 'schedules');
      const scheduleSnapshot = await getDocs(schedulesCollection);
      const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(scheduleList);
    };

    fetchSchedules();
  }, []);

  const addSchedule = async () => {
    const schedulesCollection = collection(db, 'schedules');
    await addDoc(schedulesCollection, { name: newSchedule });
    setNewSchedule('');
    // Re-fetch schedules to update the list
    const scheduleSnapshot = await getDocs(schedulesCollection);
    const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(scheduleList);
  };

  const updateSchedule = async (id: string, newName: string) => {
    const scheduleDoc = doc(db, 'schedules', id);
    await updateDoc(scheduleDoc, { name: newName });
    // Re-fetch schedules to update the list
    const scheduleSnapshot = await getDocs(collection(db, 'schedules'));
    const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(scheduleList);
  };

  const deleteSchedule = async (id: string) => {
    const scheduleDoc = doc(db, 'schedules', id);
    await deleteDoc(scheduleDoc);
    // Re-fetch schedules to update the list
    const scheduleSnapshot = await getDocs(collection(db, 'schedules'));
    const scheduleList = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(scheduleList);
  };

  return (
    <div>
      <h1>Escala de Trabalho</h1>
      <input
        type="text"
        value={newSchedule}
        onChange={(e) => setNewSchedule(e.target.value)}
        placeholder="Nova escala"
      />
      <button onClick={addSchedule}>Adicionar</button>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            <input
              type="text"
              value={schedule.name}
              onChange={(e) => updateSchedule(schedule.id, e.target.value)}
            />
            <button onClick={() => deleteSchedule(schedule.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;