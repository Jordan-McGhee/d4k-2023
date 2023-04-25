import React from "react";
import Card from "../../UIElements/Card";
import first from "../../../images/leaderboard/first-alt.png"
import second from "../../../images/leaderboard/second-alt.png"
import third from "../../../images/leaderboard/third-alt.png"

const MobileTopThreeItem = props => {

    let image

    if (props.rank === 1) {
        image = first
    } else if ( props.rank === 2) {
        image = second
    } else { 
        image = third
    }

    return (
        <li>
            <Card className = "flex flex-col p-4 rounded-lg border border-gray-2 bg-white w-full shadow-lg my-5">
                <div className="flex items-center">
                    {/* RANK */}
                    <img src = { image } alt = { props.rank } className = "w-16 mr-4 mt-1" />
                    
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

export default MobileTopThreeItem