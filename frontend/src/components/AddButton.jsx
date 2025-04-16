import React from 'react'
import { NavLink } from 'react-router-dom'

import { IoAdd } from "react-icons/io5";

const AddButton = () => {
  return (
    <NavLink to="/add">
    <div className='text-md bg-blue-500 text-white flex items-center border rounded-lg px-3 py-2 hover:bg-blue-400 '>
   <span className='text-lg mr-1'><IoAdd /></span>
     New Job
    </div>
  </NavLink>
  )
}

export default AddButton
