import React from "react";
import LargeLeaderBoardItem from "./LargeLeaderBoardItem"
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeProgressBar from "./LargeProgressBar";
import bgImage from "../../../images/leaderboard.jpg"

const LargeLeaderBoard = props => {

    const topThree = props.data.slice(0,3)
    const fourThroughEight = props.data.slice(3,8)

    return (
        <>
            <div className="bg-cover h-screen" style={{backgroundImage: `url(${bgImage})`, padding:0, margin:0}}>
                    <div className="flex flex-col justify-around items-center p-10 mx-auto">
                        <div className="uppercase flex items-center font-bold text-rose-600 text-8xl font-fugaz pb-2">Drink 4 The Kids
                        <div className="font-bungee uppercase text-emerald-600 text-7xl pl-6">Leaderboard</div>
                        </div>

                        <div className="flex w-full items-stretch h-screen">
                            <div className="flex pb-20 mb-20 w-1/12">
                                <LargeProgressBar total = { props.total } />
                            </div>
                                <div className="flex flex-col pt-20  w-8/12 mx-6 px-4">
                                    <ul className="flex justify-center my-12  px-16 rounded-2xl">
                                    { topThree.map((user, i) => (
                                        <LargeTopThreeItem
                                            id = {`large-leaderboard-topThree-${i}`}
                                            key = {`large-leaderboard-topThree-${i}`}
                                            username = { user.username }
                                            quantity = { user.quantity }
                                            total = { user.amount_paid + user.adjusted_donations }
                                            rank = { i + 1 }
                                            photoUrl = { user.photo_url }
                                        />
                                    )) }
                                    </ul>
                                </div>
                                {
                                    fourThroughEight.length !== 0 && 
                                    <div className="flex flex-col mt-40 h-full w-4/12">
                                        {
                                            fourThroughEight.map((user, i) => (
                                                <LargeLeaderBoardItem
                                                    id = { `large-leaderboard-${i}`}
                                                    key = { `large-leaderboard-${i}`}
                                                    username = { user.username }
                                                    quantity = { user.quantity }
                                                    total = { user.amount_paid + user.adjusted_donations }
                                                    rank = { i + 4 }
                                                    photoUrl = { user.photo_url }
                                                />
                                            ))
                                        }
                                    </div>
                                }
                        </div>
                    </div>
            </div>
        </>
    )
}

export default LargeLeaderBoard