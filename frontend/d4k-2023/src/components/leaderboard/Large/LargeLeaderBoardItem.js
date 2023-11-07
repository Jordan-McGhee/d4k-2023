import React from "react";
import Card from "../../UIElements/Card";
import order from "../../../images/icons/order.png"
import donate from "../../../images/icons/donate.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane, faCocktail, faGift, faIgloo, faPeopleGroup, faMedal, faDonate, faHandHoldingWater, faGlassMartini } from "@fortawesome/free-solid-svg-icons";

const LargeLeaderBoardItem = props => {

    return (
        
            <Card className = "first:rounded-t-3xl last:rounded-b-3xl flex flex-col p-4 border-b-2 border-emerald-700 bg-slate-100/50 w-full shadow-xl  justify-center">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-6xl flex">{ props.rank}<span className="text-4xl">th</span></p>
                    
                    {/* USER INFO */}
                    <div className="w-1/2">
                        <p className="text-4xl font-bold uppercase truncate mb-4">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="text-4xl border-2 font-semibold w-4/5 flex items-center">
                            <div className="flex items-center mr-8">

                            <FontAwesomeIcon className="mx-1 text-emerald-600" icon={faGlassMartini} />

                                <p className="text-emerald-600">{ props.drinksOrdered}</p>
                            </div>
                            <div className="flex items-center ml-4">
                            <FontAwesomeIcon className="mx-1 text-emerald-600" icon={faGift} />

                                <p className="flex"><span className="text-emerald-700 font-semibold mr-2">${props.donationTotal}</span></p>
                            </div>
                        </div>
                    </div>

                    <p className="font-bold text-6xl text-emerald-700">${ parseInt(props.donationTotal) + parseInt(props.orderTotal)} </p>
                </div>
            </Card>
    )
}

export default LargeLeaderBoardItem