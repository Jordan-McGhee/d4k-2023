import React from "react";

const MobileLeaderBoard = props => {

    const topThree = props.data.slice(0,3)
    const fourThroughTen = props.data.slice(3,11)
    console.log(topThree)
    console.log(fourThroughTen)

    return (
        <div>
            {/* SECTION FOR GOAL TRACKER */}
            

            {/* SECTION FOR TOP 3 */}

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
        </div>
    )
}

export default MobileLeaderBoard