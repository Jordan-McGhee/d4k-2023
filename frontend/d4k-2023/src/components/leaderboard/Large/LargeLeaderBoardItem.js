import React from "react";
import Card from "../../UIElements/Card";

const LargeLeaderBoardItem = props => {

    return (
        
        <li>
            <Card className = "flex flex-col p-4 rounded-lg border-[8px] border-green-700 bg-white w-full shadow-xl mb-6 h-56 justify-center">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-5xl flex">{ props.rank}<span className="text-2xl">th</span></p>
                    
                    {/* USER INFO */}
                    <div className="w-1/2">
                        <p className="text-4xl font-bold uppercase truncate mb-4">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="text-3xl">
                            <p className="mb-4">{ props.drinksOrdered} Drinks Ordered</p>
                            <p><span className="text-green-700 font-semibold">${props.donated}</span> Donated</p>
                        </div>
                    </div>

                    <p className="font-bold text-6xl text-green-700">${ props.total} </p>
                </div>
            </Card>
        </li>
    )
}

export default LargeLeaderBoardItem