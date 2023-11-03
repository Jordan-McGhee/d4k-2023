import React, { useEffect, useState } from "react";
import Card from "../components/UIElements/Card"
import Input from "../components/FormElements/Input"
// import Button from "../components/FormElements/Button"
import {Button, ButtonGroup, Accordion, AccordionItem } from "@nextui-org/react"
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck,faMinus, faPlus, faChampagneGlasses, faC } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";

// DRINK IMPORTS
import cocktails from "../assets/drinks.json"
import other from "../assets/other.json"
import shots from "../assets/shots.json"
import ErrorModal from "../components/UIElements/ErrorModal";

// icon import
import order from "../images/icons/order-red.png"

const Order = () => {

    let navigate = useNavigate()
    let allDrinksJson = cocktails.concat(other).concat(shots)

    const [ username, setUsername ] = useState(null)
    const [ drinkName, setDrinkName ] = useState(null)
    const [ selectedDrinkId, setSelectedDrinkId ] = useState('-1')
    const [ drinkPrice, setDrinkPrice ] = useState(0)
    const [ drinkQuantity, setDrinkQuantity ] = useState(1)
    const [ orderTotal, setOrderTotal ] = useState(0)
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [ selectedOtherDonation, setSelectedOtherDonation ] = useState(false)
    const [ searchParams ] = useSearchParams();


    // FORM ERROR STATE
    const [ formHasErrors, setFormHasErrors ] = useState(false)
    
    const clearFormErrorHandler = () => {
        setFormHasErrors(false)
    }

    // check if user navigated from Menu page amd selected a drink
    
    // useEffect here to run this function once and prevent an endless loop.
    // Splits up the string in localStorage and assigns values to the respective states above so shit works right
    useEffect(() => {
        let uname = localStorage.getItem('storedUsername')
        if(uname){
            setUsername(uname)
        }
        let drinkIdParam = searchParams.get("drinkId")
        if (drinkIdParam) {
            updateDrinkState(parseInt(drinkIdParam))
        }
    }, [])

    useEffect(() => {
        if(selectedOtherDonation){
            const previousDonation = donationAmount

            setDonationAmount(0)
            setOrderTotal(orderTotal - previousDonation)        }
    }, [selectedOtherDonation])

    const updateDrinkState = (drinkId) =>{
        if(drinkId === null) return

        if(drinkId < 0){
            setDrinkName('')
            setDrinkPrice(0)
            setOrderTotal(0)
            setDrinkQuantity(1)
            setSelectedDrinkId('-1')
            return
        }
        let selectedDrink = allDrinksJson.find(x=> x.id === drinkId)
        setSelectedDrinkId(drinkId)
        setDrinkName(selectedDrink?.name ?? "custom")
        setDrinkPrice(parseInt(selectedDrink?.price || 10))
        setOrderTotal(parseInt(selectedDrink?.price || 10) * drinkQuantity)
    }


    // MAPPING OUT DRINK OPTIONS FOR DROPDOWN SELECT IN FORM
    let cocktailsMapped = cocktails.map((drink) => (
        <option key = { drink.id} value={drink.id} >{drink.name} — ${drink.price}</option>
    ))

    let batchedMapped = other.map((drink) => (
        <option key = { drink.id} value={drink.id} >{drink.name} — ${drink.price}</option>
    ))

    let shotsMapped = shots.map((drink) => (
        <option key = { drink.id } value={drink.id}>{drink.name} — ${drink.price}</option>
    ))

    let drinkOptions = [
        <option key = "default" disabled value="-1">Pick a Drink</option>,
        <option key = "disabled2" disabled>COCKTAILS</option>,
        cocktailsMapped,
        <option key = "disabled5" disabled>BATCHED</option>,
        batchedMapped,
        <option key = "disabled8" disabled>SHOTS</option>,
        shotsMapped,
        <option key = "disabled11" disabled>SOMETHING ELSE</option>,
        <option key = "custom" value="0">Custom Drink — $10</option>
    ]

    const drinkDropdownChanged = (e) => {
        let currentDrinkId = parseInt(e.target.value)
        updateDrinkState(currentDrinkId)
      }
      

    const incrementDrinkQuantity = () => {
        setDrinkQuantity(drinkQuantity + 1)
        setOrderTotal(drinkPrice * (drinkQuantity + 1) + donationAmount)
    }
    
    const decrementDrinkQuantity = () => {
        setDrinkQuantity(drinkQuantity - 1)
        setOrderTotal(drinkPrice * (drinkQuantity - 1) + donationAmount)
    }

    // HANDLER FOR PRESELECTED DONATION AMOUNT BUTTONS
    const donationHandler = amount => {
        setSelectedOtherDonation(false)

        const previousDonation = donationAmount

        setDonationAmount(amount)
        setOrderTotal(orderTotal + amount - previousDonation)
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
            setSelectedOtherDonation(false)
        }
    }

    const cardHeader = (
        <div className="flex items-center">
            <p>Order</p>
            <img src={order} alt="order red icon" className="w-10 ml-3 mb-1"/>
        </div>
    )

    const cardFooter = (
        <div className="flex justify-between w-full items-center">

            <p className="font-bold text-xl">Total: ${ orderTotal }</p>

            <Button
                className=" px-4 py-3 rounded-full bg-gradient-to-tr font-fugaz tracking-wide text-lg from-green-900 to-green-500 text-white  shadow-lg"
                type="submit"
                isDisabled={!selectedDrinkId || selectedDrinkId < 0}
            >Grab a Drink
            <FontAwesomeIcon size="2x" icon={faChampagneGlasses}></FontAwesomeIcon>
            </Button>
        </div>
    )

    // FETCH CODE
    const { sendRequest } = useFetch()

    // FORM SUBMISSION
    const submitHandler = async event => {
        event.preventDefault()

        console.log("submitting order...")

        let errors = false

        let formData

        // UPDATE FORM DATA CONDITIONALLY IF USER CHOSE CUSTOM DRINK OR NOT
        if (drinkName === "Custom Drink") {

            if (event.target[2].value.trim() === "") {
                errors = true
            }

            formData = {
                username: username ?? event.target[0].value ?? setFormHasErrors(true),
                drinkTitle: drinkName,
                drinkCost: 10,
                quantity: drinkQuantity,
                donationAmount: donationAmount,
                comments: event.target[8].value ? event.target[8].value : null
            }
        } else {
            formData = {
                username: event.target[0].value ? event.target[0].value : setFormHasErrors(true),
                drinkTitle: drinkName,
                drinkCost: drinkPrice,
                quantity: drinkQuantity,
                donationAmount: donationAmount,
                comments: event.target[7].value ? event.target[7].value : null
            }
        }

        // ADD USERNAME TO LOCAL STORAGE FOR FUTURE ORDERS
        localStorage.setItem('storedUsername', formData.username )

        // ERROR CODE

        if (formData.username === 0 || formData.username.length < 1 || formData.drinkTitle.length<2 || formData.quantity < 1 || formData.quantity > 5) {
            errors = true
        }

        if (errors) {
            setFormHasErrors(true)
            return
        }

        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify(formData))
            console.log("Sent request!")
        } catch (error) {
            
        }

        const navigateHandler = () => navigate('/queue')

        setTimeout(navigateHandler, 500)

    }

    return (
        <React.Fragment >

            {   
                formHasErrors &&
                <ErrorModal error = { "Please make sure you filled in your name, drink order, and how many you'd like!" } onClear = { clearFormErrorHandler } />
            }

            <form className="max-w-md m-auto" onSubmit={submitHandler} footer = { cardFooter }>

                <Card header={ cardHeader } footer={cardFooter}>
                    { username &&
                       <div className="text-xl mr-4 block font-fugaz tracking-wide mb-6">Welcome back <span className="font-bungee"> {username}</span></div>
                    }
                    { !username &&
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
                    }

                    <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">Drink Order</label>
                    <select
                        value={selectedDrinkId}
                        onChange={(e) => drinkDropdownChanged(e)}
                        id="drinkChoice"
                        name="drinkChoice"
                        className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"
                    >
                        { drinkOptions }
                    </select>

                    {
                        // CONDITIONAL INPUT FOR IF USER CHOSE CUSTOM DRINK FROM DROP DOWN
                        drinkName === "Custom Drink" &&
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
                            <Button isIconOnly className="border-solid border-2 border-green-200 bg-green-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full mr-5" 
                            isDisabled={drinkQuantity <= 1} type="button" onPress={decrementDrinkQuantity}>
                                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                            </Button>
                            <span className="text-xl">{drinkQuantity}</span>
                            <Button  isIconOnly className="border-solid border-2 border-green-200  bg-green-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full ml-5" 
                            isDisabled={drinkQuantity >= 5} type="button" onPress={incrementDrinkQuantity}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </div>
                    }

                    {
                        // DOESN'T ALLOW USER TO DONATE UNLESS THEY'VE CHOSEN A DRINK AND QUANTITY
                        drinkPrice !== 0 && drinkQuantity !== 0 &&

                        // DIV FOR DONATION FIELD
                        <div className="my-2">

                            <label className="text-lg font-semibold mr-4 block uppercase">
                                Additional Tip / Donation
                            </label>

                            {/* DIV OF BUTTONS FOR DIFFERENT DONATION AMOUNTS */}
                            <div className="flex justify-between my-2">
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600  ${donationAmount === 2 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                 onPress = { donationAmount === 2 ? () => donationHandler(0) : () => donationHandler(2)}
                                >$2</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600  ${donationAmount === 5 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                    onPress = { donationAmount === 5 ? () => donationHandler(0) : () => donationHandler(5)}
                                    >$5</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600  ${donationAmount === 10 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                onPress = { donationAmount === 10 ? () => donationHandler(0) : () => donationHandler(10)}
                                    >$10</Button>
                                <Button
                                    radius="full"
                                    className={`border-2 font-bold border-green-600  ${selectedOtherDonation || (donationAmount > 0 && 
                                        donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10)  ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                    onPress = { donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10 ? () => donationHandler(0) : () => setSelectedOtherDonation(true) }
                                    >Custom</Button>
                            </div>

                            {
                                selectedOtherDonation && 
                                <div className="flex justify-between duration-200 
                                ease-out transition animate-slideIn">
                                    <Input
                                        id = "donationInput"
                                        type = "number"
                                        placeholder = "Enter Donation Amount"
                                        className = "w-full appearance-none bg-white text-black border rounded p-3 my-3 leading-tight focus: outline-green-700"
                                    />
                                    <ButtonGroup>
                                    <Button
                                        size="md"
                                        isIconOnly
                                        className="bg-green-600 text-slate-200 text-xl"
                                        type = "button"
                                        onClick = { donationInputHandler }
                                    >
                                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                    </Button>
                                    <Button
                                    size="md"
                                        className="bg-red-600 text-slate-200 text-xl"
                                        isIconOnly
                                        type = "button"
                                        onClick = { () => setSelectedOtherDonation(false)}
                                    >
                                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                    </Button>
                                    </ButtonGroup>
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