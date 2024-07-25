import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';
import { Tabs, Tab } from '@mui/material';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4285f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ae8;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const ScheduleManagement: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [checklistTypes, setChecklistTypes] = useState<any[]>([]);
  const [taskTypes, setTaskTypes] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [newEmployee, setNewEmployee] = useState({ email: '', name: '' });
  const [newChecklistType, setNewChecklistType] = useState('');
  const [newTaskType, setNewTaskType] = useState('');
  const [newTask, setNewTask] = useState({ description: '', taskTypeID: '', days: [] });
  const [newShift, setNewShift] = useState({ employeeID: '', checklistTypeID: '', shiftDate: '' });
  const [user, setUser] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const allowedEmails = ['emersongne@gmail.com'];

  useEffect(() => {
    const fetchCollections = async () => {
      if (user) {
        const employeesCollection = collection(db, 'employees');
        const checklistTypesCollection = collection(db, 'checklistTypes');
        const taskTypesCollection = collection(db, 'taskTypes');
        const tasksCollection = collection(db, 'tasks');
        const shiftsCollection = collection(db, 'shifts');

        const employeesSnapshot = await getDocs(employeesCollection);
        const checklistTypesSnapshot = await getDocs(checklistTypesCollection);
        const taskTypesSnapshot = await getDocs(taskTypesCollection);
        const tasksSnapshot = await getDocs(tasksCollection);
        const shiftsSnapshot = await getDocs(shiftsCollection);

        setEmployees(employeesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setChecklistTypes(checklistTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setTaskTypes(taskTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setShifts(shiftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && allowedEmails.includes(currentUser.email || '')) {
        setUser(currentUser);
        fetchCollections();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const addEmployee = async () => {
    const employeesCollection = collection(db, 'employees');
    await addDoc(employeesCollection, { email: newEmployee.email, name: newEmployee.name });
    setNewEmployee({ email: '', name: '' });
    const employeesSnapshot = await getDocs(employeesCollection);
    setEmployees(employeesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addChecklistType = async () => {
    const checklistTypesCollection = collection(db, 'checklistTypes');
    await addDoc(checklistTypesCollection, { description: newChecklistType });
    setNewChecklistType('');
    const checklistTypesSnapshot = await getDocs(checklistTypesCollection);
    setChecklistTypes(checklistTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addTaskType = async () => {
    const taskTypesCollection = collection(db, 'taskTypes');
    await addDoc(taskTypesCollection, { description: newTaskType });
    setNewTaskType('');
    const taskTypesSnapshot = await getDocs(taskTypesCollection);
    setTaskTypes(taskTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addTask = async () => {
    const tasksCollection = collection(db, 'tasks');
    await addDoc(tasksCollection, {
      description: newTask.description,
      taskTypeID: newTask.taskTypeID,
      days: newTask.days
    });
    setNewTask({ description: '', taskTypeID: '', days: [] });
    const tasksSnapshot = await getDocs(tasksCollection);
    setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addShift = async () => {
    const shiftsCollection = collection(db, 'shifts');
    await addDoc(shiftsCollection, {
      employeeID: newShift.employeeID,
      checklistTypeID: newShift.checklistTypeID,
      shiftDate: newShift.shiftDate
    });
    setNewShift({ employeeID: '', checklistTypeID: '', shiftDate: '' });
    const shiftsSnapshot = await getDocs(shiftsCollection);
    setShifts(shiftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteEmployee = async (id: string) => {
    const employeeDoc = doc(db, 'employees', id);
    await deleteDoc(employeeDoc);
    const employeesSnapshot = await getDocs(collection(db, 'employees'));
    setEmployees(employeesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteChecklistType = async (id: string) => {
    const checklistTypeDoc = doc(db, 'checklistTypes', id);
    await deleteDoc(checklistTypeDoc);
    const checklistTypesSnapshot = await getDocs(collection(db, 'checklistTypes'));
    setChecklistTypes(checklistTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteTaskType = async (id: string) => {
    const taskTypeDoc = doc(db, 'taskTypes', id);
    await deleteDoc(taskTypeDoc);
    const taskTypesSnapshot = await getDocs(collection(db, 'taskTypes'));
    setTaskTypes(taskTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
    const tasksSnapshot = await getDocs(collection(db, 'tasks'));
    setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const deleteShift = async (id: string) => {
    const shiftDoc = doc(db, 'shifts', id);
    await deleteDoc(shiftDoc);
    const shiftsSnapshot = await getDocs(collection(db, 'shifts'));
    setShifts(shiftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  if (!user) {
    return <p>Acesso negado. Por favor, faça login com um email autorizado.</p>;
  }

  return (
    <Container>
      <h1>Schedule Management</h1>
      <Tabs value={tabIndex} onChange={(e: React.ChangeEvent<{}>, newValue: number) => setTabIndex(newValue)}>
        <Tab label="Employees" />
        <Tab label="Checklist Types" />
        <Tab label="Task Types" />
        <Tab label="Tasks" />
        <Tab label="Shifts" />
      </Tabs>
      {tabIndex === 0 && (
        <>
          <Form>
            <h2>Employees</h2>
            <Input
              type="email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              placeholder="Employee email"
            />
            <Input
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              placeholder="Employee name"
            />
            <Button onClick={addEmployee}>Add Employee</Button>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {employees.map(employee => (
    <tr key={employee.id}>
      <td>{employee.email}</td>
      <td>{employee.name}</td>
    </tr>
  ))}
</tbody>
      </Table>
    </>
  )}
  {tabIndex === 1 && (
    <>
      <Form>
        <h2>Checklist Types</h2>
        <Input
          type="text"
          value={newChecklistType}
          onChange={(e) => setNewChecklistType(e.target.value)}
          placeholder="Add new checklist type"
        />
        <Button onClick={addChecklistType}>Add Checklist Type</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {checklistTypes.map(checklistType => (
            <tr key={checklistType.id}>
              <td>{checklistType.description}</td>
              <td>
                <Button onClick={() => deleteChecklistType(checklistType.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )}
  {tabIndex === 2 && (
    <>
      <Form>
        <h2>Task Types</h2>
        <Input
          type="text"
          value={newTaskType}
          onChange={(e) => setNewTaskType(e.target.value)}
          placeholder="Add new task type"
        />
        <Button onClick={addTaskType}>Add Task Type</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskTypes.map(taskType => (
            <tr key={taskType.id}>
              <td>{taskType.description}</td>
              <td>
                <Button onClick={() => deleteTaskType(taskType.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )}
  {tabIndex === 3 && (
    <>
      <Form>
        <h2>Tasks</h2>
        <Input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task description"
        />
        <Input
          type="text"
          value={newTask.taskTypeID}
          onChange={(e) => setNewTask({ ...newTask, taskTypeID: e.target.value })}
          placeholder="Task Type ID"
        />
        <Button onClick={addTask}>Add Task</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Task Type ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.description}</td>
              <td>{task.taskTypeID}</td>
              <td>
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )}
  {tabIndex === 4 && (
    <>
      <Form>
        <h2>Shifts</h2>
        <Input
          type="text"
          value={newShift.employeeID}
          onChange={(e) => setNewShift({ ...newShift, employeeID: e.target.value })}
          placeholder="Employee ID"
        />
        <Input
          type="text"
          value={newShift.checklistTypeID}
          onChange={(e) => setNewShift({ ...newShift, checklistTypeID: e.target.value })}
          placeholder="Checklist Type ID"
        />
        <Input
          type="date"
          value={newShift.shiftDate}
          onChange={(e) => setNewShift({ ...newShift, shiftDate: e.target.value })}
          placeholder="Shift Date"
        />
        <Button onClick={addShift}>Add Shift</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Checklist Type ID</th>
            <th>Shift Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map(shift => (
            <tr key={shift.id}>
              <td>{shift.employeeID}</td>
              <td>{shift.checklistTypeID}</td>
              <td>{shift.shiftDate}</td>
              <td>
                <Button onClick={() => deleteShift(shift.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )}
</Container>
);
};

export default ScheduleManagement;