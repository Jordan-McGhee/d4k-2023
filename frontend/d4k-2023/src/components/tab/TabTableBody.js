import React from "react";
import TabTableRow from "./TabTableRow";

const TabTableBody = props => {

    let items = props.data.map((tab) => (
        <TabTableRow
            tab = { tab }
            className = { props.data.indexOf(tab) % 2 === 0 ? "border-b bg-gray-900 border-gray-700" : "border-b bg-gray-800 border-gray-700"}
            key = { `Tab ${props.data.indexOf(tab) + 1}`}
        />
    ))

    return (
        <tbody>
            { items }
        </tbody>
    )
}

export default TabTableBody