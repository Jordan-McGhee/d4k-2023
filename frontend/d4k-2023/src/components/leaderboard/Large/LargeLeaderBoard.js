import React, { useState, useEffect, useCallback }  from "react";
// import HonorableMentions from "./HonorableMentions";
import LargeLeaderBoardList from "./LargeLeaderBoardList";
import LargeLeaderBoardItem from "./LargeLeaderBoardItem"
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeProgressBar from "./LargeProgressBar";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useFetch } from "../../../hooks/useFetch";

import bgImage from "../../../images/leaderboard.jpg"
import LargeEmptyLeaderBoard from "./LargeEmptyLeaderBoard";

const LargeLeaderBoard = props => {

    const topThree = props.data.slice(0,3)
    const fourThroughEight = props.data.slice(3,8)

    return (
        <>
            <div className="bg-cover" style={{backgroundImage: `url(${bgImage})`, padding:0, margin:0}}>
                <div>
                    <div className="flex flex-col justify-around items-center p-10 mx-auto">
                        <div className="uppercase flex items-center font-bold text-emerald-600 text-7xl font-bungee pb-10">Drink 4 The Kids 
                            <span className="font-fugaz text-slate-500 text-6xl pl-6">Leaderboard</span>
                        </div>
                        <div className="flex w-full items-stretch">
                            <div className="flex flex-col w-1/12">
                                <LargeProgressBar total = { props.overallTotal } />
                            </div>
                                <div className="flex flex-col w-8/12 mx-6 px-4 justify-around">
                                    <ul className="flex justify-center my-12  px-16 rounded-2xl">
                                    { topThree.map((user, i) => (
                                        <LargeTopThreeItem
                                            id = {`large-leaderboard-topThree-${i}`}
                                            key = {`large-leaderboard-topThree-${i}`}
                                            username = { user.username }
                                            quantity = { user.quantity }
                                            total = { user.amount_paid + user.adjusted_donations }
                                            rank = { i + 1 }
                                        />
                                    )) }
                                    </ul>
                                </div>
                                {
                                    fourThroughEight.length !== 0 && 
                                    <div className="flex flex-col h-full mt-20 w-3/12">
                                        {
                                            fourThroughEight.map((user, i) => (
                                                <LargeLeaderBoardItem
                                                    id = { `large-leaderboard-${i}`}
                                                    key = { `large-leaderboard-${i}`}
                                                    username = { user.username }
                                                    quantity = { user.quantity }
                                                    total = { user.amount_paid + user.adjusted_donations }
                                                    rank = { i + 4 }
                                                />
                                            ))
                                        }
                                    </div>
                                }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LargeLeaderBoard