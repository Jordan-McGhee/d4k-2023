import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {

    const [ hamburgerOpen, setHamburgerOpen ] = useState(false)

    const hamburgerHandler = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div className="nav-container bg-green-700/100 p-5 top-0 sticky">

            {/* CLOSED HAMBURGER */}

            {
                !hamburgerOpen &&
                <div className="flex items-center">

                    <div className="space-y-2 mr-6 justify-start" onClick={ hamburgerHandler } >
                        <span className="block h-0.5 w-8 bg-white"></span>
                        <span className="block h-0.5 w-8 bg-white"></span>
                        <span className="block h-0.5 w-8 bg-white"></span>
                    </div>

                    <NavLink to="/" className=''>
                        <h1 className="text-4xl font-bold text-white">D4K</h1>
                    </NavLink>
                </div>
            }

            {/* OPEN HAMBURGER */}

            {
                hamburgerOpen &&
                <div className=""  onClick={ hamburgerHandler }>

                    <div className="flex items-center">

                        <svg
                            className="h-8 w-8 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>

                        <NavLink to="/" className='ml-5'>
                            <h1 className="text-4xl font-bold text-white">D4K</h1>
                        </NavLink>
                    </div>

                    <ul className="NAVIGATION-MOBILE-OPEN flex flex-col items-start justify-between">

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/faq">
                                <p>FAQ</p>
                            </NavLink>
                        </li>

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/menu">
                                <p>Menu</p>
                            </NavLink>
                        </li>

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/order">
                                <p>Order</p>
                            </NavLink>
                        </li>

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/queue">
                                <p>Queue</p>
                            </NavLink>
                        </li>

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/admin">
                                <p>Admin</p>
                            </NavLink>
                        </li>

                    </ul>

                </div>
            }
        </div>
    )
}

export default MainNav