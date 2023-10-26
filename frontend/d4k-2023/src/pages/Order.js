import React, { useEffect, useState } from "react";
import Card from "../components/UIElements/Card"
import Input from "../components/FormElements/Input"
import Button from "../components/FormElements/Button"
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChampagneGlasses, faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

// DRINK IMPORTS
import cocktails from "../assets/drinks.json"
import other from "../assets/other.json"
import shots from "../assets/shots.json"
import ErrorModal from "../components/UIElements/ErrorModal";

// icon import
import order from "../images/icons/order-red.png"

const Order = () => {

    let navigate = useNavigate()

    // STATES TO KEEP UP WITH CHOSEN DRINK, DRINK PRICE, QUANTITY SELECTED, and ORDER TOTAL
    const [ chosenDrink, setChosenDrink ] = useState("default")
    const [ drinkPrice, setDrinkPrice ] = useState(0)
    const [ drinkQuantity, setDrinkQuantity ] = useState(1)
    const [ orderTotal, setOrderTotal ] = useState(0)
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [ selectedOther, setSelectedOther ] = useState(false)


    // FORM ERROR STATE
    const [ formHasErrors, setFormHasErrors ] = useState(false)
    
    const clearFormErrorHandler = () => {
        setFormHasErrors(false)
    }

    // check if user navigated from Menu page amd selected a drink
    const menuDrink = localStorage.getItem('chosenDrink')
    
    // useEffect here to run this function once and prevent an endless loop.
    // Splits up the string in localStorage and assigns values to the respective states above so shit works right
    useEffect(() => {
        if (menuDrink) {

            const menuDrinkSplit = menuDrink.split(",")
            const menuDrinkName = menuDrinkSplit[0]
            const menuDrinkPrice = parseInt(menuDrinkSplit[1])

            // console.log(`Menu Drink Price: ${menuDrinkPrice} ${typeof menuDrinkPrice} Menu Drink Name: ${menuDrinkName} ${typeof menuDrinkName}`)

            // UPDATES OUR STATE VARIABLES SO THE FORM AND TOTAL CALCULATION WORKS CORRECTLY
            setChosenDrink(menuDrinkName)
            setDrinkPrice(menuDrinkPrice)
            setOrderTotal(menuDrinkPrice)

            // REMOVES THE ITEM FROM LOCAL STORAGE AFTER UPDATING STATES SO THE FORM ISN'T STUCK IN FUTURE ORDERS
            localStorage.removeItem('chosenDrink')
        }
    }, [ menuDrink ])


    // MAPPING OUT DRINK OPTIONS FOR DROPDOWN SELECT IN FORM
    let cocktailsMapped = cocktails.map((drink) => (
        <option key = { `Cocktail ${cocktails.indexOf(drink)}`} selected = { chosenDrink === drink.name }>{drink.name} — ${drink.price}</option>
    ))

    let batchedMapped = other.map((drink) => (
        <option key = { `Batched ${other.indexOf(drink)}`} selected = { chosenDrink === drink.name }>{drink.name} — ${drink.price}</option>
    ))

    let shotsMapped = shots.map((drink) => (
        <option key = {`Shots ${shots.indexOf(drink)}`} selected = { chosenDrink === drink.name }>{drink.name} — ${drink.price}</option>
    ))

    let drinkOptions = [
        <option key = "default" disabled selected = { chosenDrink === "default" }>Pick a Drink</option>,
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
        shotsMapped,
        <option key = "disabled10" disabled>———</option>,
        <option key = "disabled11" disabled>SOMETHING ELSE</option>,
        <option key = "disabled12" disabled>———</option>,
        <option key = "custom">Custom Drink — $10</option>
    ]

    // HANDLER FUNCTIONS FOR FORM

    // GRABS THE PRICE OF THE SELECTED DRINK TO CALCULATE ESTIMATED TOTAL BEFORE USER SUBMITS
    // ALSO UPDATES THE CHOSEN DRINK OPTION - ALLOWS US TO CHECK IF USER CHOSE CUSTOM DRINK AND ADD EXTRA FORM INPUT LATER
    const drinkSelectorHandler = (event) => {
        if(event.target.selectedOptions[0].disabled){
            setChosenDrink("default")
            setDrinkPrice(0)
            setOrderTotal(0)
            setDrinkQuantity(1)
            return
        }

        const price = event.target.value.split("$")[1]
        console.log(`Price ${price} — ${typeof parseInt(price)}`)
        setChosenDrink(event.target.value.split("—")[0].trim())
        setDrinkPrice(parseInt(price))
        setOrderTotal(parseInt(price) * parseInt(drinkQuantity))
    }

    const incrementDrinkQuantity = () => {
        setDrinkQuantity(drinkQuantity + 1)
        setOrderTotal(drinkPrice * (drinkQuantity + 1))
    }
    
    const decrementDrinkQuantity = () => {
        setDrinkQuantity(drinkQuantity - 1)
        setOrderTotal(drinkPrice * (drinkQuantity - 1))
    }

    // HANDLER FOR PRESELECTED DONATION AMOUNT BUTTONS
    const donationHandler = amount => {
        setSelectedOther(false)

        const previousDonation = donationAmount

        setDonationAmount(amount)
        setOrderTotal(orderTotal+amount-previousDonation)
    }

    // HANDLER FOR CUSTOM DONATION FIELD
    const donationInputHandler = event => {
        const input = document.getElementById('donationInput')
        const inputValue = input.value

        console.log(inputValue)

        if (inputValue > 0 ) {
            const previousDonation = donationAmount
            const orderTotalNumber = parseInt(orderTotal)
            const newTotal = orderTotalNumber + parseInt(inputValue) - parseInt(previousDonation)

            setDonationAmount(inputValue)
            setOrderTotal(newTotal)
            setSelectedOther(false)
        }
    }

    const cardHeader = (
        <div className="flex items-center">
            <p>Place an Order!</p>
            <img src={order} alt="order red icon" className="w-10 ml-3 mb-1"/>
        </div>
    )

    const cardFooter = (
        <div className="flex justify-between w-full items-center">

            <p className="font-bold text-xl">Total: ${ orderTotal }</p>

            <Button
                type="submit"
                text="Grab a Drink"
                disabled={!chosenDrink}
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

        let formData

        // UPDATE FORM DATA CONDITIONALLY IF USER CHOSE CUSTOM DRINK OR NOT
        if (chosenDrink === "Custom Drink") {

            if (event.target[2].value.trim() === "") {
                errors = true
            }

            formData = {
                username: event.target[0].value ? event.target[0].value : setFormHasErrors(true),
                drinkTitle: `CUSTOM DRINK: ${event.target[2].value.trim()}`,
                drinkCost: 10,
                quantity: parseInt(event.target[3].value),
                donationAmount: donationAmount,
                comments: event.target[8].value ? event.target[8].value : null
            }
        } else {
            formData = {
                username: event.target[0].value ? event.target[0].value : setFormHasErrors(true),
                drinkTitle: event.target[1].value ? event.target[1].value.split("—")[0].trim() : setFormHasErrors(true),
                drinkCost: parseInt(event.target[1].value.split("$")[1]),
                quantity: event.target[2].value ? parseInt(event.target[2].value) : setFormHasErrors(true),
                donationAmount: donationAmount,
                comments: event.target[7].value ? event.target[7].value : null
            }
        }

        // ADD USERNAME TO LOCAL STORAGE FOR FUTURE ORDERS
        localStorage.setItem('storedUsername', formData.username )

        console.log(formData)

        // ERROR CODE

        if (formData.username === 0 || formData.username.length < 1 || formData.drinkTitle.length<2 || formData.quantity < 1 || formData.quantity > 5) {
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

    // retrieve username from localStorage if there
    let username = localStorage.getItem('storedUsername')

    return (
        <React.Fragment>

            {   
                formHasErrors &&
                <ErrorModal error = { "Please make sure you filled in your name, drink order, and how many you'd like!" } onClear = { clearFormErrorHandler } />
            }

            <form onSubmit={submitHandler} footer = { cardFooter }>

                <Card header={ cardHeader } footer={cardFooter}>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Buddy the Elf?"
                        label="Your Name"
                        required
                        onInvalid={e => e.target.setCustomValidity('We need a name to yell out')}
                        value = { username ? username : null }
                        noEdit = { username ? true : false}
                    />

                    <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">Drink Order</label>
                    <select
                        id="drinkChoice"
                        name="drinkChoice"
                        className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                        onChange= { drinkSelectorHandler }
                    >
                        { drinkOptions }
                    </select>

                    {
                        // CONDITIONAL INPUT FOR IF USER CHOSE CUSTOM DRINK FROM DROP DOWN
                        chosenDrink === "Custom Drink" &&
                        <Input
                            id = "customDrinkInput"
                            type = "text"
                            placeholder = "Tell us what you want"
                            label = "Custom Drink Name"
                        />
                    }

                    {
                        // DOESN'T ALLOW USER TO SELECT QUANTITY UNLESS THEY'VE ALREADY CHOSEN A DRINK
                        drinkPrice !== 0 &&
                        <div className={`transition-all ease-out ${drinkPrice !== 0 ? 'visible' : 'invisible'}`}>
                            <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">How Many?</label>
                            <Button className="border-solid border-2 border-green-200 bg-green-700 disabled:bg-gray-400 w-12 h-12 text-white rounded-full mr-5" 
                            disabled={drinkQuantity <= 1} type="button" onClick={decrementDrinkQuantity}>
                                <FontAwesomeIcon className="title" icon={faMinus}></FontAwesomeIcon>
                            </Button>
                            <span className="text-xl">{drinkQuantity}</span>
                            <Button className="border-solid border-2 border-green-200  bg-green-700 disabled:bg-gray-400 w-12 h-12 text-white rounded-full ml-5" 
                            disabled={drinkQuantity >= 5} type="button" onClick={incrementDrinkQuantity}>
                                <FontAwesomeIcon className="title" icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </div>
                    }

                    {
                        // DOESN'T ALLOW USER TO DONATE UNLESS THEY'VE CHOSEN A DRINK AND QUANTITY
                        drinkPrice !== 0 && drinkQuantity !== 0 &&

                        // DIV FOR DONATION FIELD
                        <div className="my-2">

                            <label className="text-lg font-semibold mr-4 block uppercase">
                                Additional Tip/Donation
                            </label>

                            {/* DIV OF BUTTONS FOR DIFFERENT DONATION AMOUNTS */}
                            <div className="flex justify-between my-2">
                                <Button
                                    text = "$5"
                                    type = "button"
                                    onClick = { donationAmount === 5 ? () => donationHandler(0) : () => donationHandler(5)}
                                    buttonSelected = { donationAmount === 5 ? true : null }
                                />
                                <Button
                                    text = "$10"
                                    type = "button"
                                    onClick = { donationAmount === 10 ? () => donationHandler(0) : () => donationHandler(10)}
                                    buttonSelected = { donationAmount === 10 ? true : null }
                                />
                                <Button
                                    text = "$20"
                                    type = "button"
                                    onClick = { donationAmount === 20 ? () => donationHandler(0) : () => donationHandler(20)}
                                    buttonSelected = { donationAmount === 20 ? true : null }
                                />
                                <Button
                                    text = "Other"
                                    type = "button"
                                    onClick = { donationAmount > 0 && donationAmount !== 5 && donationAmount !== 10 && donationAmount !== 20 ? () => donationHandler(0) : () => setSelectedOther(true) }
                                    buttonSelected = { donationAmount > 0 && donationAmount !== 5 && donationAmount !== 10 && donationAmount !== 20 ? true : null }
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
                        </div>
                    }

                    <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">
                        Add a Comment
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