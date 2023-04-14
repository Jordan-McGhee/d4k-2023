import React, { useState } from "react";
import Button from "../FormElements/Button";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import TabAddDonationModal from "./TabAddDonationModal";

const TabTableRow = props => {

    const { sendRequest } = useFetch()
    const navigate = useNavigate()

    const [ showAddModal, setShowAddModal ] = useState([false, null])

    const closeAddModalHandler = () => {
        setShowAddModal([false, null])
    }

    const closeDonationsHandler = async event => {
        event.preventDefault()

        const username = event.target[0].value
        
        console.log(`Updating ${username}'s donations to closed!`)

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/donation/${username}/closeDonations`,
                // METHOD
                "POST",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({username:username})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(`Response: ${response}`)

        navigate(0)
    }
    
    const closeTabHandler = async event => {
        event.preventDefault()

        const username = event.target[0].value
        
        console.log(`Updating ${username}'s tab to closed!`)

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order/${username}/closeTab`,
                // METHOD
                "POST",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({username:username})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(`Response: ${response}`)

        navigate(0)
    }

    const donationButton = (
        props.tab.donations_total_unpaid
            ?
                <form onSubmit = { closeDonationsHandler }>
                    <input
                        hidden
                        readOnly
                        value = { props.tab.username }
                    />

                    <Button
                        type = "SUBMIT"
                        text = "MARK PAID"
                        className = "bg-blue-700 button rounded-md shadow text-white font-bold"
                    />
                </form>
            :
                <Button
                    text = "DONO PAID!"
                    type = "text"
                    className = "button border border-blue-700 bg-none rounded-md text-white font-bold"
                />
    )

    const tabButton = (
        props.tab.orders_total_unpaid
            ?
                <form onSubmit = { closeTabHandler }>
                    <input
                        hidden
                        readOnly
                        value = { props.tab.username }
                    />

                    <Button
                        type = "SUBMIT"
                        text = "CLOSE TAB"
                        className = "bg-blue-700 button rounded-md shadow text-white font-bold"
                    />
                </form>
            :
                <Button
                    text = "TAB PAID!"
                    type = "text"
                    className = "button border border-blue-700 bg-none rounded-md text-white font-bold"
                />

    )

    return (
        <React.Fragment>

            {
                showAddModal && 
                <TabAddDonationModal
                    username = { showAddModal[1]}
                    show = { showAddModal[0] }
                    onCancel = { closeAddModalHandler }
                />
            }

            <tr className= { props.className }>
                <td className="px-6 py-3">
                    { props.tab.username } — { props.tab.drinks_ordered} drinks
                </td>

                <td className="px-6 py-3 text-center">
                    ${ props.tab.orders_total }
                </td>

                <td className={ props.tab.orders_total_unpaid ? "text-red-700 font-bold px-6 py-3 text-center" : "text-white font-bold px-6 py-3 text-center"}>
                    { props.tab.orders_total_unpaid ? `$${ props.tab.orders_total_unpaid}` : `$0`}
                </td>

                <td className= { props.tab.donations_total ? "text-green-600 font-bold px-6 py-3 text-center" : "text-white font-bold px-6 py-3 text-center"}>
                    { props.tab.donations_total ? `$${props.tab.donations_total}` : '$0' }
                </td>

                <td className={ props.tab.donations_total_unpaid ? "text-red-700 font-bold px-6 py-3 text-center" : "text-white font-bold px-6 py-3 text-center"}>
                    { props.tab.donations_total_unpaid ? `$${props.tab.donations_total_unpaid}` : '$0' }
                </td>

                <td className="px-6 py-3">
                    <Button
                        type = "button"
                        text = "Add"
                        onClick = { () => setShowAddModal([ true, props.tab.username ]) }
                    />
                </td>

                <td className="px-6 py-3 text-center">
                    { donationButton }
                </td>

                <td className="px-6 py-3 text-center">
                    { tabButton }
                </td>
            </tr>

        </React.Fragment>
    )
}

export default TabTableRow