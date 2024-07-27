import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div style={{ display: 'flex' }}>
      {user && <Sidebar />}
      <div style={{ flex: 1, padding: '20px 40px', marginLeft: '250px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;