import React from "react";

const LargeEmptyLeaderBoard = () => {

    return (
        <div className="flex flex-col justify-evenly h-full">
            <p className="uppercase flex flex-col text-center font-bold text-green-700 text-9xl mx-auto">Drink 4 The Kids <span className="text-white text-9xl">Leaderboard</span></p>

            <p className="text-9xl text-white my-2 text-center">Looks like nobody has placed an order yet!</p>

            <p className="text-9xl text-white my-2 text-center">Submit an order or donation and claim the top spot for yourself!</p>
        </div>
    )
}

export default LargeEmptyLeaderBoard