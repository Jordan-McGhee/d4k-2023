import React from "react";
import first from "../../../images/largeLeaderboard/buddy.png"
import second from "../../../images/largeLeaderboard/cousinEddie.png"
import third from "../../../images/largeLeaderboard/badSanta.png"

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

            <p className="uppercase text-white text-6xl font-bold italic">{ rankText }</p>
            {/* image */}
            <img src = { image } alt = {`user rank ${props.rank}`} className={ imageClass } />
            {/* <div  className= { imageClass }></div> */}

            {/* div containing name, rank, total, drink quantity */}
            <div className="text-center">
                <p className="text-8xl font-bold italic text-white">{ props.username }</p>
                <p className="text-8xl font-bold italic text-green-700 my-6">${ parseInt(props.donationTotal) + parseInt(props.orderTotal)}</p>
                <p className="text-6xl font-bold italic text-white my-6">${props.donationTotal} donated</p>
                <p className="text-6xl italic text-white">{ props.drinksOrdered } Drinks Ordered</p>
            </div>

        </li>
    )

}

export default LargeTopThreeItem