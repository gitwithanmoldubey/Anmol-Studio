import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContextObject'
import anmole_logo from '../assets/anmole_logo.png'

const Navbar = () => {
    const [visible, setVisible] = useState(false);

    const { getCartCount, navigate, token, setToken, setCartItems, setShowSearch } = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to='/'><img src={anmole_logo} className='w-40 md:w-52 logo-integrated' alt="Anmol Studio" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p>HOME</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p>COLLECTION</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p>ABOUT</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p>CONTACT</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <svg onClick={() => setShowSearch(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <div className="group relative">
                    <svg onClick={() => token ? null : navigate('/login')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    {/* Dropdown Menu */}
                    {token &&
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>}
                </div>
                <Link to="/cart" className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    <p className='absolute right-[-5px] bottom-[-5px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] w-4'>{getCartCount()}</p>
                </Link>

                <a href='http://localhost:5174/' target='_blank' rel='noreferrer' className='hidden sm:block border px-5 py-2 text-xs rounded-full hover:bg-black hover:text-white transition-all duration-300'>Admin Panel</a>
                <svg onClick={() => setVisible(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer sm:hidden">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

            {/* Sidebar menu for small screens*/}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar
