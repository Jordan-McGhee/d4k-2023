import React from "react";
import Card from "../../UIElements/Card";

const LargeLeaderBoardItem = props => {

    return (
        
        <li>
            <Card className = "flex flex-col p-3 rounded-lg border border-gray-2 bg-white w-full shadow-lg mb-6">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-4xl">{ props.rank}</p>
                    
                    {/* USER INFO */}
                    <div className="w-2/3">
                        <p className="text-3xl font-bold uppercase truncate">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="flex text-2xl font-medium">
                            <p className="">${ props.total} — { props.drinksOrdered} Drinks</p>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default LargeLeaderBoardItem