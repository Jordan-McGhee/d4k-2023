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
        imageClass = "h-96 object-contain"
        rankClass = "order-2 w-1/3 flex flex-col justify-center items-center text-6xl text-emerald-600 "
    } else if (props.rank === 2) {
        image = props.photoUrl || second
        rankText = "Second"
        imageClass = "h-80 object-contain"
        rankClass = "order-first w-1/3 scale-90 flex flex-col justify-center items-center text-5xl  text-emerald-600  "
    } else {
        image = props.photoUrl || third
        rankText = "Third"
        imageClass = "h-80 object-contain"
        rankClass = "order-last w-1/3 scale-90 flex flex-col justify-center items-center text-5xl text-emerald-600 "
    }

    return (
        <li className={rankClass}>

            <p className="uppercase font-bold mb-2">{rankText}</p>

            {/* image */}
            <div className="flex flex-col items-center pt-0 mt-0">
                <img src={image} alt={`user rank: ${props.rank}`} className={imageClass + "border-5 shadow-xl drop-shadow-xl rounded-full border-white aspect-square object-cover z-0"} />
                <p className="w-fit truncate text-5xl font-bold text-center text-white bg-emerald-600 mb-0 -mt-8 mx-auto py-4 px-8 rounded-full z-10 max-w-lg">{props.username}</p>

            </div>

            {/* user totals */}
            <div className="flex flex-col items-center gap-y-2 pt-4 border-slate-500 rounded-full">

                {/* total spent/donated */}
                <p className="text-8xl italic font-bold text-rose-600 mb-2">${props.total}</p>

                <div className="flex gap-x-4">
                    {/* drink count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-10 text-emerald-600" icon={faGlassMartini} />
                        <p className="text-4xl text-emerald-600 italic">{props.drink_quantity} Drinks</p>
                    </div>

                    {/* shot count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-10 text-emerald-600" icon={faGlassWhiskey} />
                        <p className="text-4xl text-emerald-600 italic">{props.shot_quantity} Shots</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default LargeTopThreeItem