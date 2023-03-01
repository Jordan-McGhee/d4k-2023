import React from "react";
import AdminTableRow from "./AdminTableRow";

const AdminTableBody = props => {

    let items = props.data.map((order) => (
        <AdminTableRow
            order = { order }
            className = { props.data.indexOf(order) % 2 === 0 ? "border-b bg-gray-900 border-gray-700" : "border-b bg-gray-800 border-gray-700"}
            key = { order.order_id }
        />
    ))

    return (
        <tbody>
            { items }
        </tbody>
    )
}

export default AdminTableBody