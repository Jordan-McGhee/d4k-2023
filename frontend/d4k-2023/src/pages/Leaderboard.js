import React, { useState, useEffect } from "react";
// import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/Large/LargeLeaderBoard"
import { OrderApi } from "../api/orderApi";
import ErrorModal from "../components/UIElements/ErrorModal";
import { Spinner } from "@nextui-org/react";
import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import LargeEmptyLeaderBoard from "../components/leaderboard/Large/LargeEmptyLeaderBoard";

const LeaderBoard = () => {

    const [topUsers, setTopUsers] = useState([])
    const [total, setTotal] = useState([])
    const [storedUserData, setStoredUserData] = useState()
    const [storedUserID, setStoredUserID] = useState()
    const [partyMetrics, setPartyMetrics] = useState()

    const { isLoadingOrderApi, hasError, clearError, getOrdersLeaderboard } = OrderApi()

    // check for local storage user id
    useEffect(() => {
        let storedID = localStorage.getItem(`userId`)

        if (storedID) {
            setStoredUserID(parseInt(storedID))
        }
    }, [])

    // leaderboard data fetching
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getOrdersLeaderboard(storedUserID)
                setTopUsers(data.topUsers)
                setTotal(data.sumTotal)
                setStoredUserData(data.userRank)
                setPartyMetrics([data.totalUsers, data.drinkQuantity, data.shotQuantity])
            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()
    }, [storedUserID])

    // console.log(topUsers, total, storedUserID, storedUserData, partyMetrics)

    // leaderboard refresh
    useEffect(() => {
        const id = setInterval(async () => {
            try {
                const data = await getOrdersLeaderboard(storedUserID)
                setTopUsers(data.topUsers)
                setTotal(data.sumTotal)
                setStoredUserData(data.userRank)
                setPartyMetrics([data.totalUsers, data.drinkQuantity, data.shotQuantity])
            } catch (error) {
                console.log(error)
            }
        }, 300000)
        return () => clearInterval(id)
    }, [getOrdersLeaderboard, storedUserID])


    return (
        <>
            {/* ERROR MODAL AND LOADING CHECK */}

            <ErrorModal error={hasError} onClear={clearError} />
            {
                isLoadingOrderApi ?
                    <Spinner
                        color="success"
                        className="fixed top-1/4"
                        style={{ left: 'calc(50% - 40px)', zIndex: 100 }}
                        classNames={{
                            wrapper: "w-20 h-20",
                            circle1: "border-5",
                            circle2: "border-5"
                        }}
                    />
                    :
                    topUsers.length === 0 && total && partyMetrics && !isLoadingOrderApi ?
                        <>
                            <div className="lg:hidden">
                                <MobileEmptyLeaderBoard />
                            </div>
                            <div className="hidden lg:block">
                                <LargeEmptyLeaderBoard />
                            </div>
                        </>
                        :
                        <>
                            <div className="lg:hidden">
                                <MobileLeaderBoard topUsers={topUsers} user={storedUserData} total={total} partyMetrics={partyMetrics} />
                            </div>
                            <div className="hidden lg:block">
                                <LargeLeaderBoard data={topUsers} total={total} />
                            </div>
                        </>
            }
        </>
    )
}

export default LeaderBoard