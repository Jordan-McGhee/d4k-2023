import React from "react";

const LargeEmptyLeaderBoard = () => {

    return (
        <div className="h-screen flex flex-col items-center justify-center scale-125">
            <p className="uppercase flex flex-col text-center font-bold text-green-700 text-7xl mx-auto mb-12">Drink 4 The Kids <span className="text-white text-8xl">Leaderboard</span></p>

            <p className="text-5xl text-white my-2 text-center">Looks like nobody has placed an order yet...</p>

            <p className="text-5xl text-white my-2 text-center">Submit an order or donation and claim the top spot for yourself!</p>
        </div>
    )
}

export default LargeEmptyLeaderBoard