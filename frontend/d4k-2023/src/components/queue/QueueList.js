import React from "react";
import QueueItem from "./QueueItem";

const QueueList = (props) => {

    let items = props.queue.map((order) => (
        <QueueItem
            id = { order.order_id }
            key = { order.order_id }
            username = { order.username }
            drink = { order.drink }
            quantity = { order.quantity }
            spotInQueue = { props.queue.indexOf(order) + 1 }
        />
    ))

    return (
        <ul>
            <p className="text-4xl font-bold uppercase text-green-600">Working On It!</p>
            { items.slice(0, 1) }

            <p className="text-4xl font-bold uppercase text-green-600">UP NEXT</p>
            { items.slice(1)}
        </ul>
    )
}

export default QueueList