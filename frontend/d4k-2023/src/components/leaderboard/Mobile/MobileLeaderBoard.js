import React from "react";
import Card from "../../UIElements/Card";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";

const MobileLeaderBoard = props => {

    const topThree = props.data.slice(0,3)
    const fourThroughTen = props.data.slice(3,11)
    // console.log(topThree)
    // console.log(fourThroughTen)

    return (
        <div>

            {/* SECTION FOR GOAL TRACKER */}
            <MobileProgressBar total = { props.total } />
            

            <p className="text-center text-4xl text-white font-bold">Leaderboard</p>

            {/* SECTION FOR TOP 3 */}
            <MobileTopThree data = { topThree }/>

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
            <MobileLeaderBoardList data = { fourThroughTen } />
        </div>
    )
}

export default MobileLeaderBoard