import React from "react";
import first from "../../../images/largeLeaderboard/buddy.jpeg"
import second from "../../../images/largeLeaderboard/cousin-eddie.jpeg"
import third from "../../../images/largeLeaderboard/bad-santa.jpg"

const LargeTopThreeItem = props => {

    let image, imageClass, rankClass

    if (props.rank === 1) {
        image = first
        imageClass = "rounded-full border-black my-4"
        rankClass = "order-2 w-1/3 scale-90"
    } else if ( props.rank === 2) {
        image = second
        imageClass = "rounded-full border-black my-4"
        rankClass = "order-first w-1/3 scale-75"
    } else { 
        image = third
        imageClass = "w-auto rounded-full border-black my-4"
        rankClass = "order-last w-1/3 scale-75"
    }

    return (
        <li className={ rankClass }>
            {/* image */}
            <img source = { image } alt = 'user rank' className={ imageClass } />
            {/* <div  className= { imageClass }></div> */}

            {/* div containing name, rank, total, drink quantity */}
            <div className="text-center">
                <p className="text-4xl font-bold italic text-white">{ props.username }</p>
                <p className="text-4xl font-bold italic text-green-700">${ props.total }</p>
                <p className="text-2xl italic text-white">{ props.drinksOrdered } drinks</p>
            </div>

        </li>
    )

}

export default LargeTopThreeItem