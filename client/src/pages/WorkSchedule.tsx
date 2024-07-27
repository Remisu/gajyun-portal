import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Typography } from '@mui/material';

const localizer = momentLocalizer(moment);

const WorkSchedule: React.FC = () => {
  const [shifts, setShifts] = useState<any[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      const shiftsCollection = collection(db, 'shifts');
      const shiftsSnapshot = await getDocs(shiftsCollection);
      setShifts(shiftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchShifts();
  }, []);

  const events = shifts.map(shift => ({
    title: `Employee ID: ${shift.employeeID}, Checklist Type ID: ${shift.checklistTypeID}`,
    start: new Date(shift.shiftDate),
    end: new Date(shift.shiftDate)
  }));

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Work Schedule
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </Container>
  );
};

export default WorkSchedule;