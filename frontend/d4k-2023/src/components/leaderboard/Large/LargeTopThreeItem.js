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
        imageClass = "my-8 scale"
        rankClass = "order-2 w-1/3 flex flex-col justify-center items-center"
    } else if ( props.rank === 2) {
        image = second
        rankText = "Second"
        imageClass = "my-8 scale-90"
        rankClass = "order-first w-1/3 scale-90 flex flex-col justify-center items-center"
    } else { 
        image = third
        rankText = "Third"
        imageClass = "my-8 scale-90"
        rankClass = "order-last w-1/3 scale-90 flex flex-col justify-center items-center"
    }

    return (
        <li className={ rankClass }>

            <p className="uppercase text-purple text-6xl font-bold font-bungee">{ rankText }</p>
            {/* image */}
            <div className="relative text-center">
                <img src = { image } alt = {`user rank ${props.rank}`} className={ imageClass + " border-5 shadow-xl drop-shadow-xl rounded-full border-white" } />
                <p className="text-5xl font-fugaz font-bold italic text-white absolute rounded-xl bg-emerald-800 bottom-0 inset-x-0 m-10 mb-0 py-4 uppercase">
                    { props.username }
                </p>
            </div>
            <div className="text-center mt-10 border-4 border-slate-500/20 backdrop-blur bg-black/40  p-4 rounded-3xl">
                <p className="text-7xl font-fugaz font-bold text-emerald-400 mb-2">${ props.total }</p>
                {/* <p className="text-5xl font-bold text-white mb-2">${props.donationTotal} extra donated</p> */}
                <div className="flex items-center">
                    <FontAwesomeIcon className="mr-2 h-8 text-emerald-300" icon={faGlassMartini} />
                    <p className="text-5xl text-white">{ props.quantity } Drinks</p>
                </div>
            </div>

        </li>
    )

}

export default LargeTopThreeItem