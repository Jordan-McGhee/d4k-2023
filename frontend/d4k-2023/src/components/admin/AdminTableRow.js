import React, { useState } from "react";
import Button from "../FormElements/Button";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import comment from "../../images/comment.png"

const AdminTableRow = props => {

    // SHITTY WAY TO RE-RENDER TABLES
    const navigate = useNavigate()

    // STATES FOR PAID, COMPLETED, SHOW DELETE MODAL and SHOW COMMENT ROW
    const [ paidStatus, setPaidStatus ] = useState(props.order.is_paid)
    const [ completedStatus, setCompletedStatus ] = useState(props.order.is_completed)
    const [ showModal, setShowModal ] = useState([false, null])
    const [ showComment, setShowComment ] = useState(false)

    const { sendRequest } = useFetch()

    // UPDATES PAID STATUS OF SPECIFIC ORDER
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
                `${process.env.REACT_APP_BACKEND_URL}/order/${id}/updatePaid`,
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

    // UPDATES COMPLETED STATUS OF SPECIFIC ORDER
    const updateCompletedHandler = async event => {
        event.preventDefault()

        const id = event.target[0].value

        console.log("Updating completed status!")

        let response

        try {
            response = await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order/${id}/updateCompleted`,
                // METHOD
                "PATCH",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify({isCompleted:completedStatus})
            )
        } catch (error) {
            console.log(error)
        }

        console.log(response.newValue)

        setCompletedStatus(response.newValue)

        navigate(0)

    }

    // STARTS PROCESS OF DELETING SPECIFIC ORDER
    // WILL PROMPT FOR CONFIRMATION
    
    const submitDeleteHandler = event => {
        event.preventDefault()
        
        console.log(event.target[0].value)
        const id = event.target[0].value
        setShowModal([ true, id ])
    }
    
    const closeDeleteModalHandler = () => {
        setShowModal([false, null])
    }
    
    return (
        <React.Fragment>

            {
                showModal[0] &&
                <DeleteModal
                    order_id = { showModal[1] }
                    show = { showModal[0] }
                    onCancel = { closeDeleteModalHandler }
                />
            }

            <tr className = { props.className }>
                <td className="px-6 py-3 font-bold flex justify-between h-fit mt-2.5" onClick={ () => setShowComment(!showComment)}>
                    { props.order.username }
                    { 
                        props.order.comments !== null &&
                        <img alt="comment icon" src={ comment } className = "w-5" />
                    }
                </td>
                <td className="px-6 py-3">{ props.order.drink }</td>
                <td className="px-6 py-3 text-center">{ props.order.quantity }</td>
                {/* <td>{ order.total }</td> */}
                <td className="px-6 py-3">{ props.order.created_at }</td>

                {/* PAID STATUS */}
                <td className="px-6 py-3 text-center">
                    <form onSubmit={ updatePaidHandler }>

                        <input
                            hidden
                            readOnly
                            value = { props.order.order_id }
                        />

                        <Button
                            text = { paidStatus ? "YES" : "NO"}
                            className = { paidStatus ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                            type = "SUBMIT"
                        />
                    </form>
                </td>

                {/* COMPLETED STATUS */}
                <td className="px-6 py-3 text-center">
                    <form onSubmit={ updateCompletedHandler }>

                        <input
                                hidden
                                readOnly
                                value = { props.order.order_id }
                        />

                        <Button
                            text = { completedStatus ? "COMPLETED" : "WAITING"}
                            className = { completedStatus ? "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" : "bg-red-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                            type = "SUBMIT"
                        />
                    </form>
                </td>

                {/* DELETE ORDER BUTTON */}
                <td className="px-6 py-3">
                    <form onSubmit={ submitDeleteHandler }>
                        <input
                            hidden
                            readOnly
                            value = { props.order.order_id }
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
                props.order.comments !== null && showComment && 
                <tr className={ props.className } onClick = { () => setShowComment(!showComment)}>
                    <td colSpan={12} className = "px-6 py-3"><span className="font-bold">—— Comment:</span> { props.order.comments }</td>
                </tr>
            }
        </React.Fragment>
    )
}

export default AdminTableRow
