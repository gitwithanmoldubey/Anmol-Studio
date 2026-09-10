import React from 'react'
import Title from '../components/Title'
import contact_img from '../assets/contact_final.jpg'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t border-gray-200'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={contact_img} alt="" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Mirzapur, Uttar Pradesh <br /> India</p>
          <p className='text-gray-500'>Tel: +91 7398867267 <br /> Email: anmoldubey2310@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Connect with me</p>
          <p className='text-gray-500'>Follow me on LinkedIn for more updates.</p>
          <a href="https://www.linkedin.com/in/anmol23" target="_blank" rel="noopener noreferrer" className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 text-center'>Visit LinkedIn</a>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default Contact
