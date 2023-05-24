import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import QueueList from "../components/queue/QueueList";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"
import refresh from "../images/icons/refresh.png"
import EmptyQueue from "../components/queue/EmptyQueue";

const Queue = () => {
    
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

                // console.log(`Queue: ${ responseData.results[0] }`)

                responseData.results === "empty" ? setLoadedQueue([]) : setLoadedQueue(responseData.results)
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
                    <div className="flex items-center">
                        {/* <img src={ queue } alt="queue icon" className="w-8 mr-3"/> */}
                        <p className="text-white text-4xl font-bold">Queue</p>
                    </div>
                    <div className="flex items-center" onClick = { () => navigate(0) }>
                        <img src={ refresh } alt="refresh icon" className="w-6 mr-3"/>
                        <p className="text-white text-lg">REFRESH</p>
                    </div>
                </div>


                {
                    loadedQueue.length === 0 ?
                        <EmptyQueue />
                    :
                    <div>
                        <p className="text-white text-lg text-center my-5">All open drink orders will show here. Refresh to check your spot in the queue!</p>
                        <QueueList
                            queue = { loadedQueue }
                        />
                    </div>
                }

            </div>

        </React.Fragment>
    )
}

export default Queue