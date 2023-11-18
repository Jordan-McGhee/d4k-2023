import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import "./BartabNav.css"
import "./MobileNav.css"
import { UserApi } from "../api/userApi";

const BartabNav = (props) => {
    const { isLoading, sendRequest, hasError, clearError } = useFetch()
    const [isChecked, setIsChecked] = useState(false);
    const [ data, setData ] = useState(null)
    const [ totalOwed, setTotalOwed ] = useState(0)
    const [ venmoUrl, setVenmoUrl ] = useState('https://venmo.com/jacobwebber')
    const [ paypalUrl, setPaypalUrl ] = useState('https://paypal.me/jacobwwebber')
    const location = useLocation();
    const { getTab } = UserApi()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            const getUserTab = async () => {
                try {
                    const responseData = await getTab(userId)
                    setData(responseData)
                    console.log(responseData)
                } catch (error) {
                    console.log(error)
                }
            }
            getUserTab()
        }
    }, [ location ])

    useEffect(() => {
        if(data){
            setTotalOwed(data.tab_total)
            
            let note = `${data.username}-%20${data.quantity || 0}%20drinks%20$${data.drink_cost_total}${data.tips_total ? `,%20$${data.tips_total} tip` : '' }`
            
            let venmo = `https://venmo.com/jacobwebber?txn=pay&amount=${data.tab_total}&note=${note}`.replace(/ /g, '+')
            setVenmoUrl(venmo)

            let paypal = `https://paypal.me/jacobwwebber/${data.tab_total}?&item_name=${note}`.replace(/ /g, '+')
            setPaypalUrl(paypal)
        }
    }, [data]);

    return (
        <div>
        { data && (data.tab_total > 0) && 
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
                        {data.quantity}
                    </span>
                </p>

                <p className="text-xl flex justify-between">Drinks:
                    <span className=" uppercase font-bold text-green-400">
                        ${data.drink_cost_total}
                    </span>
                </p>

                <p className="text-xl flex justify-between">Additional Tip: 
                    <span className=" uppercase font-bold text-green-400">
                        ${data.tips_total}
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