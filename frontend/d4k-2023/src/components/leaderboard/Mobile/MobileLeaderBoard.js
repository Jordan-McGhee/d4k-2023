import React from "react";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";

const MobileLeaderBoard = props => {
    
    let topThree = props.data.slice(0, 3)
    let fourThroughTen = props.data.slice(3, 11)

    return (
        <div className="w-11/12 mt-8 m-auto">

            <p className="text-center text-4xl font-bungee text-emerald-700 font-bold pb-4">Leaderboard</p>

            {/* SECTION FOR GOAL TRACKER */}
            <MobileProgressBar total={props.total} />

            {/* SECTION FOR TOP 3 */}
            <MobileTopThree data={topThree} />

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
            <MobileLeaderBoardList data={fourThroughTen} />

        </div>
    )
}

export default MobileLeaderBoard