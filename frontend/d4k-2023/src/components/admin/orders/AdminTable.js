import React from "react";
import AdminTableBody from "./AdminTableBody"

const AdminTable = props => {


    return (
        <div className="rounded-lg shadow-md">
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr className="divide-x divide-gray-800">
                        <th scope="col" className="px-6 py-3 w-3/12">NAME</th>
                        <th scope="col" className="px-6 py-3 w-3/12">DRINK</th>
                        <th scope="col" className="px-6 py-3">QTY.</th>
                        {/* <th>AMOUNT</th> */}
                        <th scope="col" className="px-6 py-3">TIME</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">PAID</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">STATUS</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">DELETE</th>
                    </tr>

                </thead>

                <AdminTableBody data = { props.data } />

            </table>
        </div>
    )
}

export default AdminTable