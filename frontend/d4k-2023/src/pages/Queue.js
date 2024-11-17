import React, { useEffect, useState } from "react";

import QueueList from "../components/queue/QueueList";
import ErrorModal from "../components/UIElements/ErrorModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import EmptyQueue from "../components/queue/EmptyQueue";
import { Button, Spinner } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";
import { OrderApi } from "../api/orderApi";

const Queue = () => {
    
    const { isLoadingOrderApi, hasError, clearError, getOrders } = OrderApi()
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
            {isLoadingOrderApi && 
                <Spinner 
                    color="success"
                    className="fixed top-1/4"
                    style={{left:'calc(50% - 40px)', zIndex:100}}
                    classNames={{
                        wrapper: "w-20 h-20",
                        circle1: "border-5",
                        circle2: "border-5"
                    }} />}
            <div className="m-auto lg:max-w-xl mb-24 justify-center text-center">
                    <div className="flex text-center justify-center items-center">
                        <p className="text-4xl font-bungee text-center justify-center text-emerald-600">Queue</p>
                    </div>
                    <Button radius="full" className="mt-3 text-center justify-center text-white p-4 bg-emerald-600" onPress = { fetchOrderQueue }>
                        <p className="text-white font-bungee text-lg">Refresh</p>
                        <FontAwesomeIcon icon={faRefresh} size="lg" className="ml-2"/>
                    </Button>
                {
                    loadedQueue.length === 0 && !isLoadingOrderApi ?
                        <EmptyQueue />
                    : !isLoadingOrderApi ? 
                    <div>
                        <p className="text-white text-lg font-fugaz text-center my-5">
                            Open drink orders will show here <br/> Refresh to check your spot in the queue
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