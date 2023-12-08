import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./BartabNav.css"
import "./MobileNav.css"
import { UserApi } from "../api/userApi";
import { ScrollShadow, Button } from "@nextui-org/react";

const BartabNav = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false)
    const [data, setData] = useState(null)
    const [totalOwed, setTotalOwed] = useState(0)
    const [venmoUrl, setVenmoUrl] = useState('https://venmo.com/jacobwebber')
    const [paypalUrl, setPaypalUrl] = useState('https://paypal.me/jacobwwebber')
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
    }, [location])

    useEffect(() => {
        if (data) {
            setTotalOwed(data.tab.tab_total)

            let note = `${data.tab.username}-%C2%A0${data.tab.quantity || 0}%C2%A0drinks%C2%A0$${data.tab.drink_cost_total}${data.tab.tips_total ? `,%C2%A0$${data.tab.tips_total}%C2%A0tip` : ''}`

            let venmo = `https://venmo.com/drink4thekids?txn=pay&amount=${data.tab.tab_total}&note=${note}`.replace(/ /g, '+')
            setVenmoUrl(venmo)

            let paypal = `https://paypal.me/jacobwwebber/${data.tab.tab_total}?&item_name=${note}`.replace(/ /g, '+')
            setPaypalUrl(paypal)
        }
    }, [data]);

    let orderHistoryList = []

    if (data) {
        let orderHistoryObj = data.order_history

        Object.entries(orderHistoryObj).map(([ key, value]) => {
            orderHistoryList.push(
                <div key={`${key} - ${value}`} className="ml-2 text-xs my-0.5">
                    {`${value} x ${key}`}
                </div>
            )
        })
    }

    return (
        <div>
            {data && (data.tab.tab_total > 0) &&
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
                                    <li><div className="font-bungee text-xl mb-4" id="bar-tab-name">{data.tab.username}</div></li>

                                    <li className="my-4">
                                        {/* show history button */}
                                        <Button className="rounded-full font-bold text-xs text-slate-100 py-0 my-0 bg-red-400 shadow-md" size="sm" onPress = { () => setShowOrderHistory(!showOrderHistory) }>
                                            { showOrderHistory ? 'Hide Orders' : 'Show Orders'}
                                        </Button>

                                        { showOrderHistory &&
                                            <ScrollShadow size={20} className="my-1 max-h-[8rem] overflow-y-scroll">
                                                { orderHistoryList }
                                            </ScrollShadow>
                                        }
                                    </li>


                                    <li>
                                        <p className="text-xl flex justify-between">Drinks Ordered:
                                            <span className=" uppercase font-bold">
                                                {data.tab.quantity}
                                            </span>
                                        </p>

                                        <p className="text-xl flex justify-between">Drinks Total:
                                            <span className=" uppercase font-bold text-green-400">
                                                ${data.tab.drink_cost_total}
                                            </span>
                                        </p>

                                        <p className="text-xl flex justify-between">Additional Tip:
                                            <span className=" uppercase font-bold text-green-400">
                                                ${data.tab.tips_total}
                                            </span>
                                        </p>

                                        <p className="text-2xl flex justify-between border-t-2 pt-4">Total Due:
                                            <span className="uppercase font-bold text-green-400">
                                                ${totalOwed}
                                            </span>
                                        </p>
                                    </li>
                                    <li>
                                        <div className="justify-content-center mt-6">
                                            <div className="">
                                                {/* <hr className="hr-bold" /> */}
                                                <Link
                                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 paypal"
                                                    target="_blank"
                                                    to={paypalUrl}>
                                                </Link>
                                                <Link
                                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 cashapp"
                                                    target="_blank"
                                                    to={`https://cash.app/$wakejebber/${totalOwed}`}>
                                                </Link>
                                                <Link
                                                    className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 venmo"
                                                    target="_blank"
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