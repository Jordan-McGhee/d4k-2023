import React from "react";
import TabTableBody from "./TabTableBody";

const TabTable = props => {

    return (
        <div className="rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-white rounded-lg">

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <tr className="divide-x divide-gray-800">
                        <th scope="col" className="px-6 py-3 w-3/12">NAME & DRINKS</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">ORDERS TOTAL</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">ORDERS UNPAID</th>
                        {/* <th>AMOUNT</th> */}
                        <th scope="col" className="px-6 py-3 text-center w-1/12">DONATIONS TOTAL</th>
                        <th scope="col" className="px-6 py-3 text-center w-1/12">DONATIONS UNPAID</th>
                        <th scope="col" className="px-6 py-3 text-center w-3/12">ADD DONATION</th>
                        <th scope="col" className="px-6 py-3 text-center w-2/12">CLOSE TAB</th>
                    </tr>

                </thead>

                <TabTableBody data = { props.data } />

            </table>
        </div>
    )
}

export default TabTable