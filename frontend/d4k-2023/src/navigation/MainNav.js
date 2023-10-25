import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import faq from "../images/icons/FAQ.png"
import menu from "../images/icons/menu.png"
import order from "../images/icons/order.png"
import donate from "../images/icons/donate.png"
import queue from "../images/icons/queue.png"
import leaderboard from "../images/icons/leaderboard.png"
import closeTab from "../images/icons/closeTab.png"

const MainNav = (props) => {

    // retrieve username from localStorage if there
    let localStorageUsername = localStorage.getItem('storedUsername')

    const [ hamburgerOpen, setHamburgerOpen ] = useState(false)

    const hamburgerHandler = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div className= { props.navClass ? props.navClass : "nav-container bg-green-600 p-5 top-0 fixed w-full z-50"}>

            <div className="m-auto max-w-md">

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

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/faq" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ faq } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>FAQ</p>
                            </NavLink>
                        </li>

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/menu" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ menu } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>Menu</p>
                            </NavLink>
                        </li>

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/order" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ order } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>Order</p>
                            </NavLink>
                        </li>

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/donate" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ donate } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>Donate</p>
                            </NavLink>
                        </li>

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/queue" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ queue } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>Queue</p>
                            </NavLink>
                        </li>

                        <li className="ml-1.5 my-4 uppercase text-white">
                            <NavLink to="/leaderboard" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                <img src={ leaderboard } alt = "faq-icon" className="w-7 mr-5"/>
                                <p>Leaderboard</p>
                            </NavLink>
                        </li>

                        {
                            localStorageUsername && 
                            <li className="ml-1.5 my-4 uppercase text-white">
                                <NavLink to="/pay" className={ ({isActive}) => isActive ? "flex items-center font-extrabold text-lg" : "flex items-center"}>
                                    <img src={ closeTab } alt = "faq-icon" className="w-7 mr-5"/>
                                    <p>Close Your Tab</p>
                                </NavLink>
                            </li>
                        }

                        {/* <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/admin">
                                <p>Admin</p>
                            </NavLink>
                        </li>

                        <li className="border-b border-white ml-2 my-2 uppercase text-white">
                            <NavLink to="/tabs">
                                <p>Tabs</p>
                            </NavLink>
                        </li> */}

                    </ul>

                </div>
            }

            </div>

        </div>
    )
}

export default MainNav