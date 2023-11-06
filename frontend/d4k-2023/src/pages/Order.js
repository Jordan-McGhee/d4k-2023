import React, { useEffect, useState } from "react";
// import Card from "../components/UIElements/Card"
import {Button, ButtonGroup, Select, SelectItem, SelectSection, Textarea, Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"
import { useFetch } from "../hooks/useFetch";
import { useNavigate, createSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck,faMinus, faPlus, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
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
        const { sendRequest } = useFetch()
    let allDrinksJson = cocktails.concat(other).concat(shots)

    const [ username, setUsername ] = useState('')
    const [ hasStoredUsername, setHasStoredUsername ] = useState(false)
    const [ drinkName, setDrinkName ] = useState(null)
    const [ selectedDrinkId, setSelectedDrinkId ] = useState(-1)
    const [selectValue, setSelectValue] = useState(new Set([]));
    const [ drinkPrice, setDrinkPrice ] = useState(0)
    const [ drinkQuantity, setDrinkQuantity ] = useState(1)
    const [ orderTotal, setOrderTotal ] = useState(0)
    const [ donationAmount, setDonationAmount ] = useState(0)
    const [ selectedOtherDonation, setSelectedOtherDonation ] = useState(false)
    const [ comments, setComments ] = useState('')

    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchParams ] = useSearchParams();

    // FORM ERROR STATE
    const [ formHasErrors, setFormHasErrors ] = useState(false)
    const [usernameFocused, setUsernameFocused] = React.useState(false)
    const onUsernameFocus = () => setUsernameFocused(true)
    const onUsernameBlur = () => setUsernameFocused(false)
    
    const clearFormErrorHandler = () => {
        setFormHasErrors(false)
    }

    const isInvalidUsername = React.useMemo(() => {
        return username === '' && !usernameFocused
      }, [username, usernameFocused]);

    const isInvalidDonationAmount = React.useMemo(() => {
    return donationAmount < 0 || donationAmount > 1000
    }, [donationAmount]);
    

    // check if user navigated from Menu page amd selected a drink
    
    // useEffect here to run this function once and prevent an endless loop.
    useEffect(() => {
        let uname = localStorage.getItem('storedUsername')
        if(uname){
            setUsername(uname)
            setHasStoredUsername(true)
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
            setOrderTotal(orderTotal - previousDonation)
        }
    }, [selectedOtherDonation])

    const updateDrinkState = (drinkId) =>{
        if(drinkId === null) return

        if(drinkId < 0){
            setDrinkName('')
            setDrinkPrice(0)
            setOrderTotal(0)
            setDrinkQuantity(1)
            setSelectedDrinkId(-1)
            return
        }
        let selectedDrink = allDrinksJson.find(x=> x.id === drinkId)
        setSelectValue(new Set([drinkId.toString()]))
        setSelectedDrinkId(drinkId)
        setDrinkName(selectedDrink?.name ?? "custom")
        setDrinkPrice(parseInt(selectedDrink?.price || 10))
        setOrderTotal(parseInt(selectedDrink?.price || 10) * drinkQuantity)
    }



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
    const customDonationInputHandler = event => {
        const input = document.getElementById('donationInput')
        const inputValue = parseInt(input.value)


        if (inputValue > 0 ) {
            const previousDonation = donationAmount
            const orderTotalNumber = parseInt(orderTotal)
            const newTotal = orderTotalNumber + inputValue - parseInt(previousDonation)

            setDonationAmount(inputValue)
            setOrderTotal(newTotal)
            setSelectedOtherDonation(false)
        }
    }

  

    // FORM SUBMISSION
    const submitHandler = async event => {
        if(isLoading) return
        setIsLoading(true)
        console.log("submitting order...")

        let errors = false

        let formData

        // UPDATE FORM DATA CONDITIONALLY IF USER CHOSE CUSTOM DRINK OR NOT
        if (drinkName === "Custom Drink") {

            if (event.target[2].value.trim() === "") {
                errors = true
            }

            formData = {
                username: username ?? setFormHasErrors(true),
                drinkTitle: drinkName,
                drinkCost: 10,
                quantity: drinkQuantity,
                donationAmount: donationAmount,
                comments: comments.trim()
            }
        } else {
            formData = {
                username: username ?? setFormHasErrors(true),
                drinkTitle: drinkName,
                drinkCost: drinkPrice,
                quantity: drinkQuantity,
                donationAmount: donationAmount,
                comments: comments.trim()
            }
        }

        // ADD USERNAME TO LOCAL STORAGE FOR FUTURE ORDERS
        localStorage.setItem('storedUsername', username )
        setHasStoredUsername(true)
        // ERROR CODE

        if (formData.username === 0 || formData.username.length < 1 || formData.drinkTitle.length<2 || formData.quantity < 1 || formData.quantity > 5) {
            errors = true
        }

        if (errors) {
            setFormHasErrors(true)
            return
        }

        try {
            let data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify(formData))
            console.log(data)
            setIsLoading(false)

            navigate({
                pathname: '/queue', 
                search: createSearchParams({orderId: data?.order[0]?.order_id}).toString()
            })
        } catch (error) {
            
        }
    }

    const cardFooter = (
        <div className="flex justify-between w-full items-center pb-5">
            <p className="font-bold text-xl">Total: ${ orderTotal }</p>

            <Button
                className=" px-4 py-3 rounded-full bg-gradient-to-tr font-fugaz tracking-wide text-lg from-green-900 to-green-500 text-white  shadow-lg"
                onPress={submitHandler}
                isDisabled={isLoading || !selectedDrinkId || selectedDrinkId < 0}
            >Grab a Drink
            <FontAwesomeIcon size="2x" icon={faChampagneGlasses}></FontAwesomeIcon>
            </Button>
        </div>
    )
    
    return (
        <React.Fragment >
            {   
                formHasErrors &&
                <ErrorModal error = { "Please make sure you filled in your name, drink order, and how many you'd like!" } onClear = { clearFormErrorHandler } />
            }
            <form className="max-w-md m-auto">
                <Card className=" bg-slate-200 mb-5 pb-5">
                    <CardHeader className="pb-0 text-4xl font-bungee text-center justify-center text-green-700">
                            Order
                    </CardHeader>
                    <CardBody>
                        { hasStoredUsername &&
                            <div className="text-xl mr-4 block font-fugaz tracking-wide mb-6">Welcome back <span className="font-bungee"> {username}</span></div>
                        }
                        { !hasStoredUsername &&
                            <Input
                                className="pb-5"
                                classNames={{
                                    label: "text-xl group-data-[filled=true]:-translate-y-4",
                                    trigger: "min-h-unit-16",
                                    listboxWrapper: "max-h-[400px]",
                                    inputWrapper: "bg-white",
                                    errorMessage: "absolute italic bottom-2 left-4"
                                }}
                                maxLength={30}
                                autoFocus
                                onFocus={onUsernameFocus}
                                onBlur={onUsernameBlur}
                                value={username}
                                variant="bordered"
                                radius="full"
                                color={isInvalidUsername ? "danger" : "success"}
                                label="Your Name"
                                isInvalid={isInvalidUsername}
                                onValueChange={setUsername}
                                errorMessage={isInvalidUsername && "We'll need your name, nutcracker"}
                            />
                        }

                        <Select
                            variant="bordered"
                            selectionMode="single"
                            onSelectionChange={setSelectValue}
                            onChange={(e) => drinkDropdownChanged(e)}
                            fullWidth
                            color="success"
                            radius="full"
                            className="pb-5"
                            classNames={{
                                label: "text-xl group-data-[filled=true]:-translate-y-4",
                                trigger: "min-h-unit-16 bg-white",
                                listboxWrapper: "max-h-[400px]",
                            }}
                            listboxProps={{
                                classNames: {
                                    list: ["border-2", "bg-red-200", "border-black"],
                                    base: ["border-2", "bg-red-200", "border-black"],

                                },
                                itemClasses: {
                                base: [
                                    "rounded-md",
                                    "data-[hover=true]:bg-default-100",
                                    "data-[selectable=true]:focus:bg-green-600",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                                },
                            }}
                            label="Select a Drink"
                            selectedKeys={selectValue}
                            >
                            <SelectSection showDivider title="Cocktails">
                            { 
                                cocktails.map((drink) => (
                                    <SelectItem textValue={`${drink.name} — $${drink.price}`} key = { drink.id} value={drink.id} >{drink.name} — ${drink.price}</SelectItem>
                                ))
                            }
                            </SelectSection>
                            <SelectSection showDivider title="Shots">
                            {
                                shots.map((drink) => (
                                    <SelectItem textValue={`${drink.name} — $${drink.price}`} key = { drink.id} value={drink.id} >{drink.name} — ${drink.price}</SelectItem>
                                ))
                            } 
                            </SelectSection>
                            <SelectSection showDivider title="Batched">
                            {
                                other.map((drink) => (
                                    <SelectItem textValue={`${drink.name} — $${drink.price}`} key = { drink.id} value={drink.id} >{drink.name} — ${drink.price}</SelectItem>
                                ))
                            } 
                            </SelectSection>
                            <SelectSection showDivider title="Something Else">
                                <SelectItem textValue="Custom Drink - $10" key={0} value="0">Custom Drink — $10</SelectItem>
                            </SelectSection>
                        </Select>
                        { /** Custom Drink Dropdown */
                        selectedDrinkId > -1 && <div className="border-2 border-slate-200 p-2 rounded-3xl">
                            {
                                selectedDrinkId === 0 &&
                                <Input
                                    id = "customDrinkInput"
                                    type = "text"
                                    placeholder = "Tell us what you want"
                                    label = "Custom Drink Description"
                                    radius="full"
                                    variant="bordered"
                                />
                            }
                    
                        <div className={`text-center transition-all ease-out ${drinkPrice !== 0 ? 'visible' : 'invisible'}`}>
                            <label className="text-lg font-semibold mr-4 block text-center tracking-wide">How Many?</label>
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
                        <div className="my-2">
                            <label className="text-lg text-center font-semibold mr-4 block">
                                Additional Tip / Donation
                            </label>

                            {/* DIV OF BUTTONS FOR DIFFERENT DONATION AMOUNTS */}
                            <div className="flex justify-between my-2">
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600 bg-white ${donationAmount === 2 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                    onPress = { donationAmount === 2 ? () => donationHandler(0) : () => donationHandler(2)}
                                >$2</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600 bg-white ${donationAmount === 5 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                    onPress = { donationAmount === 5 ? () => donationHandler(0) : () => donationHandler(5)}
                                    >$5</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-green-600 bg-white ${donationAmount === 10 ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                onPress = { donationAmount === 10 ? () => donationHandler(0) : () => donationHandler(10)}
                                    >$10</Button>
                                <Button
                                    radius="full"
                                    className={`border-2 font-bold bg-white border-green-600  ${selectedOtherDonation || (donationAmount > 0 && 
                                        donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10)  ? "text-slate-200 bg-green-700" : "text-green-700" }`}
                                    onPress = { donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10 ? () => donationHandler(0) : () => setSelectedOtherDonation(true) }
                                    > { (donationAmount > 0 && 
                                        donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10) ? `$${donationAmount}` : 'Custom'} </Button>
                            </div>

                            {
                                selectedOtherDonation && 
                                <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                                    <Input
                                    id = "donationInput"
                                    label="Custom Donation Amount"
                                    placeholder="0"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    type="number"
                                    pattern="\d*"
                                    inputMode="decimal"
                                    min={0}
                                    max={1000}
                                    maxLength={4}
                                    color={isInvalidDonationAmount ? "danger" : "success"}
                                    isInvalid={isInvalidDonationAmount}
                                    classNames={{
                                        label: "text-black/50 dark:text-white/90",
                                        input: [
                                            "text-black/90 dark:text-white/90",
                                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                                        ],
                                        inputWrapper: ["pr-0", "bg-white", "rounded-r-none"]
                                        }
                                    }                                  
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    />
                                    <div className="mt-6 border-t-2">
                                        <span className="flex">
                                            <Button
                                                classNames={{base: "rounded-l-none"}}
                                                size="md"
                                                className="bg-red-600 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                                isIconOnly
                                                type = "button"
                                                onClick = { () => setSelectedOtherDonation(false)}
                                            >
                                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                            </Button>
                                            <Button
                                                isDisabled={isInvalidDonationAmount}
                                                size="md"
                                                isIconOnly
                                                className="bg-green-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                                type = "button"
                                                onClick = { customDonationInputHandler }
                                            >
                                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                                            </Button>
                                            </span>
                                    </div>
                                </div>
                            }
                        </div>
                        
                    </div>
                    }
                    <Textarea
                        name="comments"
                        minRows="3"
                        maxRows="6"
                        variant="bordered"
                        color="success"
                        fullWidth
                        maxLength="120"
                        label="Comments"
                        value={comments}
                        onValueChange={setComments}
                        placeholder="Write us love letters"
                        classNames={{
                            inputWrapper: "bg-white"
                        }}
                    />
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-between w-full items-center pb-5">
                            <p className="font-bold text-xl">Total: ${ orderTotal }</p>
                            <Button
                                className=" px-4 py-3 rounded-full bg-gradient-to-tr font-fugaz tracking-wide text-lg from-green-900 to-green-500 text-white  shadow-lg"
                                onPress={submitHandler}
                                isDisabled={isLoading || !username || !selectedDrinkId || selectedDrinkId < 0}
                            >Grab a Drink
                            <FontAwesomeIcon size="2x" icon={faChampagneGlasses}></FontAwesomeIcon>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </React.Fragment>
    )
}

export default Order