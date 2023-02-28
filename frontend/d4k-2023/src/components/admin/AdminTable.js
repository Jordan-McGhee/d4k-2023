import React from "react";
import Button from "../FormElements/Button";

const AdminTable = props => {

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
        <div className="rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr className="divide-x divide-gray-800">
                        <th scope="col" className="px-6 py-3 w-2/12">NAME</th>
                        <th scope="col" className="px-6 py-3 w-3/12">DRINK</th>
                        <th scope="col" className="px-6 py-3">QTY.</th>
                        {/* <th>AMOUNT</th> */}
                        <th scope="col" className="px-6 py-3">TIME</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">PAID</th>
                        <th scope="col" className="px-6 py-3 text-center w-2/12">STATUS</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">DELETE</th>
                    </tr>

                </thead>

                <tbody>
                    { items }
                </tbody>

            </table>
        </div>
    )
}

export default AdminTable