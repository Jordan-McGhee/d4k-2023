import React from "react";
import Card from "../../UIElements/Card";

const MobileLeaderBoardItem = props => {

    console.log(props.userID)

    return (
        <Card className={ props.userIDClass || "last:rounded-b-3xl flex flex-col p-4 border-b-2 bg-white/90 w-full backdrop-blur-lg border-slate-500 shadow-lg"}>
            <div className="flex items-center justify-around">
                {/* RANK */}
                <p className="text-4xl flex">{props.rank}<span className="text-xl">th</span></p>

                {/* USER INFO */}
                <div className="w-2/3">
                    <p className="text-2xl font-bold uppercase truncate">{props.username}</p>

                    {/* DIV FOR TOTAL AND DRINK ORDERS */}
                    <div className="flex text-xl font-medium">
                        <p className="mr-2">${props.total} — {props.quantity} Drinks</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MobileLeaderBoardItem