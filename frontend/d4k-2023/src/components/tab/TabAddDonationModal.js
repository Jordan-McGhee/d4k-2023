import React from "react";
import Modal from "../UIElements/Modal";
import Button from "../FormElements/Button";
import Input from "../FormElements/Input";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const TabAddDonationModal = props => {
    let navigate = useNavigate()
    const { hasError, sendRequest, clearError } = useFetch()

    const username = props.username

    const addDonationHandler = async event => {
        event.preventDefault()

        let formData = {
            username: username,
            amount: parseInt(event.target[1].value)
        }

        console.log(formData)

        try {
            await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/donation`,
                // METHOD
                "POST",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify(formData)
            )

            console.log('Sent Donation!')
        } catch (error) {
            console.log(error)
        }

        navigate(0)
    }

    return (
        <Modal
            header = {`Add Donation to ${username}'s Tab`}
            show = { props.show }
            error = { hasError }
            clearError = { clearError }
        >
            <form onSubmit={ addDonationHandler }>

                <Input
                    id="name"
                    type="text"
                    placeholder="Buddy the Elf?"
                    label="Name"
                    value = { username }
                />

                <Input
                    id = "donationInput"
                    type = "number"
                    placeholder = "Enter Donation Amount"
                    label = "Amount"
                    className = "w-full appearance-none bg-white text-black border rounded p-3 my-3 leading-tight focus: outline-green-700"
                />

            <div className="flex justify-end mt-3 shrink">
                <Button
                    text = "NEVERMIND"
                    type = "button"
                    onClick = { props.onCancel }
                    className = "bg-red-600 text-white/75 hover:text-white hover:bg-red-600 button rounded-md shadow hover:cursor-pointer mr-2 hover:scale-105"
                />

                <Button
                    text = "SUBMIT"
                    type = "submit"
                />

            </div>

            </form>
        </Modal>
    )

}

export default TabAddDonationModal