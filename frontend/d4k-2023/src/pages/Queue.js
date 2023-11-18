import React, { useEffect, useState } from "react";
import QueueList from "../components/queue/QueueList";
import ErrorModal from "../components/UIElements/ErrorModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import EmptyQueue from "../components/queue/EmptyQueue";
import { Spinner } from "@nextui-org/spinner";
import { useSearchParams } from "react-router-dom";
import { OrderApi } from "../api/orderApi";

const Queue = () => {
    
    const { isLoading, hasError, clearError, getOrders } = OrderApi()
    const [ loadedQueue, setLoadedQueue ] = useState([])
    const [ searchParams ] = useSearchParams();
    const [ paramOrderId, setParamOrderId ] = useState('')
    
    const fetchOrderQueue = async () => {
        try {
            const responseData = await getOrders()
            setLoadedQueue(responseData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchOrderQueue = async () => {
            try {
                const responseData = await getOrders()
                setLoadedQueue(responseData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrderQueue()
    }, [ ])

    useEffect(() => {
        let orderIdParam = parseInt(searchParams.get("orderId"))
        if (orderIdParam && loadedQueue.length > 0 && loadedQueue.find(o => o.order_id === orderIdParam)) {
            document.getElementById(orderIdParam).scrollIntoView({ behavior: 'smooth' })
            setParamOrderId(orderIdParam)
        }
    }, [ loadedQueue, searchParams ])

    return (
        <>
            <ErrorModal error = { hasError } onClear = { clearError } />
            {isLoading && 
                <Spinner 
                    color="success"
                    className="fixed top-1/4"
                    style={{left:'calc(50% - 40px)', zIndex:100}}
                    classNames={{
                        wrapper: "w-20 h-20",
                        circle1: "border-5",
                        circle2: "border-5"
                    }} />}
            <div className="m-auto lg:max-w-xl">
                    <div className="flex text-center justify-center items-center">
                        <p className="text-4xl font-bungee text-center justify-center text-green-600">Queue</p>
                    </div>
                    <div className="flex justify-center text-white text-4xl pt-2" onClick = { fetchOrderQueue }>
                        <FontAwesomeIcon icon={faRefresh} className="w-6 mr-2"/>
                        <p className="text-white text-lg">REFRESH</p>
                    </div>
                {
                    loadedQueue.length === 0 && !isLoading ?
                        <EmptyQueue />
                    : !isLoading ? 
                    <div>
                        <p className="text-white text-lg text-center my-5">
                            All open drink orders will show here. Refresh to check your spot in the queue
                        </p>
                        <QueueList
                            queue = { loadedQueue }
                            orderId = { paramOrderId }
                            deleteCallbackFunction = {fetchOrderQueue}
                        />
                    </div>
                    : <div></div>
                }
            </div>
        </>
    )
}

export default Queue