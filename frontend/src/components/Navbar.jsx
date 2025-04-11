import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex justify-between p-4 items-center bg-blue-800'>
      <NavLink to="/"><h1 className='text-xl font-bold text-white'>Job Tracker</h1></NavLink>
      <NavLink to="/add">
        <button className='hover:bg-blue-500 p-3 border-[0px] rounded cursor-pointer text-white '>
          Add
        </button>
      </NavLink>
    </div>
  )
}

export default Navbar
