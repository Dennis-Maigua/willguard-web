import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { isAuth, signout } from '../auth/helpers';
import Logo from '../assets/logo.png';
import Avatar from '../assets/avatar.png';

const Layout = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [toggled, setToggled] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const isActive = (path) => {
        return pathname === path ? 'text-red-500' : 'text-white';
    }

    const handleLogout = async () => {
        const confirmDelete = window.confirm('Are you sure you want to log out?');

        if (confirmDelete) {
            signout(() => {
                navigate('/signin');
            });
        }
    };

    return (
        <div>
            <nav className='bg-gray-900 text-white'>
                <div className='max-w-7xl mx-auto p-4 flex items-center justify-between'>
                    <div>
                        <NavLink to='/' className='flex gap-2'>
                            <img src={Logo} className='h-8' alt='logo' />
                            <span className='text-2xl font-bold'> WillGuard </span>
                        </NavLink>
                    </div>

                    <div className={`md:bg-transparent bg-gray-800 md:static absolute md:p-0 p-6 left-0 md:w-auto w-full md:flex ${toggled ? 'block top-[60px]' : 'hidden'}`}>
                        <ul className='flex md:flex-row flex-col md:gap-8 gap-5 font-medium'>
                            <li>
                                <NavLink to='/' className={`hover:text-red-500 ${isActive('/')}`}> Home </NavLink>
                            </li>
                            <li>
                                <NavLink to='/services' className={`hover:text-red-500 ${isActive('/services')}`}> Services </NavLink>
                            </li>
                            <li>
                                <NavLink to='/about' className={`hover:text-red-500 ${isActive('/about')}`}> About Us</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className={`hover:text-red-500 ${isActive('/contact')}`}> Contact </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className='flex gap-4 font-medium'>
                        {!isAuth() && (
                            <div className='flex gap-4'>
                                <NavLink to='/signin' className='py-2 px-4 text-sm text-black hover:text-white bg-slate-50 hover:bg-red-500 shadow rounded'> Get Started </NavLink>
                            </div>
                        )}

                        {isAuth() && isAuth().role === 'subscriber' && (
                            <div>
                                <div className='flex items-center gap-2 cursor-pointer' onMouseEnter={() => { setDropdown(!dropdown) }}>
                                    <img src={isAuth().profile || Avatar} alt='avatar' className='h-8 w-8 rounded-full object-cover border' />
                                    <span> {isAuth().name} </span>
                                </div>

                                {dropdown ? (
                                    <div className='bg-gray-800 absolute md:right-2 right-12 top-[60px] p-6'>
                                        <ul className='flex flex-col gap-5'>
                                            <li>
                                                <NavLink to='/user' className={`hover:text-red-500 ${isActive('/user')}`}> Profile </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/lockscreen' className={`hover:text-red-500 ${isActive('/lockscreen')}`}> Lock Screen </NavLink>
                                            </li>
                                            <li>
                                                <span onClick={handleLogout} className='hover:text-red-500 cursor-pointer'> Log Out </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                    : null}
                            </div>
                        )}

                        {isAuth() && isAuth().role === 'admin' && (
                            <div>
                                <div className='flex items-center gap-2 cursor-pointer' onMouseEnter={() => { setDropdown(!dropdown) }}>
                                    <img src={isAuth().profile || Avatar} alt='avatar' className='h-8 w-8 rounded-full object-cover border' />
                                    <span> {isAuth().name} </span>
                                </div>

                                {dropdown ? (
                                    <div className='bg-gray-800 absolute md:right-2 right-12 top-[60px] p-6'>
                                        <ul className='flex flex-col gap-5'>
                                            <li>
                                                <NavLink to='/admin' className={`hover:text-red-500 ${isActive('/admin')}`}> Profile </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/dashboard' className={`hover:text-red-500 ${isActive('/dashboard')}`}> Dashboard </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to='/lockscreen' className={`hover:text-red-500 ${isActive('/lockscreen')}`}> Lock Screen </NavLink>
                                            </li>
                                            <li>
                                                <span onClick={handleLogout} className='hover:text-red-500 cursor-pointer'> Log Out </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                    : null}
                            </div>
                        )}

                        <button
                            type='button'
                            className='md:hidden px-2 rounded-lg'
                            onClick={() => { setToggled(!toggled) }}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {!toggled ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )
                                    : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    )
                                }
                            </svg>
                        </button>
                    </div>
                </div>
            </nav >

            <div className='py-10 px-4'>
                {children}
            </div>
        </div >
    );
};

export default Layout;