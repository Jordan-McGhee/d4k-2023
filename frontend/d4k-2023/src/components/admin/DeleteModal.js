import React from "react";
import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const DeleteModal = props => {
    
    let navigate = useNavigate()
    const { hasError, sendRequest, clearError } = useFetch()

    const id = props.order_id

    const submitDeleteHandler = async event => {
        event.preventDefault()

        try {
            await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order/${id}`,
                // METHOD
                "DELETE",
                // HEADERS

                // BDDY
            )
        } catch (error) {
            console.log(error)
        }

        navigate(0)
    }

    const footer = (
        <div>
            <Button
                text = "DELETE"
                type = "submit"
                onClick = { submitDeleteHandler }
                className = "bg-red-600 text-white/75 hover:text-white hover:bg-red-600 button rounded-md shadow hover:cursor-pointer mr-2 hover:scale-105"
            />

            <Button
                text = "NEVERMIND"
                type = "button"
                onClick = { props.onCancel }
            />
        </div>
    )

    return (
        <Modal
            header = {`Confirm Delete Order`}
            footer = { footer }
            show = { props.show }
            error = { hasError }
            clearError = { clearError }
        >
            <p className="break-words">Are you sure you want to delete order #{id}? <br></br> <span className="italic font-bold">This can't be undone.</span></p>
            
        </Modal>
    )
}

export default DeleteModal