import React from "react";
import Card from "../../UIElements/Card";

const MobileLeaderBoardItem = props => {

    return (
        <li>
            <Card className = "flex flex-col p-4 rounded-lg border border-green-700 bg-white w-full shadow-lg my-5">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-4xl">{ props.rank}</p>
                    
                    {/* USER INFO */}
                    <div className="w-2/3">
                        <p className="text-2xl font-bold uppercase truncate">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="flex text-xl font-medium">
                            <p className="mr-2">${ parseInt(props.donationTotal) + parseInt(props.orderTotal)} — { props.drinksOrdered} Drinks</p>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default MobileLeaderBoardItem