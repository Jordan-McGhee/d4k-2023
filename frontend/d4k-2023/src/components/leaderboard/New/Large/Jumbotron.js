import React from "react";

// image imports
import bgImageOne from "../../../../images/largeLeaderboard/bg_blue.jpeg"
import bgImageTwo from "../../../../images/largeLeaderboard/bg_red.jpeg"
import bgImageOriginal from "../../../../images/leaderboard.jpg"

// component imports
import LargeProgressBar from "../../Large/LargeProgressBar";
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeTopTen from "./LargeTopTen";

const Jumbotron = props => {

    const topThree = props.topTen.slice(0, 3)
    const fourThroughTen = props.topTen.slice(3)

    return (

        <div className="bg-cover h-screen" style={{ backgroundImage: `url(${bgImageOriginal})`, padding: 0, margin: 0 }}>

            {/* title */}
            <div className="flex items-center flex-col mx-auto pt-8 uppercase italic text-8xl font-bold">
                <p className="text-rose-600">Drink 4 the kids</p>
                <p className="text-emerald-600">Leaderboard</p>
            </div>


            <div className="flex justify-between h-screen pb-20">

                {/* progress bar */}
                <LargeProgressBar total={props.total} />

                {/* main content - top ten */}

                <div className="w-1/2 mx-6 px-4">
                    {/* top three */}
                    <ul className="flex justify-center my-12 px-16 rounded-2xl">
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

                    {/* four through 10 */}
                    <LargeTopTen users={fourThroughTen} drink_quantity={props.drinkTotals[0]} shot_quantity={props.drinkTotals[1]} />
                </div>



                {/* right side */}

            </div>
        </div>
    )
}

export default Jumbotron