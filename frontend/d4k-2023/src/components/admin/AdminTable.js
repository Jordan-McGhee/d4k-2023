import React from "react";
import Button from "../FormElements/Button";

const AdminTable = props => {

    let items = props.data.map((order) => (
        <tr key = { order.order_id }>
            <td>{ order.username }</td>
            <td>{ order.drink }</td>
            <td>{ order.quantity }</td>
            <td>{ order.total }</td>
            <td>TODAY</td>
            <td>
                <Button text = "NO"/>
            </td>
            <td>
                <Button text = "WAITING"/>
            </td>
        </tr>
    ))

    return (
        <table className="table-auto">

            <thead>

                <tr>
                    <th>NAME</th>
                    <th>DRINK</th>
                    <th>QUANTITY</th>
                    <th>AMOUNT</th>
                    <th>TIME</th>
                    <th>PAID</th>
                    <th>STATUS</th>
                </tr>

            </thead>

            <tbody>
                { items }
            </tbody>

        </table>
    )
}

export default AdminTable