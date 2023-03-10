import React, { useState, useEffect } from "react";
import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/Large/LargeLeaderBoard";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";

const LeaderBoard = () => {

    const [ data, setData ] = useState([])
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
                setOverallTotal(responseData.sumTotal.sum)

            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()

    }, [ sendRequest ])

    console.log(`Total: ${overallTotal}`)

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            {/* MOBILE */}
            <div>
                <MobileLeaderBoard data = { data } total = { overallTotal }/>
            </div>

            {/* ALL OTHER SCREENS */}
            <div>

            </div>

        </React.Fragment>
    )
}

export default LeaderBoard