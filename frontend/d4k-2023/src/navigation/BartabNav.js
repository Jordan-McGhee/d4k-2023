import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./BartabNav.css"
import "./MobileNav.css"

import { faCandyCane, faCocktail, faGift, faIgloo, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const BartabNav = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    // retrieve username from localStorage if there
    let localStorageUsername = localStorage.getItem('storedUsername')

    return (
        <div className="outer-menu menu-left">
            <input id="nav-checkbox" className="checkbox-toggle" type="checkbox"
                onChange={(event) => setIsChecked(event.currentTarget.checked)}
            />
            <div className="bar-tab border-2 border-slate-700 border-solid rounded-full">
            <div className="font-fugaz text-white tracking-widest">Pay Tab</div>
            </div>
            <div className="menu">
            <div>
                <div>
                <ul>
                    <li><div className="font-bungee text-4xl"><span className="fas fa-cocktail"></span>BAR TAB<span className="fas fa-glass-whiskey"></span> </div>
                    </li>
                    <li><div className="font-bungee" id="bar-tab-name"></div></li>
                    <li>          
                        <div id="bar-tab-info" >
                        <div>TOTAL DRINKS: <span className="fs-2 fw-bold" id="bar-tab-amount"></span></div>
                        <div>DONATION: <span className="fs-2 fw-bold">$<span className="fw-bold" id="bar-tab-cost"></span></span></div>
                    </div>
                    </li>
                    <li>
                    <div className="justify-content-center">
                        <div className="">
                        <hr className="hr-bold" />
                        <a id="tab-paypal-link" className="payment-icon payment-icon-lg paypal" href="https://paypal.me/jacobwwebber"></a>
                        <a id="tab-cashapp-link" className="payment-icon payment-icon-lg cashapp" href="https://cash.app/$wakejebber"></a>
                        <a id="tab-venmo-link" className="payment-icon payment-icon-lg venmo" href="https://venmo.com/jacobwebber?txn=pay&note=drink4dakids"></a>
                        </div>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BartabNav