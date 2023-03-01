import React, { useState } from "react";
import Button from "../FormElements/Button";
import { useFetch } from "../../hooks/useFetch";

const AdminTableRow = props => {

    const [ paidStatus, setPaidStatus ] = useState(props.order.is_paid)
    const [ completedStatus, setCompletedStatus ] = useState(props.order.is_completed)

    const { sendRequest } = useFetch()

    // UPDATES PAID STATUS OF SPECIFIC ORDER
    const updatePaidHandler = async event => {
        event.preventDefault()

        // GRABS PAID STATUS AND ID FROM HIDDEN INPUT TO USE IN FORM SUBMISSION
        const id = event.target[0].value
        // const paidStatus = event.target[0].value.split(",")[1] === "1" ? true : false

        console.log("Updating paid status!")

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order/${id}/updatePaid`,
                // METHOD
                "PATCH",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({isPaid:paidStatus})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(response.newValue)

        setPaidStatus(response.newValue)
    }

    // UPDATES COMPLETED STATUS OF SPECIFIC ORDER
    const updateCompletedHandler = async event => {
        event.preventDefault()

        const id = event.target[0].value

        console.log("Updating completed status!")

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order/${id}/updateCompleted`,
                // METHOD
                "PATCH",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({isCompleted:completedStatus})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(response.newValue)

        setCompletedStatus(response.newValue)

    }

    // STARTS PROCESS OF DELETING SPECIFIC ORDER
    // WILL PROMPT FOR CONFIRMATION
    const deleteOrderHandler = event => {
        event.preventDefault()
    }

    return (
        <tr className = { props.className }>
            <td className="px-6 py-3 font-bold">{ props.order.username }</td>
            <td className="px-6 py-3">{ props.order.drink }</td>
            <td className="px-6 py-3">{ props.order.quantity }</td>
            {/* <td>{ order.total }</td> */}
            <td className="px-6 py-3">{ props.order.created_at }</td>

            {/* PAID STATUS */}
            <td className="px-6 py-3 text-center">
                <form onSubmit={ updatePaidHandler }>

                    <input
                        hidden
                        readOnly
                        value = { props.order.order_id }
                    />

                    <Button
                        text = { paidStatus ? "YES" : "NO"}
                        className = { paidStatus ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                        type = "SUBMIT"
                    />
                </form>
            </td>

            {/* COMPLETED STATUS */}
            <td className="px-6 py-3 text-center">
                <form onSubmit={ updateCompletedHandler }>

                    <input
                            hidden
                            readOnly
                            value = { props.order.order_id }
                    />

                    <Button
                        text = { completedStatus ? "COMPLETED" : "WAITING"}
                        className = { completedStatus ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                        type = "SUBMIT"
                    />
                </form>
            </td>

            {/* DELETE ORDER BUTTON */}
            <td className="px-6 py-3">
                <Button
                    text = "X"
                    className = "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"
                />
            </td>
        </tr>
    )
}

export default AdminTableRow
