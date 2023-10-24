import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./MobileNav.css"
import { NavLink } from "react-router-dom";
import faq from "../images/icons/FAQ.png"
import menu from "../images/icons/menu.png"
import order from "../images/icons/order.png"
import donate from "../images/icons/donate.png"
import queue from "../images/icons/queue.png"
import leaderboard from "../images/icons/leaderboard.png"
import closeTab from "../images/icons/closeTab.png"
import { faCandyCane, faCocktail, faGift, faHandHoldingHeart, faIgloo, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const MainNav = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    // retrieve username from localStorage if there
    let localStorageUsername = localStorage.getItem('storedUsername')

    return (
    <div className="outer-menu">
        <input id="nav-checkbox" 
            className="checkbox-toggle" 
            onChange={(event) => setIsChecked(event.currentTarget.checked)}
            checked={isChecked}type="checkbox" />
        <div className="hamburger">
            <div></div>
        </div>
        <div className="menu">
            <div>
                <div className="grid text-center opacity-0 transition-opacity ease-in-out text-2xl">
                    <NavLink className="py-4" onClick={() => setIsChecked(!isChecked)} to="/"><FontAwesomeIcon className="mx-1" icon={faIgloo} />D4K</NavLink>

                    <NavLink className="py-4" onClick={() => setIsChecked(!isChecked)} to="/faq"><FontAwesomeIcon className="mx-1" icon={faCandyCane} />FAQ</NavLink>
                
                    <NavLink className="py-4" onClick={() => setIsChecked(!isChecked)} to="/charity"><FontAwesomeIcon className="mx-1" icon={faHandHoldingHeart} />Nicholas House</NavLink>
            
                    <NavLink className="py-4" onClick={() => setIsChecked(!isChecked)} to="/order"><FontAwesomeIcon className="mx-1" icon={faGift} />Order</NavLink>
            
                    <NavLink className="py-4" onClick={() => setIsChecked(!isChecked)} to="/menu"><FontAwesomeIcon className="mx-1" icon={faCocktail} />Menu</NavLink>
                    {
                        localStorageUsername && 
                        <NavLink className="py-4" to="/pay">
                        <FontAwesomeIcon className="mx-1" icon={faNoteSticky} />
                            Close Your Tab
                        </NavLink>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default MainNav