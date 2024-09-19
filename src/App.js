import React, { useState, useEffect } from 'react';
import axios from './api';
import UserTable from './components/UserTabel';
import SignUpForm from './components/SignUpForm';
import ExportButton from './components/ExportButton';
import './App.css'
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  // Fetch users on component mount
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]); 
      }
    };
  
    fetchUsers();
  }, []);
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers(); 
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUserAdd = async (newUser) => {
    try {
      await axios.post('/users', newUser);
      setShowSignUpForm(false);
      fetchUsers(); 
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUserSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  return (
    <div className="App">
      <h1>User Management System</h1>
      <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
      <UserTable users={users} onDelete={handleUserDelete} onSelect={handleUserSelect} />
      <ExportButton selectedUsers={selectedUsers} />
      {showSignUpForm && <SignUpForm onAddUser={handleUserAdd} onCancel={() => setShowSignUpForm(false)} />}
    </div>
  );
}

export default App;
