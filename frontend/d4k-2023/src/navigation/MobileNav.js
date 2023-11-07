import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./MobileNav.css"
import { NavLink } from "react-router-dom";
import { faCandyCane, faCocktail, faGift, faIgloo, faPeopleGroup, faMedal } from "@fortawesome/free-solid-svg-icons";

const MainNav = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const isLocal = window.location.hostname.includes("localhost")
    const isPartyDate = new Date() >= new Date('12/16/2023')
    const showOrderingNav = isLocal || isPartyDate
    
    return (
    <div className="outer-menu">
        <input id="nav-checkbox" 
            className="checkbox-toggle" 
            onChange={(event) => setIsChecked(event.currentTarget.checked)}
            checked={isChecked}type="checkbox" />
        <div className="hamburger bg-green-600 border-2 border-slate-200">
            <div></div>
        </div>
        <div className="menu">
            <div>
                <div className="grid text-center opacity-0 transition-opacity ease-in-out text-2xl">
                    <NavLink
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`}
                        onClick={() => setIsChecked(!isChecked)} to="/">
                        <FontAwesomeIcon className="mx-1" icon={faIgloo} /> Home
                    </NavLink>

                    <NavLink
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`}
                        onClick={() => setIsChecked(!isChecked)} to="/faq">
                        <FontAwesomeIcon className="mx-1" icon={faCandyCane} />Info
                    </NavLink>

                    {showOrderingNav && <NavLink 
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`} 
                        onClick={() => setIsChecked(!isChecked)} to="/leaderboard">
                        <FontAwesomeIcon className="mx-1" icon={faMedal} />Leaderboard
                    </NavLink>}
                
                    {showOrderingNav && <NavLink 
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`} 
                        onClick={() => setIsChecked(!isChecked)} to="/queue">
                        <FontAwesomeIcon className="mx-1" icon={faPeopleGroup} />Queue
                    </NavLink>}
            
                    {showOrderingNav && <NavLink
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`}
                        onClick={() => setIsChecked(!isChecked)} to="/order">
                        <FontAwesomeIcon className="mx-1" icon={faGift} />Order
                    </NavLink>}
            
                    <NavLink
                        className={ ({isActive}) => `py-4 ${isActive ? "font-extrabold text-rose-500" : ""}`}
                        onClick={() => setIsChecked(!isChecked)} to="/menu">
                        <FontAwesomeIcon className="mx-1" icon={faCocktail} />Menu
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MainNav