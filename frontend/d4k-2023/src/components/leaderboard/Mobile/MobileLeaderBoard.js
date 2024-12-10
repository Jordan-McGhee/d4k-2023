import React, { useEffect, useState } from "react";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";

const MobileLeaderBoard = props => {

    const [ storedUserID, setStoredUserID ] = useState(null)

    const userClass = 'bg-green-200 border-2 p-2 grid grid-cols-5 items-center border-b-2 w-full animate-pulse-custom first:rounded-t-3xl last:rounded-b-3xl'

    // check for storedUserID and pass it through for highlighting in the leaderboard list
    useEffect(() => {
        let storedID = localStorage.getItem(`userId`)

        if (storedID) {
            setStoredUserID(parseInt(storedID))
        }
    }, [])

    return (
        <div className="w-11/12 mt-8 mb-20 m-auto">

            <p className="text-center text-4xl font-bungee text-emerald-700 font-bold pb-4">Leaderboard</p>

            {/* SECTION FOR GOAL TRACKER */}
            <MobileProgressBar total={props.total} />

            {/* SECTION FOR TOP 3 */}
            {/* <MobileTopThree data={topThree} user = { storedUserID } userClass = { userClass }/> */}

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
            <MobileLeaderBoardList topUsers={props.topUsers} user={props.user}  userClass = { userClass } />

        </div>
    )
}

export default MobileLeaderBoard