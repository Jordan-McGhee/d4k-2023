import React from "react";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";
import MobileEmptyLeaderBoard from "./MobileEmptyLeaderBoard";

const MobileLeaderBoard = props => {

    let leaderboardLength, topThree, fourThroughTen
    
    if (props.data) {
            leaderboardLength = props.data.length
            topThree = props.data.slice(0,3)
            fourThroughTen = props.data.slice(3,11)
    } else {
        leaderboardLength = 0
    } 

    let content

    leaderboardLength > 0 ? content = (
        (
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
    ) : content = (
        <MobileEmptyLeaderBoard />
    )

    return (
        <div className="w-11/12 mt-8 m-auto">

            { content }
            
        </div>
    )
}

export default MobileLeaderBoard