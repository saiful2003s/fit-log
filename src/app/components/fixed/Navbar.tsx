import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div className=" bg-base-100 shadow-md px-2 sticky top-0 z-50">

            <nav className='container navbar mx-auto px-4 py-2 '>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Workouts</a></li>
                            <li><a>My Plan</a></li>
                        </ul>
                    </div>
                    <div className='flex justify-center gap-2'>
                        <Image src='/logo.png' alt='logo' width={32} height={32} />
                        <span className="text-xl font-bold tracking-wide"> FITLOG </span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Workouts</a></li>
                        <li><a>My Plan</a></li>
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <button className="btn btn-sm bg-transparent border-none shadow-none p-0"> Plan <span className="badge bg-[#C2F800] text-black rounded-full w-6 h-6 p-0 flex items-center justify-center">0</span>
                    </button>
                    <button className="btn btn-sm bg-transparent border-none shadow-none p-0"> Saved
                        <span className="badge bg-transparent border border-gray-400 text-white rounded-full w-6 h-6 p-0 flex items-center justify-center">
                            0
                        </span>
                    </button>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;