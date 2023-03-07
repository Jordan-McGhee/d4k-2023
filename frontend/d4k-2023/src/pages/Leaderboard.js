import React, { useState, useEffect } from "react";
import MobileLeaderBoard from "../components/leaderboard/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/LargeLeaderBoard";
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";

const LeaderBoard = () => {

    const [ data, setData ] = useState([])

    const { isLoading, hasError, clearError, sendRequest } = useFetch()

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/order/leaderboard`
                )

                console.log(`Leaderboard: ${ typeof responseData.response }`)
                setData(responseData.response)

            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()

    }, [ sendRequest ])

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            <h1>LeaderBoard</h1>

            {/* MOBILE */}
            <div>
                <MobileLeaderBoard data = { data } />
            </div>

            {/* ALL OTHER SCREENS */}
            <div>

            </div>

        </React.Fragment>
    )
}

export default LeaderBoard