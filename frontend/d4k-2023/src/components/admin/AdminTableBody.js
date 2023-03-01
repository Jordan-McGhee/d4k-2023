import React from "react";
import Button from "../FormElements/Button";

const AdminTableBody = props => {

    // UPDATES PAID STATUS OF SPECIFIC ORDER
    const updatePaidHandler = async event => {
        event.preventDefault()

        console.log(event.target)
    }

    // UPDATES COMPLETED STATUS OF SPECIFIC ORDER
    const updateCompletedHandler = event => {
        event.preventDefault()
    }

    // STARTS PROCESS OF DELETING SPECIFIC ORDER
    // WILL PROMPT FOR CONFIRMATION
    const deleteOrderHandler = event => {
        event.preventDefault()
    }

    let items = props.data.map((order) => (
        <tr key = { order.order_id } className = { props.data.indexOf(order) % 2 === 0 ? "border-b bg-gray-900 border-gray-700" : "border-b bg-gray-800 border-gray-700"}>
            <td className="px-6 py-3 font-bold">{ order.username }</td>
            <td className="px-6 py-3">{ order.drink }</td>
            <td className="px-6 py-3">{ order.quantity }</td>
            {/* <td>{ order.total }</td> */}
            <td className="px-6 py-3">{ order.created_at }</td>

            {/* PAID STATUS */}
            <td className="px-6 py-3 text-center">
                <form onSubmit={ updatePaidHandler }>
                    <Button
                        text = { order.is_paid ? "YES" : "NO"}
                        className = { order.is_paid ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                        type = "SUBMIT"
                    />
                </form>
            </td>

            {/* COMPLETED STATUS */}
            <td className="px-6 py-3 text-center">
                <form>
                    <Button
                        text = { order.is_completed ? "COMPLETED" : "WAITING"}
                        className = { order.is_completed ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
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
    ))

    return (
        <tbody>
            { items }
        </tbody>
    )
}

export default AdminTableBody