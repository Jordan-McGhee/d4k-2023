import React, { useEffect, useState } from "react";
import QueueList from "../components/queue/QueueList";
import { useFetch } from "../hooks/useFetch";
import ErrorModal from "../components/UIElements/ErrorModal"
import refresh from "../images/icons/refresh.png"
import EmptyQueue from "../components/queue/EmptyQueue";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "react-router-dom";

const Queue = () => {
    
    // state for loaded queue from database
    const [ loadedQueue, setLoadedQueue ] = useState([])
    const [ searchParams ] = useSearchParams();
    const [ paramOrderId, setParamOrderId ] = useState('')

    const { isLoading, hasError, sendRequest, clearError } = useFetch()
    const fetchOrderQueue = async () => {
        try {
            const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/`)
            responseData.results === "empty" ? setLoadedQueue([]) : setLoadedQueue(responseData.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchOrderQueue = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/`)
                responseData.results === "empty" ? setLoadedQueue([]) : setLoadedQueue(responseData.results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrderQueue()
    }, [ sendRequest ])

    useEffect(() => {
        let orderIdParam = parseInt(searchParams.get("orderId"))
        if (orderIdParam && loadedQueue.length > 0 && loadedQueue.find(o => o.order_id === orderIdParam)) {
            document.getElementById(orderIdParam).scrollIntoView({ behavior: 'smooth' })
            setParamOrderId(orderIdParam)
        }
    }, [ loadedQueue, searchParams ])


    return (
        <React.Fragment>
            <ErrorModal error = { hasError } onClear = { clearError } />
            {isLoading && <Spinner color="success" className="fixed top-2/4" style={{left:'calc(50% - 20px)'}} size="lg" />}
            <div className="m-auto lg:max-w-xl">
                <div className="flex justify-between items-center">p
                    <div className="flex items-center">
                        {/* <img src={ queue } alt="queue icon" className="w-8 mr-3"/> */}
                        <p className="text-4xl font-bungee text-center justify-center text-green-700">Queue</p>
                    </div>
                    <div className="flex items-center" onClick = { fetchOrderQueue }>
                        <img src={ refresh } alt="refresh icon" className="w-6 mr-3"/>
                        <p className="text-white text-lg">REFRESH</p>
                    </div>
                </div>
                {
                    loadedQueue.length === 0 && !isLoading ?
                        <EmptyQueue />
                    : !isLoading ? 
                    <div>
                        <p className="text-white text-lg text-center my-5">All open drink orders will show here. Refresh to check your spot in the queue!</p>
                        <QueueList
                            queue = { loadedQueue }
                            orderId = { paramOrderId }
                        />
                    </div>
                    : <div></div>
                }

            </div>

        </React.Fragment>
    )
}

export default Queue