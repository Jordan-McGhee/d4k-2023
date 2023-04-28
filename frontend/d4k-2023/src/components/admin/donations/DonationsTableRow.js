import React, { useState } from "react";
import Button from "../../FormElements/Button";
import { useFetch } from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import comment from "../../../images/comment.png"
import Input from "../../FormElements/Input";
import convertDate from "../../../DateTimeConversion/convertDateTime";

const DonationsTableRow = props => {

    // SHITTY WAY TO RE-RENDER TABLES
    const navigate = useNavigate()

    const { sendRequest } = useFetch()

    // STATES FOR PAID, SHOW DELETE MODAL AND SHOW COMMENT ROW
    const [ paidStatus, setPaidStatus ] = useState(props.donation.is_paid)
    const [ donationAmount, setDonationAmount ] = useState(props.donation.amount)
    const [ showModal, setShowModal ] = useState([ false, null ])
    const [ showComment, setShowComment ] = useState(false)

    // UPDATES PAID STATUS OF DONATION
    const updatePaidHandler = async event => {
        event.preventDefault()

        // GRABS PAID STATUS AND ID FROM HIDDEN INPUT TO USE IN FORM SUBMISSION
        const id = event.target[0].value
        // const paidStatus = event.target[0].value.split(",")[1] === "1" ? true : false

        console.log("Updating paid status!")

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/donation/${id}/updatePaid`,
                // METHOD
                "PATCH",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({isPaid:paidStatus})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(response.newValue)

        setPaidStatus(response.newValue)
    }

    const updateAmountHandler = async event => {
        event.preventDefault()

        const id = event.target[0].value
        const newAmount = event.target[1].value

        console.log(`Updating Donation #${id}'s amount to ${newAmount}! Old Amount: ${ donationAmount }`)

        let response
        
        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/donation/${id}/amount`,
                // METHOD
                "PATCH",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({ originalAmount: donationAmount, newAmount: newAmount})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(response)

        navigate(0)

        setDonationAmount(newAmount)
    }

    // STARTS PROCESS OF DELETING SPECIFIC DONATION
    // WILL PROMPT FOR CONFIRMATION
    
    const submitDeleteHandler = event => {
        event.preventDefault()
        
        console.log(event.target[0].value)
        const id = event.target[0].value
        setShowModal([ true, id ])
    }
    
    const closeDeleteModalHandler = () => {
        setShowModal([ false, null ])
    }

    // quick boolean to check if the row has been updated in the last 5 minutes
    const recentlyUpdated = new Date().getTime() - new Date(props.donation.updated_at) < 300000

    return (
        <React.Fragment>

            {
                showModal[0] &&
                <DeleteModal
                    donation_id = { showModal[1] }
                    show = { showModal[0] }
                    onCancel = { closeDeleteModalHandler }
                />
            }

            <tr className = { props.className }>
                <td className="px-6 py-3 font-bold flex justify-between items-center my-2" onClick={ () => setShowComment(!showComment)}>
                    <div className="flex items-center">
                        {
                            recentlyUpdated && 
                            <div className="rounded-full h-2 w-2 bg-green-400 mr-2 animate-pulse" />
                        }
                        <p>{ props.donation.username }</p>
                    </div>
                    { 
                        props.donation.comments !== null && props.donation.comments !== "" &&
                        <img alt="comment icon" src={ comment } className = "w-5" />
                    }
                </td>
                <td className="px-6 py-3">{ convertDate(props.donation.created_at) }</td>
                <td className="px-6 py-3 text-center">${ props.donation.amount }</td>

                {/* UPDATEAMOUNT */}
                <td className="px-6 py-3 text-center">
                    <form onSubmit={ updateAmountHandler } className = "flex items-center justify-around">

                        <input
                                hidden
                                readOnly
                                value = { props.donation.donation_id }
                        />
                        <Input
                            type = "number"
                            placeholder = "Update Amount"
                            id = { `donation-amount-update-${props.donation.donation_id}` }
                            className = "appearance-none w-11/12 bg-white text-black border rounded p-1 my-1 leading-tight focus:outline-green-700 focus:bg-white border-gray-2"
                        />

                        <Button
                            text = "UPDATE"
                            className = "bg-blue-700 button rounded-md shadow text-white font-bold"
                            type = "SUBMIT"
                        />
                    </form>
                </td>

                {/* PAID STATUS */}
                <td className="px-6 py-3 text-center">
                    <form onSubmit={ updatePaidHandler }>

                        <input
                            hidden
                            readOnly
                            value = { props.donation.donation_id }
                        />

                        <Button
                            text = { paidStatus ? "YES" : "NO"}
                            className = { paidStatus ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                            type = "SUBMIT"
                        />
                    </form>
                </td>

                {/* DELETE ORDER BUTTON */}
                <td className="px-6 py-3 text-center">
                    <form onSubmit={ submitDeleteHandler }>
                        <input
                            hidden
                            readOnly
                            value = { props.donation.donation_id }
                        />
                        <Button
                            text = "X"
                            type = "SUBMIT"
                            className = "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"
                        />
                    </form>
                </td>
            </tr>

            {
                props.donation.comments !== null && showComment && 
                <tr className={ props.className } onClick = { () => setShowComment(!showComment)}>
                    <td colSpan={12} className = "px-6 py-3"><span className="font-bold">—— Comment:</span> { props.donation.comments }</td>
                </tr>
            }
        </React.Fragment>
    )
}

export default DonationsTableRow