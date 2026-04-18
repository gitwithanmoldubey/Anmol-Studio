import React from 'react'
import { assets  } from '../assets/assets';
import anmole_logo from '../assets/anmole_logo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img src={anmole_logo} className='w-40 md:w-52 logo-integrated' alt="Anmol Studio" />
      <button onClick={() => setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
