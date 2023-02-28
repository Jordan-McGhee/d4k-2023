import React from "react";
import Button from "../FormElements/Button";

const AdminTableBody = props => {

    let items = props.data.map((order) => (
        <tr key = { order.order_id } className = "border-b bg-gray-800 border-gray-700 divide-x divide-gray-400">
            <td className="px-6 py-3 font-bold">{ order.username }</td>
            <td className="px-6 py-3">{ order.drink }</td>
            <td className="px-6 py-3">{ order.quantity }</td>
            {/* <td>{ order.total }</td> */}
            <td className="px-6 py-3">{ order.created_at }</td>
            <td className="px-6 py-3">
                <Button text = "NO"/>
            </td>
            <td className="px-6 py-3 text-center">
                <Button text = "WAITING"/>
            </td>
            <td className="px-6 py-3">
                <Button text = "X"/>
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