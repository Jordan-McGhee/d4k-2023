import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import QueueList from "../components/queue/QueueList";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"

// DUMMY DATA
// import data from "../DUMMY/DUMMY_DATA"

const Queue = () => {

    // let liveQueue = data.ORDERS.filter((order) => order.deliveredToCustomer === false)
    
    // state for loaded queue from database
    const [ loadedQueue, setLoadedQueue ] = useState([])

    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    useEffect(() => {
        const fetchOrderQueue = async () => {
            try {
                const responseData = await sendRequest(
                    // URL
                    `${process.env.REACT_APP_BACKEND_URL}/order/`
                    // NO NEED FOR METHOD, HEADERS, OR BODY
                )

                console.log(`Queue: ${ responseData.results[0] }`)

                setLoadedQueue(responseData.results)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrderQueue()

    }, [ sendRequest ])

    // useNavigate hook to refresh page when "REFRESH" is clicked
    const navigate = useNavigate()

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            <div className="">

                {/* div for title & refresh */}
                <div className="flex justify-between items-center">
                    <p className="text-white text-4xl font-bold">Queue</p>
                    <p className="text-white text-lg" onClick = { () => navigate(0) }>REFRESH</p>
                </div>

                <p className="text-white text-lg text-center my-5">All open drink orders will show here. Refresh to check your spot in the queue!</p>


                {/* queue list */}
                <QueueList
                    queue = { loadedQueue }
                />

            </div>

        </React.Fragment>
    )
}

export default Queue