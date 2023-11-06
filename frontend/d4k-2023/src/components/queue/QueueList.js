import React, { useEffect, useState } from "react";
import { Card, CardBody, Chip, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import { useSearchParams } from "react-router-dom";

const QueueList = (props) => {
    const [ searchParams ] = useSearchParams();
    useEffect(() => {
        let paramOrderId = searchParams.get("orderId")
        if (paramOrderId && props.queue.length > 0 && props.queue.find(o => o.order_id === paramOrderId)) {
            document.getElementById(paramOrderId).scrollIntoView({ behavior: 'smooth' })
            //setParamOrderId(parseInt(paramOrderId))
        }
    }, [ ])

    let items = props.queue.map((order, i) => (

        <Card id={order.order_id} key={order.order_id} isFooterBlurred radius="lg" className={`px-5 py-2 my-3 ${props.orderId === order.order_id ? 'bg-green-600 testhere' : ''}`}>
            <CardHeader className="flex pl-2 pt-0 pb-0">
                <div className="flex flex-col">
                    <p className="text-2xl text-grey-800 font-bold">{order.username}</p>
                </div>
            </CardHeader>
            <CardBody className="text-md pl-2 pt-0 pb-2">
                <div className="flex justify-between">
                    <span className="flex flex-none max-w-xs">
                        {order.drink}
                    </span>
                    { order.quantity > 1 &&
                        <span className="flex flex-1">    
                            <Chip className="font-bold text-md ml-3" variant="shadow"
                                classNames={{
                                    base: "bg-gradient-to-br from-indigo-800/50 to-rose-500/50 border-small border-white/50 ",
                                    content: "drop-shadow shadow-black text-white",
                                }}>x{order.quantity}
                            </Chip>
                        </span> 
                    }
                </div>
            </CardBody>
            { order.comments && 
            <div>
                <Divider/>

                <CardFooter className="bg-white/10 bottom-0 border-t-1 border-zinc-100/50 justify-between py-0">
                    <div className="italic text-gray-700">{order.comments}</div>
                </CardFooter>
                </div>
            }
        </Card>
    ))

    return (
        <div>
           
            <p className="text-4xl font-bold font-fugaz text-center text-green-600">Working On It</p>
            { items.slice(0, 1) }

            <p className="text-4xl font-bold font-fugaz text-center text-green-600">Up Next</p>
            { items.slice(1)}
        </div>
    )
}

export default QueueList