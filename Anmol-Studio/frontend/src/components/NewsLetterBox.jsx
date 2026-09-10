import React from 'react'
import { motion } from 'framer-motion'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className='text-center glass-modern py-20 px-8 rounded-3xl my-24 shadow-sm'
    >
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-4'>Subscribe to our newsletter and get 20% off your first order!</p>
      <form onSubmit={onSubmitHandler} className='my-6 w-full sm:w-1/2 flex items-center gap-3 mx-auto border border-gray-200 pl-3'>
        <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required/> 
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </motion.div>
  )
}

export default NewsLetterBox
