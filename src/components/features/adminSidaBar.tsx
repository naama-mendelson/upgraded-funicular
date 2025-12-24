import React from 'react'
import { Link } from 'react-router-dom'

const adminSidaBar = () => {
  return (<>
    <div>adminSidaBar</div>
    <button><Link to="dashboard/admin/status">Users Management </Link></button>
    <button><Link to="/tickets" >klick me to go to tickets</Link></button>
    <button><Link to="/users">Users List</Link></button>
    <button><Link to="/newUser">Create New User</Link></button>
    </>
  )
}

export default adminSidaBar