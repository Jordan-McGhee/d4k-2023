import React from "react";

// ui elements
import Card from "../../UIElements/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const MobileLeaderBoardItem = props => {

    let rankColor = "bg-emerald-600 border-white";

    if (props.rank === 1) {
        rankColor = "bg-gradient-to-r from-[rgb(255,215,0)] via-white to-[rgb(255,215,0)] bg-[length:200%_100%] animate-sheen"; // Gold
    } else if (props.rank === 2) {
        rankColor = "bg-gradient-to-r from-[rgb(192,192,192)] via-white to-[rgb(192,192,192)] bg-[length:200%_100%] animate-sheen"; // Silver
    } else if (props.rank === 3) {
        rankColor = "bg-gradient-to-r from-[rgb(205,127,50)] via-white to-[rgb(205,127,50)] bg-[length:200%_100%] animate-sheen"; // Bronze
    }



    return (
        <Card className={props.userIDClass || "first:rounded-t-3xl last:rounded-b-3xl grid grid-cols-5 items-center border-b-2 bg-slate-100/90 w-full border-slate-500 p-2"}>

            {/* image and rank */}
            <div className="relative flex items-center col-span-1">

                {/* image */}
                <div className="size-16 rounded-full overflow-hidden border-2 border-emerald-600 shadow-lg">
                    {props.photoUrl ? (
                        <img
                            src={props.photoUrl}
                            alt={`${props.username} Rank ${props.rank}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <FontAwesomeIcon
                                className="text-gray-600 size-8"
                                icon={faUserAlt}
                            />
                        </div>
                    )}
                </div>

                {/* rank circle */}
                <div className={`${rankColor} absolute -bottom-1 -right-2 text-white rounded-full size-8 flex items-center justify-center border-1 shadow-lg text-xl font-bold italic`}
                >
                    {props.rank}
                </div>
            </div>

            {/* username and drink/shot count */}
            <div className="col-span-3 flex flex-col gap-y-1 ml-4">
                <p className="text-xl font-bold truncate text-slate-800">{props.username}</p>

                <div className="flex gap-x-2">
                    {/* drink count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-1 h-4 text-slate-600" icon={faGlassMartini} />
                        <p className={`${props.drinkClass || "text-slate-600"} text-sm italic font-bold`}>{props.drink_quantity} Drinks</p>
                    </div>

                    {/* shot count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-1 h-4 text-slate-600" icon={faGlassWhiskey} />
                        <p className={`${props.drinkClass || "text-slate-600"} text-sm italic font-bold`}>{props.shot_quantity} Shots</p>
                    </div>
                </div>


            </div>

            {/* money raised */}
            <p className={`${props.drinkClass || "text-emerald-700"} col-span-1 text-xl font-bold italic text-center`}>${props.total}</p>
        </Card>
    )
}

export default MobileLeaderBoardItem