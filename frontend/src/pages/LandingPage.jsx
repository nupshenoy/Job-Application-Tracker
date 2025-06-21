import React from 'react'
import { NavLink } from 'react-router-dom'

function LandingPage() {
  return (
    <div className='min-h-screen bg-gray-100 text-center flex justify-center'>
      <div className="flex flex-col items-center pt-[300px]">
      <p className='text-8xl font-semibold '>
    Welcome
      </p>
      <div className="flex gap-3 mt-5">
        <NavLink 
        to={'/login'}
        className='border rounded px-6 py-2 bg-white text-black text-3xl border-gray-200 font-semibold cursor-pointer hover:bg-gray-100'>
          Sign In
          </NavLink>
        
        
        <NavLink 
        to={'/register'}
        className='border rounded px-6 py-2 bg-white text-black text-3xl border-gray-200 font-semibold cursor-pointer hover:bg-gray-100'>  
          Register
          </NavLink>
      </div>
      </div>
      </div>
  )
}

export default LandingPage