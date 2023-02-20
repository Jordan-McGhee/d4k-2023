import React from "react";
import Button from "../FormElements/Button";

const AdminTable = props => {

    let items = props.data.map((order) => (
        <tr key = { props.id }>
            <td>{ order.name }</td>
            <td>Drinks</td>
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
                    <th>ORDER</th>
                    <th>PRICE</th>
                    <th>DATE</th>
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