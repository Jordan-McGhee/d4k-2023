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
                    <p className="text-4xl flex font-bold">{ props.rank}<span className="text-3xl">th</span></p>
                    
                    {/* USER INFO */}
                    <div className="w-1/2">
                        <p className="text-4xl font-bold truncate mb-4">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="text-3xl font-semibold w-4/5 flex items-center">
                            <div className="flex items-center mr-8">
                            <FontAwesomeIcon className="mx-1 h-8 text-emerald-600" icon={faGlassMartini} />
                                <p className="text-emerald-600">{ props.quantity } Drinks</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-bold text-4xl text-emerald-700">${ props.total } </p>
                </div>
            </Card>
    )
}

export default LargeLeaderBoardItem