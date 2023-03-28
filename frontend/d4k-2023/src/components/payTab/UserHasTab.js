import React, { useState } from "react";
import Card from "../UIElements/Card";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";
import PayFooter from "./PayFooter";

const UserHasTab = (props) => {

    const navigate = useNavigate()

    const data = props.data

    const [ confirmClose, setConfirmClose ] = useState(false)
    
    const cardFooter = (
        <div>
            <Button
                text = "Not Yet"
                type = "text"
                className = "bg-red-700 button rounded-md shadow font-bold uppercase text-white mr-2"
            />

            <Button
                text = "Close My Tab"
                type = "text"
                onClick = { () => setConfirmClose(true)}
            />
        </div>
    )

    let content = (
        <Card header = {"Leaving so soon?"} footer = { cardFooter }>
            <p className="text-2xl font-medium">Thanks for coming to the 4th annual D4K, <span className="italic uppercase font-bold text-green-700">{ data.username }!</span></p>

            {/* <p className="text-xl my-4">If you're still grabbing drinks, we recommend holding off on closing your tab!</p> */}

            <p className="text-xl my-4">If you're ready to go, we hope you've had a great time! Click the <span className="italic uppercase font-bold text-green-700">CLOSE MY TAB</span> button below to pay.</p>

            {/* <p>Donations: ${ data.donations_total_unpaid }</p>
            <p>Orders: ${ data.orders_total_unpaid } </p> */}
            <p className="text-2xl font-bold">Total Due: ${ parseInt(data.donations_total_unpaid) + parseInt(data.orders_total_unpaid)}</p>
        </Card>
    )

    if (confirmClose) {
        content = (
            <Card header = { `${data.username}'s Tab`} headerClass = "font-bold text-3xl border-b-2 mb-4 py-2 text-center capitalize" footer = { <PayFooter /> }>

                <p className="text-2xl flex justify-between mb-4">Drinks Ordered: <span className="italic uppercase font-bold text-green-700">{data.drinks_ordered}</span></p>

                <p className="text-2xl flex justify-between">Unpaid Orders: <span className="italic uppercase font-bold text-green-700">${data.orders_total_unpaid}</span></p>

                <p className="text-2xl my-4 flex justify-between">Unpaid Donations: <span className="italic uppercase font-bold text-green-700">${data.donations_total_unpaid}</span></p>

                <p className="text-2xl flex justify-between border-t-2 pt-4">Total Due: <span className="italic uppercase font-bold text-green-700">${ parseInt(data.donations_total_unpaid) + parseInt(data.orders_total_unpaid)}</span></p>

                <p className="text-center mt-4">Don't want to pay yet? <span className="italic border-b-2 text-green-700" onClick = { () => navigate('/order')}>You should spend more money!</span></p>
            </Card>
        )
    }

    return (
        <div>
            { content }
        </div>
    )
}

export default UserHasTab