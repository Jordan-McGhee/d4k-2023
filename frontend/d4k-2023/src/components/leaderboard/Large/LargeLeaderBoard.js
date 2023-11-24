import React from "react";
import LargeLeaderBoardItem from "./LargeLeaderBoardItem"
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeProgressBar from "./LargeProgressBar";
import bgImage from "../../../images/leaderboard.jpg"

const LargeLeaderBoard = props => {
    const topThree = props.data.slice(0,3)
    const fourThroughEight = props.data.slice(3,8)
    console.log(fourThroughEight)

    const content = (
        <div className="flex flex-col justify-around items-center p-10 mx-auto">
                    <div className="uppercase flex items-center font-bold text-emerald-600 text-7xl font-bungee pb-10">Drink 4 The Kids 
                        <span className="font-fugaz text-rose-600 text-6xl pl-6">Leaderboard</span>
                    </div>
            <div className="flex items-center w-full items-stretch">
                <div className="flex flex-col w-1/12">
                    <LargeProgressBar total = { props.total } />
                </div>
                    <div className="flex flex-col w-8/12 mx-6 px-4 justify-around">
                        <ul className="flex justify-center my-12  px-16 rounded-2xl">
                        { topThree.map((user, i) => (
                            <LargeTopThreeItem
                                id = {`large-leaderboard-topThree-${i}`}
                                key = {`large-leaderboard-topThree-${i}`}
                                username = { user.username }
                                orderTotal = { user.quantity ? parseInt(user.quantity) : 0 }
                                donationTotal = { user.amount_paid ? parseInt(user.amount_paid) : 0}
                                drinksOrdered = { user.quantity ? user.quantity : 0}
                                rank = { i + 1}
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
                                        orderTotal = { user.quantity ? parseInt(user.quantity) : 0 }
                                        donationTotal = { user.donations_total ? parseInt(user.donations_total) : 0}
                                        drinksOrdered = { user.drinks_ordered ? user.drinks_ordered : 0}
                                        rank = { i+ 4}
                                    />
                                ))
                            }
                        </div>
                    }
            </div>
        </div>
    )

    return (
        <>
            <div className="bg-cover" style={{backgroundImage: `url(${bgImage})`, padding:0, margin:0}}>
                <div>
                    { content }
                </div>
            </div>
        </>
    )
}

export default LargeLeaderBoard