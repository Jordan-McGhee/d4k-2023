import React from "react";
import first from "../../../../images/largeLeaderboard/buddy.png"
import second from "../../../../images/largeLeaderboard/cousinEddie.png"
import third from "../../../../images/largeLeaderboard/badSanta.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassMartini, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const LargeTopThreeItem = props => {

    let image, imageClass, rankClass, rankText

    if (props.rank === 1) {
        image = props.photoUrl || first
        rankText = "First"
        imageClass = "mb-3 h-96 object-contain"
        rankClass = "order-2 w-1/3 flex flex-col justify-center items-center text-6xl text-orange-400 "
    } else if (props.rank === 2) {
        image = second
        rankText = "Second"
        imageClass = "mb-2 h-80 object-contain"
        rankClass = "order-first w-1/3 scale-90 flex flex-col justify-center items-center text-5xl  text-blue-900  "
    } else {
        image = third
        rankText = "Third"
        imageClass = "mb-2 h-80 object-contain"
        rankClass = "order-last w-1/3 scale-90 flex flex-col justify-center items-center text-5xl text-purple-900 "
    }

    return (
        <li className={rankClass}>

            <p className="uppercase font-bold">{rankText}</p>

            {/* image */}
            <div className="relative text-center pt-0 mt-0">
                <img src={image} alt={`user rank: ${props.rank}`} className={imageClass + "border-5 shadow-xl drop-shadow-xl rounded-full border-white aspect-square object-cover"} />
                <p className="-bottom-4 w-full text-3xl font-bold text-center text-white absolute bg-emerald-600 mb-0 py-4 px-6 rounded-full">{props.username}</p>

            </div>

            {/* user totals */}
            <div className="flex flex-col items-center gap-y-2 pt-12 border-slate-500 rounded-full">

                {/* total spent/donated */}
                <p className="text-5xl italic font-bold text-emerald-600 mb-2">${props.total}</p>

                {/* drink count */}
                <div className="flex items-center">
                    <FontAwesomeIcon className="mr-2 h-8 text-slate-800" icon={faGlassMartini} />
                    <p className="text-3xl text-slate-800 italic">{ props.drink_quantity } Drinks</p>
                </div>

                {/* shot count */}
                <div className="flex items-center">
                    <FontAwesomeIcon className="mr-2 h-8 text-slate-800" icon={faGlassWhiskey} />
                    <p className="text-3xl text-slate-800 italic">{ props.shot_quantity } Shots</p>
                </div>
            </div>
        </li>
    )
}

export default LargeTopThreeItem