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

    const [leaderboard, setLeaderBoard] = useState([])
    const [total, setTotal] = useState([])

    const { isLoadingOrderApi, hasError, clearError, getOrdersLeaderboard } = OrderApi()

    // leaderboard data fetching
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getOrdersLeaderboard()
                setLeaderBoard(data.response)
                setTotal(data.sumTotal)
            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()
    }, [])


    // leaderboard refresh
    useEffect(() => {
        const id = setInterval(async () => {
            try {
                const data = await getOrdersLeaderboard()
                setLeaderBoard(data.response)
                setTotal(data.sumTotal)
            } catch (error) {
                console.log(error)
            }
        }, 300000)
        return () => clearInterval(id)
    }, [])


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
                    leaderboard.length === 0 && !isLoadingOrderApi ?
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
                                <MobileLeaderBoard data={leaderboard} total={total} />
                            </div>
                            <div className="hidden lg:block">
                                <LargeLeaderBoard data={leaderboard} total={total} />
                            </div>
                        </>
            }
        </>
    )
}

export default LeaderBoard