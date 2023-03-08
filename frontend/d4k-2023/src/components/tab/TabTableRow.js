import React from "react";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const TabTableRow = props => {

    const { sendRequest } = useFetch()
    const navigate = useNavigate()

    const addDonationHandler = event => {
        event.preventDefault()

        console.log(event.target)
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

    const tabButton = (
        props.tab.total_unpaid
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

            <tr className= { props.className }>
                <td className="px-6 py-3">
                    { props.tab.username }
                </td>

                <td className="px-6 py-3 text-center">
                    { props.tab.drinks_ordered }
                </td>

                <td className="px-6 py-3 text-center">
                    ${ props.tab.total }
                </td>

                <td className= { props.tab.total_unpaid ? "text-red-700 font-bold px-6 py-3 text-center" : "text-white font-bold px-6 py-3 text-center"}>
                    { props.tab.total_unpaid ? `$${props.tab.total_unpaid}` : '$0' }
                </td>

                <td className={ props.tab.total_donated ? "text-green-600 font-bold px-6 py-3 text-center" : "text-white font-bold px-6 py-3 text-center"}>
                    { props.tab.total_donated ? `$${props.tab.total_donated}` : '$0' }
                </td>

                <td className="px-6 py-3">
                    <form onSubmit={ addDonationHandler } className = "flex items-center justify-around">
                        <Input
                            type = "text"
                            placeholder = "Add Donation"
                            id = "donation-input"
                            className = "appearance-none w-5/6 bg-white text-black border rounded p-1 my-1 leading-tight focus:outline-green-700 focus:bg-white border-gray-2"
                        />

                        <Button
                            type = "SUBMIT"
                            text = "ADD"
                        />
                    </form>
                </td>

                <td className="px-6 py-3 text-center">
                    { tabButton }
                </td>
            </tr>

        </React.Fragment>
    )
}

export default TabTableRow