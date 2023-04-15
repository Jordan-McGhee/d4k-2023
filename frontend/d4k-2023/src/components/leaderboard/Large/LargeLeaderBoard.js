import React, { useState, useEffect }  from "react";
import HonorableMentions from "./HonorableMentions";
import LargeLeaderBoardList from "./LargeLeaderBoardList";
import LargeProgressBar from "./LargeProgressBar";
import LargeTopThree from "./LargeTopThree";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useFetch } from "../../../hooks/useFetch";

import bgImage from "../../../images/snowflake-bg.png"

const LargeLeaderBoard = props => {

    const [ data, setData] = useState([])
    const [ overallTotal, setOverallTotal ] = useState(0)

    const { isLoading, hasError, clearError, sendRequest } = useFetch()

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/order/leaderboard`
                )

                // console.log(`Leaderboard: ${ typeof responseData.response }`)

                setData(responseData.response)
                setOverallTotal(parseInt(responseData.sumTotal))

            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()

    }, [ sendRequest ])

    const topThree = data.slice(0,3)
    const fourThroughTen = data.slice(3,11)

    return (
        <React.Fragment>
            <div className="h-screen object-fill" style={{backgroundImage: `url(${bgImage})`}}>
                <div className="bg-red-900/90">

                

                <ErrorModal error = { hasError } onClear = { clearError } />

                { isLoading && <LoadingSpinner />}

                    <div className="flex justify-around items-center w-4/5 mx-auto">
                        
                        {/* SECTION FOR LEADERBOARD */}
                        <div className="flex flex-col w-1/2 justify-around">
                            {/* title */}
                            <p className="uppercase flex flex-col items-center font-bold text-green-700 text-9xl">Drink 4 The Kids <span className="text-white text-9xl">Leaderboard</span></p>

                            {/* top three div */}
                            <LargeTopThree data = { topThree } />

                            {/* div for honorable mentions */}
                            <HonorableMentions />
                        
                        </div>

                        <div className="mr-24">
                            {/* SECTION FOR PROGRESS BAR */}
                            <LargeProgressBar total = { overallTotal } />
                        </div>

                        {/* section for 4-10 leaderboard */}
                        <div className="h-full w-1/4">
                            <LargeLeaderBoardList data = { fourThroughTen } />
                        </div>

                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}

export default LargeLeaderBoard