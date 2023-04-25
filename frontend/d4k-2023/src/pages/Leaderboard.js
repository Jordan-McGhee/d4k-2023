import React, { useState, useEffect } from "react";
import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
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
        }

        fetchLeaderboard()

    }, [ sendRequest ])

    // console.log(`Total: ${overallTotal}`)

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            {
                data.length === 0 ? 
                    <MobileEmptyLeaderBoard total = { overallTotal } />
                :
                <div className="md:hidden">
                    <MobileLeaderBoard data = { data } total = { overallTotal }/>
                </div>
            }


            {/* ALL OTHER SCREENS
            <div className="hidden md:block">
                <LargeLeaderBoard data = { data } total = { overallTotal } />
            </div> */}

        </React.Fragment>
    )
}

export default LeaderBoard