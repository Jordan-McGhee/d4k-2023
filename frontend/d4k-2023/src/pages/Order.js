import React, { useState } from "react";
import Card from "../components/UIElements/Card"
import Input from "../components/FormElements/Input"
import Button from "../components/FormElements/Button"
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

// DRINK IMPORTS
import cocktails from "../assets/drinks.json"
import other from "../assets/other.json"
import shots from "../assets/shots.json"
import ErrorModal from "../components/UIElements/ErrorModal";

const Order = () => {

    let navigate = useNavigate()

    // STATES TO KEEP UP WITH DRINK PRICE, QUANTITY SELECTED, and ORDER TOTAL
    const [ drinkPrice, setDrinkPrice ] = useState(0)
    const [ drinkQuantity, setDrinkQuantity ] = useState(1)
    const [ orderTotal, setOrderTotal ] = useState(0)

    // FORM ERROR STATE
    const [ formHasErrors, setFormHasErrors ] = useState(false)
    
    const clearFormErrorHandler = () => {
        setFormHasErrors(false)
    }

    // MAPPING OUT DRINK OPTIONS FOR DROPDOWN SELECT IN FORM
    let cocktailsMapped = cocktails.map((drink) => (
        <option key = { `Cocktail ${cocktails.indexOf(drink)}`}>{drink.name} — ${drink.price}</option>
    ))

    let batchedMapped = other.map((drink) => (
        <option key = { `Batched ${other.indexOf(drink)}`}>{drink.name} — ${drink.price}</option>
    ))

    let shotsMapped = shots.map((drink) => (
        <option key = {`Shots ${shots.indexOf(drink)}`}>{drink.name} — ${drink.price}</option>
    ))

    let drinkOptions = [
        <option key = "disabled1" disabled>———</option>,
        <option key = "disabled2" disabled>COCKTAILS</option>,
        <option key = "disabled3" disabled>———</option>,
        cocktailsMapped,
        <option key = "disabled4" disabled>———</option>,
        <option key = "disabled5" disabled>BATCHED</option>,
        <option key = "disabled6" disabled>———</option>,
        batchedMapped,
        <option key = "disabled7" disabled>———</option>,
        <option key = "disabled8" disabled>SHOTS</option>,
        <option key = "disabled9" disabled>———</option>,
        shotsMapped
    ]

    // HANDLER FUNCTIONS FOR FORM

    // GRABS THE PRICE OF THE SELECTED DRINK TO CALCULATE ESTIMATED TOTAL BEFORE USER SUBMITS
    const drinkSelectorHandler = (event) => {
        const price = event.target.value.split("$")[1]
        console.log(`Price ${price}`)
        
        setDrinkPrice(price)
        setOrderTotal(price * drinkQuantity)
    }

    // CALCULATES THE USER's TOTAL
    const calculateOrderTotalHandler = (event) => {
        const numberOfDrinks = event.target.value
        console.log(numberOfDrinks)

        setDrinkQuantity(numberOfDrinks)
        setOrderTotal(drinkPrice * numberOfDrinks)
    }

    const cardFooter = (
        <div className="flex justify-between w-full items-center">

            <p className="font-bold text-xl">Total: ${ orderTotal }</p>

            <Button
                type="submit"
                text="Grab a Drink"
            />
        </div>
    )

    // FETCH CODE
    const { sendRequest } = useFetch()


    // FORM SUBMISSION
    const submitHandler = async event => {
        event.preventDefault()

        console.log("Submitted order!")

        let errors = false

        const formData = {
            username: event.target[0].value.length,
            drinkTitle: event.target[1].value.split("—")[0].trim(),
            drinkCost: event.target[1].value.split("$")[1],
            quantity: parseInt(event.target[2].value),
            comments: event.target[3].value ? event.target[3].value : null
        }

        console.log(formData)

        // ERROR CODE

        if (formData.username === 0 || formData.username.length < 1 || formData.drinkTitle.length<2 || formData.quantity.isNaN()) {
            errors = true
        }

        if (errors) {
            setFormHasErrors(true)
            return
        }

        try {
            await sendRequest(
                // URL
                `${process.env.REACT_APP_BACKEND_URL}/order`,
                // METHOD
                "POST",
                // HEADERS
                {
                    'Content-Type': 'application/json'
                },
                // BODY
                JSON.stringify(formData)
            )

            console.log("Sent request!")
        } catch (error) {
            
        }

        const navigateHandler = () => navigate('/queue')

        setTimeout(navigateHandler, 500)

    }

    return (
        <React.Fragment>

            {   
                formHasErrors &&
                <ErrorModal error = { "Please make sure you filled in your name, drink order, and how many you'd like!" } onClear = { clearFormErrorHandler } />
            }

            <form onSubmit={submitHandler} footer = { cardFooter }>

                <Card header={"What'll Ya Have?"} footer={cardFooter}>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Buddy the Elf?"
                        label="Your Name"
                    />

                    <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">Drink Order</label>
                    <select
                        id="drinkChoice"
                        name="drinkChoice"
                        className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                        onChange= { drinkSelectorHandler }
                    >
                        <option disabled selected>Pick a Drink</option>
                        { drinkOptions }
                    </select>

                    {
                        drinkPrice !== 0 &&

                        <div>
                            <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">How Many?</label>

                            <select
                                id="drinkQuantity"
                                name="drinkQuantity"
                                className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                                onChange={ calculateOrderTotalHandler }
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    }

                    <label
                        className="text-lg font-semibold mr-4 block uppercase tracking-wide"
                    >
                        Additional Comments
                    </label>

                    <textarea
                        name="comments"
                        rows="3"
                        placeholder="Write us love letters"
                        className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                    />
                </Card>

            </form>

        </React.Fragment>
    )
}

export default Order