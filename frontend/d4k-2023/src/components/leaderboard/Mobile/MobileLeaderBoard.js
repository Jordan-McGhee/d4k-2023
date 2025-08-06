import React, { useEffect, useState } from "react";
import MobileLeaderBoardList from "./MobileLeaderBoardList";
// import MobileTopThree from "./MobileTopThree";
import MobileProgressBar from "./MobileProgressBar";

// ui elements
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const MobileLeaderBoard = props => {

    return (
        <div className="w-11/12 mt-8 mb-20 m-auto">

            <p className="text-center text-4xl font-bungee text-emerald-700 font-bold pb-4">Leaderboard</p>

            {/* SECTION FOR GOAL TRACKER */}
            <MobileProgressBar total={props.total} />

            {/* party metrics */}
            {
                props.partyMetrics &&
                <div className="flex justify-evenly gap-x-2 w-full p-2 bg-slate-100/90 rounded-full my-4">
                    <div className="flex items-center gap-x-2 text-slate-800">
                        <FontAwesomeIcon className="size-6" icon={faUserAlt} />
                        <p className="text-2xl font-black">{props.partyMetrics[0]}</p>
                    </div>

                    <div className="flex items-center gap-x-4 text-slate-800">
                        <FontAwesomeIcon className="size-6 " icon={faGlassMartini} />
                        <p className="text-2xl  font-black">{props.partyMetrics[1]}</p>
                    </div>

                    <div className="flex items-center gap-x-4 text-slate-800">
                        <FontAwesomeIcon className="size-6 " icon={faGlassWhiskey} />
                        <p className="text-2xl font-black">{props.partyMetrics[2]}</p>
                    </div>
                </div>
            }

            {/* SECTION FOR TOP 3 */}
            {/* <MobileTopThree data={topThree} user = { storedUserID } userClass = { userClass }/> */}

            {/* SECTION FOR REST OF LEADERBOARD (4-10) */}
            <MobileLeaderBoardList topUsers={props.topUsers} user={props.user} />

        </div>
    )
}

export default MobileLeaderBoard