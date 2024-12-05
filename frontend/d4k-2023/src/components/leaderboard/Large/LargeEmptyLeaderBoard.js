import React from "react";

import bgImage from "../../../images/leaderboard.jpg"

const LargeEmptyLeaderBoard = () => {

    return (
        <div className="bg-cover w-full h-screen" style={{ backgroundImage: `url(${bgImage})`, padding: 0, margin: 0 }}>
            <div className="h-screen flex flex-col items-center justify-center">

                <div className="bg-slate-100/40 rounded-2xl w-fit p-16">
                    <p className="uppercase flex flex-col justify-self-center text-center font-bold text-green-700 text-7xl mx-auto">Drink 4 The Kids <span className="text-8xl text-rose-600">Leaderboard</span></p>

                    <p className="text-5xl text-slate-800 my-2 text-center">Looks like nobody has placed an order yet...</p>

                    <p className="text-5xl text-slate-800 my-2 text-center">Submit an order or donation and claim the top spot for yourself!</p>
                </div>
            </div>
        </div>
    )
}

export default LargeEmptyLeaderBoard