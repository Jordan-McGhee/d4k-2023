import React from "react"
import DonationsTableRow from "./DonationsTableRow"

const DonationsTableBody = props => {
    let items = props.data.map((donation) => (
        <DonationsTableRow
            donation = { donation }
            key = { donation.donation_id }
            className = { props.data.indexOf(donation) % 2 === 0 ? "border-b bg-gray-900 border-gray-700" : "border-b bg-gray-800 border-gray-700"}
        />
    ))

    return (
        <tbody>
            { items }
        </tbody>
    )
}

export default DonationsTableBody