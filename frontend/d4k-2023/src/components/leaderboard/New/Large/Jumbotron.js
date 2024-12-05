import React from "react";

// image imports
import bgImageOne from "../../../../images/largeLeaderboard/bg_blue.jpeg"
import bgImageTwo from "../../../../images/largeLeaderboard/bg_red.jpeg"
import bgImageOriginal from "../../../../images/leaderboard.jpg"

// component imports
import LargeProgressBar from "../../Large/LargeProgressBar";
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeTopTen from "./LargeTopTen";
import JumbotronStats from "./JumbotronStats";

const Jumbotron = props => {

    const topThree = props.topUsers.slice(0, 3)
    const restOfUsers = props.topUsers.slice(3)

    return (

        <div className="bg-cover w-full" style={{ backgroundImage: `url(${bgImageOriginal})`, padding: 0, margin: 0 }}>
            <div className="w-[95%] mx-auto">

                {/* title */}
                <div className="flex items-center justify-center gap-x-4 mx-auto pt-8 uppercase italic text-8xl font-bold">
                    <p className="text-rose-600">Drink 4 the kids</p>
                    <p className="text-emerald-600">Leaderboard</p>
                </div>


                <div className="flex justify-evenly mx-auto">

                    {/* progress bar */}
                    <div className="w-[10%]">
                        <LargeProgressBar total={props.total} />
                    </div>

                    {/* main content - top ten */}

                    <div className="w-[70%] mx-6 px-4">
                        {/* top three */}
                        <ul className="flex justify-center items-center mt-6 px-16 rounded-2xl">
                            {
                                topThree.map((user, i) => (
                                    <LargeTopThreeItem
                                        id={`large-leaderboard-topThree-${i}`}
                                        key={`large-leaderboard-topThree-${i}`}
                                        username={user.username}
                                        drink_quantity={user.drink_quantity}
                                        shot_quantity={user.shot_quantity}
                                        total={user.amount_paid + user.adjusted_donations}
                                        rank={i + 1}
                                        photoUrl={user.photo_url}
                                    />
                                ))
                            }
                        </ul>


                        {/* 4 through 11 */}
                        <LargeTopTen
                            users={restOfUsers}
                            drink_quantity={props.drinkTotals[0]}
                            shot_quantity={props.drinkTotals[1]}
                        />
                    </div>

                    {/* right side */}
                    <JumbotronStats
                        drinkTotals={props.drinkTotals}
                        ingredientCount={props.ingredientCount}
                        drinkCount={props.drinkCount}
                        total={props.total}
                        shotCount={props.shotCount}
                    />
                </div>
            </div>
        </div>
    )
}

export default Jumbotron