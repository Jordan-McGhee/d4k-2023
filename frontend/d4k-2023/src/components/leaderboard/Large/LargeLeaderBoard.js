import React, { useState, useEffect, useCallback }  from "react";
import HonorableMentions from "./HonorableMentions";
import LargeLeaderBoardList from "./LargeLeaderBoardList";
import LargeProgressBar from "./LargeProgressBar";
import LargeTopThree from "./LargeTopThree";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { useFetch } from "../../../hooks/useFetch";

import bgImage from "../../../images/snowflake-bg.png"
import LargeEmptyLeaderBoard from "./LargeEmptyLeaderBoard";

const LargeLeaderBoard = props => {

    const [ data, setData] = useState([])
    const [ overallTotal, setOverallTotal ] = useState(0)

    const { isLoading, hasError, clearError, sendRequest } = useFetch()

    const fetchLeaderboard = useCallback(async () => {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/order/leaderboard`
            )

            if (responseData.response === "empty") {
                setData([])
                setOverallTotal(0)
            } else {
                setData(responseData.response)
                setOverallTotal(parseInt(responseData.sumTotal))
            }
            

        } catch (error) {
            console.log(error)
        }
    }, [ sendRequest ])

    useEffect(() => {

        fetchLeaderboard()

    }, [ fetchLeaderboard ])

    useEffect(() => {
        const interval = setInterval(() => {
            fetchLeaderboard()
            // console.log('rerendering!')
        }, 30000)

        return () => clearInterval(interval)
    }, [ fetchLeaderboard ])

    const topThree = data.slice(0,3)
    const fourThroughTen = data.slice(3,11)

    const content = (
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
    )

    return (
        <React.Fragment>
            <div className="h-screen object-fill" style={{backgroundImage: `url(${bgImage})`}}>
                <div className="bg-red-900/90 h-full flex items-center">

                

                <ErrorModal error = { hasError } onClear = { clearError } />

                { isLoading && <LoadingSpinner />}

                    {
                        data.length === 0 ?
                        <div className="w-2/3 mx-auto h-2/5 bg-black/30 p-12 rounded-2xl border-[16px] border-green-700">
                            <LargeEmptyLeaderBoard />
                        </div>
                        :
                            content
                    }

                    
                </div>

            </div>
        </React.Fragment>
    )
}

export default LargeLeaderBoard