import React from 'react'
import { assets } from '../assets/assets';
import anmole_logo from '../assets/anmole_logo.png'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={anmole_logo} className='mb-5 w-52' alt="Anmol Studio" />
            <p className='w-full md:w-2/3 text-gray-600'>
                Explore our newest arrivals, curated with style and quality to transform your wardrobe with the latest fashion trends from Anmol Studio. We are committed to providing high-quality products and an exceptional shopping experience for every customer.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91-739-886-7267</li>
                <li>anmoldubey2310@gmail.com</li>
                <li><a href="https://www.linkedin.com/in/anmol23" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
        </div>


      </div>
        <div>
            <hr className='text-gray-500'/>
            <p className='py-5 text-sm text-center'>Copyright 2026 @ anmoldubey2310@gmail.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer