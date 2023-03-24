import React, { useState } from "react";
import Card from "../components/UIElements/Card";
import Input from "../components/FormElements/Input";
import Button from "../components/FormElements/Button";
import Modal from "../components/UIElements/Modal"
import ErrorModal from "../components/UIElements/ErrorModal"
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Donate = () => {

    const navigate = useNavigate()

    const [ selectedOther, setSelectedOther ] = useState(false)
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [ formHasError, setFormHasError ] = useState(false)
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)

    // retrieve username from localStorage if there
    let localStorageUsername = localStorage.getItem('storedUsername')

    const cardFooter = (
        <div className="flex justify-between w-full items-center">

            <p className="font-bold text-xl">Total: ${ donationAmount }</p>
            <Button
                type = "submit"
                text = "Donate!"
            />
        </div>
    )

    // HANDLER FOR PRESELECTED DONATION AMOUNT BUTTONS
    const donationHandler = amount => {
        setSelectedOther(false)
        // console.log(typeof amount)

        setDonationAmount(amount)
    }

    // HANDLER FOR CUSTOM DONATION FIELD
    const donationInputHandler = () => {
        const input = document.getElementById('donationInput')
        const inputValue = parseInt(input.value)

        // console.log(typeof inputValue)

        if (inputValue > 0 ) {

            setDonationAmount(inputValue)
            setSelectedOther(false)
        }
    }

    const { sendRequest } = useFetch()

    const submitHandler = async event => {
        event.preventDefault()

        // ERROR CHECK
        if (donationAmount === 0 || event.target[0].value === "") {
            setFormHasError(true)
            return
        } 
        
        let formData = {
            username: event.target[0].value,
            amount: donationAmount,
            comments: event.target[5].value
        }

        // console.log(formData)

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

        setShowConfirmModal(true)

        if (!localStorageUsername) {
            localStorage.setItem('storedUsername', formData.username)
        }

    }

    const confirmModalHandler = () => {
        setShowConfirmModal(false)
        navigate(0)
    }

    return (
        <React.Fragment>

            {/* MODAL CONFIRMS THAT DONATION WAS SUCCESSFUL */}
            {
                showConfirmModal &&
                <Modal
                    show = { showConfirmModal }
                    header = { 'Donation Successful!'}
                    footer = {
                        <Button text= "CLOSE" onClick = { confirmModalHandler }/>
                    }
                >
                    <p className="text-2xl">Thank you for your donation of <span className="text-green-700 font-extrabold">${donationAmount}!</span></p>
                    <p className="mt-2 text-2xl">Why don't you check out our <span className="font-bold text-green-700 underline underline-offset-4" onClick = { () => navigate("/menu")}>MENU</span> or <span className="font-bold text-green-700 underline underline-offset-4" onClick = { () => navigate("/order")}>ORDER</span> yourself a drink?</p></Modal>
            }

            {/* ERROR MODAL */}
            {
                formHasError &&
                <ErrorModal
                    error = { "Please make sure you filled in your name and how much you'd like to donate!"}
                    onClear = { () => setFormHasError(false)}
                />
            }

            <form onSubmit={ submitHandler }>
                <Card header = { "Add A Donation"} footer = { cardFooter }>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Buddy the Elf?"
                        label="Your Name"
                        value = { localStorageUsername ? localStorageUsername : null }
                    />

                    {/* // DIV FOR DONATION FIELD */}
                    <div className="">
                        <label className="text-lg font-semibold mr-4 block uppercase">
                            How much would you like to donate?
                        </label>
                        
                        {/* DIV OF BUTTONS FOR DIFFERENT DONATION AMOUNTS */}
                        <div className="flex justify-between mt-4">
                            <Button
                                text = "$5"
                                type = "button"
                                onClick = { () => donationHandler(5)}
                            />
                            <Button
                                text = "$10"
                                type = "button"
                                onClick = { () => donationHandler(10)}
                            />
                            <Button
                                text = "$20"
                                type = "button"
                                onClick = { () => donationHandler(20)}
                            />
                            <Button
                                text = "Other"
                                type = "button"
                                onClick = { () => setSelectedOther(!selectedOther) }
                            />
                        </div>

                        {
                            selectedOther && 
                            <div className="flex justify-between">
                                <Input
                                    id = "donationInput"
                                    type = "number"
                                    placeholder = "Enter Donation Amount"
                                    className = "w-full appearance-none bg-white text-black border rounded p-3 my-3 leading-tight focus: outline-green-700"
                                />
                                <Button
                                    text = '✓'
                                    type = "button"
                                    className = "bg-green-600 rounded-md text-white px-3 py-1 my-3 mx-2"
                                    onClick = { donationInputHandler }
                                />
                                <Button
                                    text = '✕'
                                    type = "button"
                                    className = "bg-red-700 rounded-md text-white px-3 py-1 my-3"
                                    onClick = { () => setSelectedOther(false)}
                                />
                            </div>
                        }

                        <label
                            className="text-lg font-semibold mr-4 mt-4 block uppercase tracking-wide"
                        >
                            Add a Comment
                        </label>

                        <textarea
                            name="comments"
                            rows="3"
                            placeholder="Write us love letters"
                            className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                        />      
                    </div>
                </Card>
            </form>
        </React.Fragment>
    )
}

export default Donate