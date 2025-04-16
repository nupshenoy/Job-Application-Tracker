import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex justify-between p-4 items-center bg-blue-800'>
      <NavLink to="/"><h1 className='text-xl font-bold text-white'>Job Tracker</h1></NavLink>
      
    </div>
  )
}

export default Navbar
