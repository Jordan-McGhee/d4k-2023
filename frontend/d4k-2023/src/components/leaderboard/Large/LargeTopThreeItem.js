import React from "react";
import first from "../../../images/largeLeaderboard/buddy.png"
import second from "../../../images/largeLeaderboard/cousinEddie.png"
import third from "../../../images/largeLeaderboard/badSanta.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassMartini } from "@fortawesome/free-solid-svg-icons";

const LargeTopThreeItem = props => {

    let image, imageClass, rankClass, rankText

    if (props.rank === 1) {
        image = first
        rankText = "First"
        imageClass = "mb-3 scale-90"
        rankClass = "order-2 w-1/3 flex flex-col justify-center items-center text-6xl text-orange-400 "
    } else if ( props.rank === 2) {
        image = second
        rankText = "Second"
        imageClass = "mb-2 scale-75"
        rankClass = "order-first w-1/3 scale-90 flex flex-col justify-center items-center text-5xl  text-blue-900  "
    } else { 
        image = third
        rankText = "Third"
        imageClass = "mb-2 scale-75"
        rankClass = "order-last w-1/3 scale-90 flex flex-col justify-center items-center text-5xl text-purple-900 "
    }

    return (
        <li className={ rankClass }>

            <p className="uppercase font-bold font-bungee">{ rankText }</p>
            {/* image */}
            <div className="relative text-center pt-0 mt-0">
                <img src = { image } alt = {`user rank ${props.rank}`} className={ imageClass + " border-5 shadow-xl drop-shadow-xl rounded-full border-white" } />
                <p className="text-4xl font-fugaz font-bold text-white absolute rounded-xl bg-emerald-800 bottom-0 inset-x-0 m-10 mb-0 py-4">
                    { props.username }
                </p>
            </div>
            <div className="text-center pt-5 border-slate-500/20 backdrop-blur  rounded-full">
                <p className="text-4xl font-fugaz font-bold text-emerald-600 mb-2">$ { props.total }</p>
                {/* <p className="text-5xl font-bold text-white mb-2">${props.donationTotal} extra donated</p> */}
                <div className="flex items-center">
                    <FontAwesomeIcon className="mr-2 h-8 text-slate-800" icon={faGlassMartini} />
                    <p className="text-3xl text-slate-800 italic">{ props.quantity } Drinks</p>
                </div>
            </div>

        </li>
    )

}

export default LargeTopThreeItem