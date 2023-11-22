import React, { useState, useEffect, useCallback }  from "react";
// import HonorableMentions from "./HonorableMentions";
import LargeLeaderBoardList from "./LargeLeaderBoardList";
import LargeLeaderBoardItem from "./LargeLeaderBoardItem"
import LargeTopThreeItem from "./LargeTopThreeItem";
import LargeProgressBar from "./LargeProgressBar";
import ErrorModal from "../../UIElements/ErrorModal";
import LoadingSpinner from "../../UIElements/LoadingSpinner";
import { Spinner} from "@nextui-org/react"
import { useFetch } from "../../../hooks/useFetch";

import bgImage from "../../../images/leaderboard.jpg"
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
        const interval = setInterval(() => {fetchLeaderboard()}, 30000)
        return () => clearInterval(interval)
    }, [ fetchLeaderboard ])

    const topThree = props.data.slice(0,3)
    const fourThroughEight = props.data.slice(3,8)
    console.log(fourThroughEight)

    const content = (
        <div className="flex flex-col justify-around items-center p-10 mx-auto">
                    <div className="uppercase flex items-center font-bold text-emerald-600 text-7xl font-bungee pb-10">Drink 4 The Kids 
                        <span className="font-fugaz text-slate-500 text-6xl pl-6">Leaderboard</span>
                    </div>
            <div className="flex items-center w-full items-stretch">
                <div className="flex flex-col w-1/12">
                    <LargeProgressBar total = { props.overallTotal } />
                </div>
                    <div className="flex flex-col w-8/12 mx-6 px-4 justify-around">
                        <ul className="flex justify-center my-12  px-16 rounded-2xl">
                        { topThree.map((user, i) => (
                            <LargeTopThreeItem
                                id = {`large-leaderboard-topThree-${i}`}
                                key = {`large-leaderboard-topThree-${i}`}
                                username = { user.username }
                                orderTotal = { user.quantity ? parseInt(user.quantity) : 0 }
                                donationTotal = { user.amount_paid ? parseInt(user.amount_paid) : 0}
                                drinksOrdered = { user.quantity ? user.quantity : 0}
                                rank = { i + 1}
                            />
                        )) }
                        </ul>
                    </div>
                    {
                        fourThroughEight.length !== 0 && 
                        <div className="flex flex-col h-full mt-20 w-3/12">
                            {
                                fourThroughEight.map((user, i) => (
                                    <LargeLeaderBoardItem
                                        id = { `large-leaderboard-${i}`}
                                        key = { `large-leaderboard-${i}`}
                                        username = { user.username }
                                        orderTotal = { user.orders_total ? parseInt(user.orders_total) : 0 }
                                        donationTotal = { user.donations_total ? parseInt(user.donations_total) : 0}
                                        drinksOrdered = { user.drinks_ordered ? user.drinks_ordered : 0}
                                        rank = { i+ 4}
                                    />
                                ))
                            }
                        </div>
                    }
            </div>
        </div>
    )

    return (
        <React.Fragment>
            <div className="bg-cover" style={{backgroundImage: `url(${bgImage})`, padding:0, margin:0}}>
                <div>

                {isLoading && <Spinner 
                                color="success"
                                className="fixed top-2/4"
                                style={{left:'calc(50% - 40px)', zIndex:100}}
                                classNames={{
                                    wrapper: "w-20 h-20",
                                    circle1: "border-8",
                                    circle2: "border-8"
                                }} /> }
                    {
                        data.length === 0 ?
                        <div className="w-2/3 mx-auto h-2/5 p-12 rounded-2xl border-[16px] border-green-700">
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