import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, Typography } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';

interface Task {
  id?: string;  // Torna o `id` opcional
  description: string;
  taskTypeID: string;
  days: string[];
}

const ScheduleManagement: React.FC = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [checklistTypes, setChecklistTypes] = useState<any[]>([]);
  const [taskTypes, setTaskTypes] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [shifts, setShifts] = useState<any[]>([]);
  const [newEmployee, setNewEmployee] = useState({ email: '', name: '' });
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [newChecklistType, setNewChecklistType] = useState('');
  const [editingCheckListType, setEditingCheckListType] = useState<any>(null);
  const [newTaskType, setNewTaskType] = useState('');
  const [editingTaskType, setEditingTaskType] = useState<any>(null);
  const [newTask, setNewTask] = useState<Task>({ description: '', taskTypeID: '', days: [] });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
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
  }, [user, allowedEmails]); // Adicione `allowedEmails` à lista de dependências

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

  const updateEmployee = async () => {
    if (editingEmployee) {
      const employeeDoc = doc(db, 'employees', editingEmployee.id);
      await updateDoc(employeeDoc, {
        email: editingEmployee.email,
        name: editingEmployee.name
      });
      setEditingEmployee(null);
      const employeesSnapshot = await getDocs(collection(db, 'employees'));
      setEmployees(employeesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const updateCheckListType = async () => {
    if (editingCheckListType) {
      const checkListTypeDoc = doc(db, 'checklistTypes', editingCheckListType.id);
      await updateDoc(checkListTypeDoc, {
        description: editingCheckListType.description
      });
      setEditingCheckListType(null);
      
      // Atualiza manualmente a lista de checklist types no estado
      setChecklistTypes((prevChecklistTypes) =>
        prevChecklistTypes.map((type) =>
          type.id === editingCheckListType.id
            ? { ...type, description: editingCheckListType.description }
            : type
        )
      );
    }
  };

  const updateTaskType = async () => {
    if (editingTaskType) {
      const taskTypeDoc = doc(db, 'taskTypes', editingTaskType.id);
      await updateDoc(taskTypeDoc, {
        description: editingTaskType.description
      });
      setEditingTaskType(null);
      const taskTypesSnapshot = await getDocs(collection(db, 'taskTypes'));
      setTaskTypes(taskTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const updateTask = async () => {
    if (editingTask && editingTask.id) { // Verifica se `id` existe
      const taskDoc = doc(db, 'tasks', editingTask.id);
      await updateDoc(taskDoc, {
        description: editingTask.description,
        taskTypeID: editingTask.taskTypeID,
        days: editingTask.days
      });
      setEditingTask(null);
      const tasksSnapshot = await getDocs(collection(db, 'tasks'));
      setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task)));
    } else {
      console.error("Task ID is undefined. Cannot update task without an ID.");
    }
  };

  if (!user) {
    return <Typography>Acesso negado. Por favor, faça login com um email autorizado.</Typography>;
  }

  return (
    <Container>
      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Employees" />
        <Tab label="Checklist Types" />
        <Tab label="Task Types" />
        <Tab label="Tasks" />
        <Tab label="Shifts" />
      </Tabs>      
      {tabIndex === 0 && (
        <>
          {editingEmployee ? (
            <>
              <TextField
                label="Edit Employee email"
                variant="outlined"
                value={editingEmployee.email}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Edit Employee name"
                variant="outlined"
                value={editingEmployee.name}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={updateEmployee} style={{ marginBottom: '20px' }}>
                Update Employee
              </Button>
              <Button variant="contained" onClick={() => setEditingEmployee(null)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Employee email"
                variant="outlined"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Employee name"
                variant="outlined"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={addEmployee} style={{ marginBottom: '20px' }}>
                Add Employee
              </Button>
            </>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => deleteEmployee(employee.id)}>
                        Delete
                      </Button>
                      <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={() => setEditingEmployee(employee)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {tabIndex === 1 && (
  <>
    {editingCheckListType ? (
      <>
        <TextField
          label="Edit Checklist Type"
          variant="outlined"
          value={editingCheckListType.description}
          onChange={(e) => setEditingCheckListType({ ...editingCheckListType, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={updateCheckListType} style={{ marginBottom: '20px' }}>
          Update Checklist Type
        </Button>
        <Button variant="contained" onClick={() => setEditingCheckListType(null)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </>
    ) : (
      <>
        <TextField
          label="Add new checklist type"
          variant="outlined"
          value={newChecklistType}
          onChange={(e) => setNewChecklistType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addChecklistType} style={{ marginBottom: '20px' }}>
          Add Checklist Type
        </Button>
      </>
    )}

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {checklistTypes.map(checklistType => (
            <TableRow key={checklistType.id}>
              <TableCell>{checklistType.description}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => deleteChecklistType(checklistType.id)}>
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setEditingCheckListType(checklistType)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)}
      {tabIndex === 2 && (
  <>
    {editingTaskType ? (
      <>
        <TextField
          label="Edit Task Type"
          variant="outlined"
          value={editingTaskType.description}
          onChange={(e) => setEditingTaskType({ ...editingTaskType, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={updateTaskType} style={{ marginBottom: '20px' }}>
          Update Task Type
        </Button>
        <Button variant="contained" onClick={() => setEditingTaskType(null)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Typography variant="h6" component="h2" gutterBottom>
          Task Types
        </Typography>
        <TextField
          label="Add new task type"
          variant="outlined"
          value={newTaskType}
          onChange={(e) => setNewTaskType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addTaskType} style={{ marginBottom: '20px' }}>
          Add Task Type
        </Button>
      </>
    )}

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskTypes.map(taskType => (
            <TableRow key={taskType.id}>
              <TableCell>{taskType.description}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => deleteTaskType(taskType.id)}>
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setEditingTaskType(taskType)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)}
 {tabIndex === 3 && (
  <>
    {editingTask ? (
      <>
        <TextField
          label="Edit Task Description"
          variant="outlined"
          value={editingTask.description}
          onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={editingTask.days.includes(day)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updatedDays = e.target.checked
                    ? [...editingTask.days, day]
                    : editingTask.days.filter(d => d !== day);
                  setEditingTask({ ...editingTask, days: updatedDays });
                }}
              />
            }
            label={day}
          />
        ))}
        <TextField
          select
          label="Edit Task Type"
          variant="outlined"
          value={editingTask.taskTypeID}
          onChange={(e) => setEditingTask({ ...editingTask, taskTypeID: e.target.value })}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option aria-label="None" value="" />
          {taskTypes.map((taskType) => (
            <option key={taskType.id} value={taskType.id}>
              {taskType.description}
            </option>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={updateTask} style={{ marginBottom: '20px' }}>
          Update Task
        </Button>
        <Button variant="contained" onClick={() => setEditingTask(null)} style={{ marginBottom: '20px', marginLeft: '10px' }}>
          Cancel
        </Button>
      </>
    ) : (
      <>
        <Typography variant="h6" component="h2" gutterBottom>
          Tasks
        </Typography>
        <TextField
          label="Task Description"
          variant="outlined"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Task Type"
          variant="outlined"
          value={newTask.taskTypeID}
          onChange={(e) => setNewTask({ ...newTask, taskTypeID: e.target.value })}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option aria-label="None" value="" />
          {taskTypes.map((taskType) => (
            <option key={taskType.id} value={taskType.id}>
              {taskType.description}
            </option>
          ))}
        </TextField>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={newTask.days.includes(day)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updatedDays = e.target.checked
                    ? [...newTask.days, day]
                    : newTask.days.filter((d) => d !== day);
                  setNewTask({ ...newTask, days: updatedDays });
                }}
              />
            }
            label={day}
          />
        ))}
        <Button variant="contained" color="primary" onClick={addTask} style={{ marginBottom: '20px' }}>
          Add Task
        </Button>
      </>
    )}

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Task Type</TableCell>
            <TableCell>Days</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.description}</TableCell>
              <TableCell>{taskTypes.find(tt => tt.id === task.taskTypeID)?.description || task.taskTypeID}</TableCell>
              <TableCell>{task.days.join(', ')}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setEditingTask(task)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
)}
      {tabIndex === 4 && (
        <>
          <TextField
            label="Employee ID"
            variant="outlined"
            value={newShift.employeeID}
            onChange={(e) => setNewShift({ ...newShift, employeeID: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Checklist Type ID"
            variant="outlined"
            value={newShift.checklistTypeID}
            onChange={(e) => setNewShift({ ...newShift, checklistTypeID: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Shift Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={newShift.shiftDate}
            onChange={(e) => setNewShift({ ...newShift, shiftDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addShift} style={{ marginBottom: '20px' }}>
            Add Shift
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Checklist Type ID</TableCell>
                  <TableCell>Shift Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shifts.map(shift => (
                  <TableRow key={shift.id}>
                    <TableCell>{shift.employeeID}</TableCell>
                    <TableCell>{shift.checklistTypeID}</TableCell>
                    <TableCell>{shift.shiftDate}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => deleteShift(shift.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ScheduleManagement;