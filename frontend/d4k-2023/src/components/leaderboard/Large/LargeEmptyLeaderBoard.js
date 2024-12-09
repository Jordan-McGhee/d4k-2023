import React from "react";

import bgImage from "../../../images/leaderboard.jpg"

const LargeEmptyLeaderBoard = () => {

    return (
        <div className="h-screen flex flex-col items-center justify-center scale-125">
            <p className="uppercase flex flex-col text-center font-bold text-emerald-700 font-bungee text-7xl mx-auto mb-12">Drink 4 The Kids 
                <span className="text-white text-8xl">Leaderboard</span></p>
            <div className="text-5xl text-white my-2 text-center">Submit an order or donation</div>
                <div className="text-4xl text-white my-2 text-center"> claim the top spot for yourself!</div>
        </div>
    )
}

export default LargeEmptyLeaderBoard