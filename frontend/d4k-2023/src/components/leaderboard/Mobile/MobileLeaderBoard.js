import React, { useEffect, useState } from "react";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";

const MobileLeaderBoard = props => {

    const [ storedUserID, setStoredUserId ] = useState(null)

    const userClass = 'bg-green-200 last:rounded-b-3xl border-2 p-4 animate-pulse-custom'

    // check for storedUserID and pass it through for highlighting in the leaderboard list
    useEffect(() => {
        let storedId = localStorage.getItem(`userId`)

        if (storedId) {
            setStoredUserId(parseInt(storedId))
        }
    }, [])
    
    let topThree = props.data.slice(0, 3)
    let fourThroughTen = props.data.slice(3, 11)

    return (
        <div className="w-11/12 mt-8 m-auto">

            <p className="text-center text-4xl font-bungee text-emerald-700 font-bold pb-4">Leaderboard</p>

            {/* SECTION FOR GOAL TRACKER */}
            <MobileProgressBar total={props.total} />

            {/* SECTION FOR TOP 3 */}
            <MobileTopThree data={topThree} user = { storedUserID } userClass = { userClass }/>

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
            <MobileLeaderBoardList data={fourThroughTen} user = { storedUserID } userClass = { userClass } />

        </div>
    )
}

export default MobileLeaderBoard