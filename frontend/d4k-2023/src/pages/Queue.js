import React from "react";
import QueueList from "../components/queue/QueueList";

// DUMMY DATA
import data from "../DUMMY/DUMMY_DATA"

const Queue = () => {

    let liveQueue = data.ORDERS.filter((order) => order.deliveredToCustomer === false)

    return (
        <div className="">

            {/* div for title & refresh */}
            <div className="flex justify-between items-center">
                <p className="text-white text-4xl font-bold">Queue</p>
                <p className="text-white text-lg">REFRESH</p>
            </div>

            <p className="text-white text-lg text-center my-5">All open drink orders will show here. Refresh to check your spot in the queue!</p>


            {/* queue list */}
            <QueueList
                queue = { liveQueue }
            />

        </div>
    )
}

export default Queue