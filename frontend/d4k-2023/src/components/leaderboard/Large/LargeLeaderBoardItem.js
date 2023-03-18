import React from "react";
import Card from "../../UIElements/Card";

const LargeLeaderBoardItem = props => {

    return (
        // <li className="">
        //     {/* container div */}
        //     <div className="bg-white rounded-2xl p-3 flex justify-between">

        //         {/* rank */}
        //         <p className="text-2xl mr-2">{ props.rank }</p>
        //         {/* name, drinks, total div */}
        //         <div className="flex justify-between items-center w-11/12">
        //             <p className="font-bold text-lg">{ props.username }</p>
        //             <p>${ props.total }</p>
        //         </div>
        //     </div>
        // </li>
        
        <li>
            <Card className = "flex flex-col p-3 rounded-lg border border-gray-2 bg-white w-full shadow-lg">
                <div className="flex items-center justify-around">
                    {/* RANK */}
                    <p className="text-4xl">{ props.rank}</p>
                    
                    {/* USER INFO */}
                    <div className="w-2/3">
                        <p className="text-2xl font-bold uppercase truncate">{ props.username }</p>

                        {/* DIV FOR TOTAL AND DRINK ORDERS */}
                        <div className="flex text-xl font-medium">
                            <p className="mr-2">${ props.total} — { props.drinksOrdered} Drinks</p>
                        </div>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default LargeLeaderBoardItem