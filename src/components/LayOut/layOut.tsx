import React from 'react'
import Header from './Header'
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import AdminSidaBar from '../features/adminSidaBar';

const LayOut = () => {
  const { state } = useAuth();
  return (
    <div>
      <Header />
      {state.user?.role==='admin' ?( 
        <div>
          <AdminSidaBar />
          <main>
            <Outlet/>
          </main>
          </div>
      ) :
      
      <Outlet/>
    }
    </div>
  )
}

export default LayOut

