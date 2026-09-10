import React from 'react'
import { assets } from '../assets/assets'
import hero_img_cutout from '../assets/hero_final_clean_headshot.png'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 overflow-hidden'>
      {/* Hero Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'
      >
        <div className='text-[#414141]'>
          <div className="flex items-center gap-2">
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed uppercase'>Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </motion.div>
      {/* Hero Right Side - Dual Display */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='w-full sm:w-1/2 bg-[#fbd3d0] flex items-end justify-center overflow-hidden'
      >
        <div className='flex w-full h-full items-end'>
          <motion.img 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className='w-1/2 h-auto object-cover' 
            src={hero_img_cutout} 
            alt="User Profile" 
          />
          <motion.img 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='w-1/2 h-auto object-cover' 
            src={assets.hero_img} 
            alt="Brand Model" 
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
