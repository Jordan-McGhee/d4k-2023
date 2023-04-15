import React from "react";
import Card from "../../UIElements/Card";
import order from "../../../images/icons/order.png"
import donate from "../../../images/icons/donate.png"

const LargeLeaderBoardItem = props => {

    return (
        
        <li>
            <Card className = "flex flex-col p-4 rounded-lg border-[8px] border-green-700 bg-white w-full shadow-xl mb-6 h-56 justify-center">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-5xl flex">{ props.rank}<span className="text-2xl">th</span></p>
                    
                    {/* USER INFO */}
                    <div className="w-1/2">
                        <p className="text-5xl font-bold uppercase truncate mb-4">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="text-4xl flex items-center">
                            <div className="flex items-center">
                                <div className="rounded-full bg-green-600 p-5 mr-4">
                                    <img src={order} alt = "order icon" className="w-10"/>
                                </div>
                                <p className="">{ props.drinksOrdered} Drinks</p>
                            </div>
                            <div className="flex items-center ml-4">
                                <div className="rounded-full bg-green-600 p-5 mr-4">
                                    <img src={donate} alt = "donate icon" className="w-10"/>
                                </div>
                                <p className="flex"><span className="text-green-700 font-semibold mr-2">${props.donated}</span> Donated</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-bold text-6xl text-green-700">${ props.total} </p>
                </div>
            </Card>
        </li>
    )
}

export default LargeLeaderBoardItem