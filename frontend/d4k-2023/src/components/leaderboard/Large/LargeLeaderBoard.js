import React  from "react";
import HonorableMentions from "./HonorableMentions";
import LargeLeaderBoardList from "./LargeLeaderBoardList";
import LargeProgressBar from "./LargeProgressBar";
import LargeTopThree from "./LargeTopThree";

const LargeLeaderBoard = props => {

    const topThree = props.data.slice(0,3)
    const fourThroughTen = props.data.slice(3,11)

    return (
        <div className="flex justify-evenly h-4/5 align-top">
            
            {/* SECTION FOR LEADERBOARD */}
            <div className="flex flex-col w-1/2 h-screen border border-black justify-around">
                {/* title */}
                <p className="uppercase flex flex-col items-center font-bold text-green-700 text-5xl">Drink 4 The Kids <span className="text-white text-6xl">Leaderboard</span></p>

                {/* top three div */}
                <LargeTopThree data = { topThree } />

                {/* div for honorable mentions */}
                <HonorableMentions />
            
            </div>

            {/* SECTION FOR PROGRESS BAR */}
            <LargeProgressBar total = { props.total } />

            {/* section for 4-10 leaderboard */}
            <div className="h-full w-1/4">
                <LargeLeaderBoardList data = { fourThroughTen } />
            </div>
        </div>
    )
}

export default LargeLeaderBoard