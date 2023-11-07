import React, { useState, useEffect, useCallback } from "react";
import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/Large/LargeLeaderBoard"
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { isMobile } from 'react-device-detect';

const LeaderBoard = () => {

    const [ data, setData ] = useState([])
    const [ overallTotal, setOverallTotal ] = useState(0)

    const { isLoading, hasError, clearError, sendRequest } = useFetch()

    const fetchLeaderboard = useCallback(async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/leaderboard`)
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
        }, 30000)
        return () => clearInterval(interval)
    }, [ fetchLeaderboard ])

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            {
                data.length === 0 && !isLoading ? 
                    <MobileEmptyLeaderBoard total = { overallTotal } />
                :
                <div className="lg:hidden">
                    <MobileLeaderBoard data = { data } total = { overallTotal }/>
                </div>
            }


            {
            <div className="hidden lg:block">
                <LargeLeaderBoard data = { data } total = { overallTotal } />
            </div>}

        </React.Fragment>
    )
}

export default LeaderBoard