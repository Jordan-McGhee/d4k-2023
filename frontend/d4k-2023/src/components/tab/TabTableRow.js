import React from "react";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";

const TabTableRow = props => {

    const addDonationHandler = event => {
        event.preventDefault()

        console.log(event.target)
    }

    const closeTabHandler = event => {
        event.preventDefault()

        console.log(event.target)
    }

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

                <td className="px-6 py-3 text-center">
                    { props.tab.total_unpaid ? `$${props.tab.total_unpaid}` : '$0' }
                </td>

                <td className="px-6 py-3 text-center">
                    $0
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
                </td>
            </tr>

        </React.Fragment>
    )
}

export default TabTableRow