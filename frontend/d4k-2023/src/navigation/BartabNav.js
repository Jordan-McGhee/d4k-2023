import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// import { useIsFocused } from '@react-navigation/native'
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import "./BartabNav.css"
import "./MobileNav.css"

import { faCandyCane, faCocktail, faGift, faIgloo, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import UserHasTab from "../components/payTab/UserHasTab";

const BartabNav = (props) => {
    const { isLoading, sendRequest, hasError, clearError } = useFetch()
    // const isFocused = useIsFocused()
    const [isChecked, setIsChecked] = useState(false);
    const [ data, setData ] = useState(null)
    const [ totalOwed, setTotalOwed ] = useState(0)
    const [ venmoUrl, setVenmoUrl ] = useState('https://venmo.com/jacobwebber')
    const [ paypalUrl, setPaypalUrl ] = useState('https://paypal.me/jacobwwebber')
    const location = useLocation();

    useEffect(() => {
        const username = localStorage.getItem('storedUsername')
        if (username) {
            const fetchUserTab = async () => {
                try {
                    const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${username}/pullTab`)
                    setData(responseData.response[0])
                    console.log(responseData.response[0])
                } catch (error) {
                    console.log(error)
                }
            }
            fetchUserTab()
        }
        
    }, [sendRequest, location ])

    useEffect(() => {
        if(data){
            let total = parseInt(data.donations_total_unpaid || 0) + parseInt(data.orders_total_unpaid || 0)
            setTotalOwed(total)
            
            let note = `${data.username}-%20${data.drinks_ordered || 0}%20drinks%20$${data.orders_total_unpaid || 0}${data.donations_total_unpaid ? `,%20$${data.donations_total_unpaid} donation` : '' }`
            
            let venmo = `https://venmo.com/jacobwebber?txn=pay&amount=${total}&note=${note}`.replace(/ /g, '+')
            setVenmoUrl(venmo)

            let paypal = `https://paypal.me/jacobwwebber/${total}?&item_name=${note}`.replace(/ /g, '+')
            setPaypalUrl(paypal)
        }
    }, [data]);

    return (
        <div>
        { data && (data.orders_total_unpaid || data.donations_total_unpaid) && 
            <div className={`outer-menu menu-left ${!isChecked ? 'animate-pulse' : ''}`}>
                <input id="nav-checkbox" className="checkbox-toggle" type="checkbox"
                    onChange={(event) => setIsChecked(event.currentTarget.checked)}
                />
                <div className="bar-tab border-2 border-white border-solid rounded-full">
                <div className="font-fugaz text-white tracking-widest">Pay Tab</div>
                </div>
                <div className="menu">
                <div>
                    <div>
                    <ul>
                        <li><div className="font-bungee text-4xl"><span className="fas fa-cocktail"></span>BAR TAB<span className="fas fa-glass-whiskey"></span> </div>
                        </li>
                        <li><div className="font-bungee text-xl mb-4" id="bar-tab-name">{data.username}</div></li>
                        <li>          
                            <p className="text-xl flex justify-between">Drinks Ordered: 
                    <span className=" uppercase font-bold">
                        {data.drinks_ordered ? data.drinks_ordered : 0}
                    </span>
                </p>

                <p className="text-xl flex justify-between">Unpaid Tab: 
                    <span className=" uppercase font-bold text-green-400">
                        ${data.orders_total_unpaid ? data.orders_total_unpaid : 0}
                    </span>
                </p>

                <p className="text-xl flex justify-between">Added Donations: 
                    <span className=" uppercase font-bold text-green-400">
                        ${data.donations_total_unpaid ? data.donations_total_unpaid : 0}
                    </span>
                </p>

                <p className="text-2xl flex justify-between border-t-2 pt-4">Total Due: 
                <span className="uppercase font-bold text-green-400">
                    ${ totalOwed }
                    </span></p>


                        </li>
                        <li>
                        <div className="justify-content-center mt-6">
                            <div className="">
                                {/* <hr className="hr-bold" /> */}
                                <Link 
                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 paypal"
                                    target = "_blank"
                                    to={paypalUrl}>
                                </Link>
                                <Link 
                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 cashapp"
                                    target = "_blank"
                                    to={`https://cash.app/$wakejebber/${totalOwed}`}>    
                                </Link>
                                <Link 
                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 venmo"
                                    target = "_blank"
                                    to={venmoUrl}>
                                </Link>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div> 
        }
        </div>
    )
}

export default BartabNav