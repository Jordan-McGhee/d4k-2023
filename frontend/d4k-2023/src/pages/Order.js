import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import {Button, Select, SelectItem, SelectSection, Textarea, Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react"
import { useFetch } from "../hooks/useFetch";
import { useNavigate, createSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck,faMinus, faPlus, faChampagneGlasses, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import { UserApi } from "../api/user"
import { debounce } from "lodash"
// DRINK IMPORTS
import cocktails from "../assets/drinks.json"
import other from "../assets/other.json"
import shots from "../assets/shots.json"
import ErrorModal from "../components/UIElements/ErrorModal";

const Order = () => {
    let navigate = useNavigate()
    const { sendRequest } = useFetch()
    const { updateUsername, getUserIdByUsername, createUser } = UserApi()
    let allDrinksJson = cocktails.concat(other).concat(shots)

    const [ username, setUsername ] = useState('')
    const [ storedUsername, setStoredUsername ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ editedUsername, setEditedUsername ] = useState('')
    const [ isUsernameTaken, setIsUsernameTaken ] = useState(false)
    const [ hasStoredUserId, setHasStoredUserId ] = useState(false)
    const [ drinkName, setDrinkName ] = useState(null)
    const [ selectedDrinkId, setSelectedDrinkId ] = useState(-1)
    const [ selectValue, setSelectValue ] = useState(new Set([]));
    const [ drinkPrice, setDrinkPrice ] = useState(0)
    const [ drinkQuantity, setDrinkQuantity ] = useState(1)
    const [ donationAmount, _setDonationAmount ] = useState(0)
    const setDonationAmount = (amount) => {_setDonationAmount(amount > 0 ? parseInt(amount) : 0)}
    const [ showCustomDonation, setShowCustomDonation ] = useState(false)
    const [ showEditNameInput, setShowEditNameInput ] = useState(false)
    const [ comments, setComments ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ searchParams ] = useSearchParams();
    const [ formHasErrors, setFormHasErrors ] = useState(false)
    const [usernameFocused, setUsernameFocused] = useState(false)
    const onUsernameFocus = () => setUsernameFocused(true)
    const onUsernameBlur = () => setUsernameFocused(false)
    const [ customDrinkDescription, setCustomDrinkDescription ] = useState('')
    const [customDrinkDescriptionFocused, setCustomDrinkDescriptionFocused] = useState(false)
    const onCustomDrinkDescriptionFocus = () => setCustomDrinkDescriptionFocused(true)
    const onCustomDrinkDescriptionBlur = () => setCustomDrinkDescriptionFocused(false)

    const customDrinkDescriptionRef = useRef(null);
    const editUsernameInputRef = useRef(null);

    const clearFormErrorHandler = () => { setFormHasErrors(false) }

    const customDrinkId = 999
    const isCustomDrinkSelected = useMemo(() => {
        return selectedDrinkId === customDrinkId
    }, [selectedDrinkId])

    const isInvalidCustomDrinkDescription = useMemo(() => {
        return (!customDrinkDescription || customDrinkDescription.trim().length < 3) && isCustomDrinkSelected
    }, [isCustomDrinkSelected, customDrinkDescription]);

    const orderTotal = useMemo(() => {
        return (drinkPrice * drinkQuantity) + donationAmount
    }, [drinkPrice, drinkQuantity, donationAmount]);

    
    const isInvalidUsername = useMemo(() => {
        return (!username || username.trim().length < 3)
    }, [username]);

    const isInvalidEditedUsername = useMemo(() => {
        return (!editedUsername ||  editedUsername.trim().length < 3)
    }, [editedUsername]);

    const isInvalidDonationAmount = useMemo(() => {
    return donationAmount < 0 || donationAmount > 1000
    }, [donationAmount]);
    
    useEffect(() => {
        const checkUserIdByUsername = async (username) => {
            let data = await getUserIdByUsername(username)
            let id = data?.user_id
            if(!id) return

            localStorage.setItem('userId', id)
            setUsername(username)
            setStoredUsername(username)
            setHasStoredUserId(true)   
        }

        let storedUsername = localStorage.getItem('storedUsername')
        let storedUserId = localStorage.getItem('userId')
        if(storedUsername && !storedUserId){
            checkUserIdByUsername(storedUsername)
        }else if(storedUsername){
            setUsername(storedUsername)
            setStoredUsername(storedUsername)
        }
        if(storedUserId){
            setHasStoredUserId(true)
            setUserId(storedUserId)
        }
        let drinkIdParam = searchParams.get("drinkId")
        if (drinkIdParam) {
            updateDrinkState(parseInt(drinkIdParam))
        }
    }, [])

    useEffect(() => {
        if(showCustomDonation) setDonationAmount(0)
    }, [showCustomDonation])

    useEffect(() => {
        if(isCustomDrinkSelected) customDrinkDescriptionRef.current.focus()
    }, [isCustomDrinkSelected])

    useEffect(() => {
        if(showEditNameInput) editUsernameInputRef.current.focus()
    }, [showEditNameInput])

    useEffect(() => {
        setIsUsernameTaken(false)
    }, [editedUsername])

    const verifyUsernameIsNew = async (uname)  => {
        let data = await getUserIdByUsername(uname)
        if(data?.user_id) {
            setIsUsernameTaken(true)
            return false
        }
        return true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyUsernameDebounce = useCallback(debounce(async (uname) => {
        await verifyUsernameIsNew(uname)
    }, 2000), [])

    useEffect(() => {
        setIsUsernameTaken(false)
        if (!isInvalidUsername && username !== storedUsername) {
          verifyUsernameDebounce(username);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [username, storedUsername, isInvalidUsername]);

    const updateDrinkState = (drinkId) =>{
        if(drinkId === null) return

        if(drinkId < 0){
            setDrinkName('')
            setDrinkPrice(0)
            setDrinkQuantity(1)
            setSelectedDrinkId(-1)
            return
        }
        let selectedDrink = allDrinksJson.find(x=> x.id === drinkId)
        setSelectValue(new Set([drinkId.toString()]))
        setSelectedDrinkId(drinkId)
        setDrinkName(selectedDrink?.name ?? "custom")
        setDrinkPrice(parseInt(selectedDrink?.price || 10))
    }

    const drinkDropdownChanged = (e) => {
        let currentDrinkId = parseInt(e.target.value)
        updateDrinkState(currentDrinkId)
      }
      
    const incrementDrinkQuantity = () => setDrinkQuantity(drinkQuantity + 1)
    const decrementDrinkQuantity = () => setDrinkQuantity(drinkQuantity - 1)
    

    const donationHandler = amount => {
        setShowCustomDonation(false)
        setDonationAmount(amount)
    }

    function limitKeyPress(event) {
        let value = event.target.value
        if (value !== undefined && value.length >= 4 && event.key !== "Backspace") {
            event.preventDefault();
        }
    }

    const cancelCustomDonation = () => {
        setShowCustomDonation(false)
        setDonationAmount(0)
    }

    const handleShowEditName = () => {
        setShowEditNameInput(true)
        setEditedUsername(username)
    }
    
    const cancelEditName = () => {
        setShowEditNameInput(false)
        setEditedUsername(username)
    }

    const handleEditUsername = async () => {
        if(isLoading || storedUsername === editedUsername) return
        setIsLoading(true)

        try {
            let isNew = await verifyUsernameIsNew(editedUsername)
            if(!isNew) return
        } catch (e) {
            return
        }

        try {
            let data = await updateUsername(userId, editedUsername)
            console.log(data)
        } catch (e) {
            return
        }
            setUsername(editedUsername)
            setStoredUsername(editedUsername)
            localStorage.setItem('storedUsername', editedUsername)
            setShowEditNameInput(false)
    }

    const submitOrder = async () => {
        if(isLoading) return
        setIsLoading(true)

        let currentUserId = userId
        var trimmedUsername = username.trim()

        if(!hasStoredUserId){
            let isNewUsername = await verifyUsernameIsNew(trimmedUsername)
            if(!isNewUsername) return

            let data = await createUser(trimmedUsername)
            if(!data?.user_id) return
            setUserId(data.user_id)
            localStorage.setItem(data.user_id)
            currentUserId = data.user_id
        }

        let formData = {
                user_id: currentUserId,
                drinkTitle: drinkName,
                drinkCost: drinkPrice,
                quantity: drinkQuantity,
                donationAmount: donationAmount,
                comments: `${comments.trim()}${customDrinkDescription ? ` (${customDrinkDescription.trim()})` : ''}` 
            }

        try {
            let data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify(formData))
            console.log(data)
            localStorage.setItem('storedUsername', trimmedUsername)
            setHasStoredUserId(true)
            setIsLoading(false)

            navigate({
                pathname: '/queue', 
                search: createSearchParams({orderId: data?.order[0]?.order_id}).toString()
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <React.Fragment >
            {   
                formHasErrors &&
                <ErrorModal error = { "Please make sure you filled in your name, drink order, and how many you'd like!" } onClear = { clearFormErrorHandler } />
            }
            <form className="max-w-md m-auto">
                <Card className=" bg-slate-200 mb-5 pb-5">
                    <CardHeader className="pb-0 text-4xl font-bungee text-center justify-center text-emerald-700">
                            Order
                    </CardHeader>
                    <CardBody>
                        { hasStoredUserId && !showEditNameInput &&
                            <div className="text-xl text-center mr-4 block font-fugaz tracking-wide mb-6">Welcome back <span className="font-bold text-emerald-900"> {username}</span> 
                            <Button className="bg-transparent" value={showEditNameInput} onPress={() => handleShowEditName()} radius="full" variant="flat" isIconOnly><FontAwesomeIcon size="lg" className="text-xl text-emerald-600" icon={faEdit}/></Button> </div>
                        }
                        { hasStoredUserId && showEditNameInput && 
                            <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                                <Input
                                    ref={editUsernameInputRef}
                                    id = "editNameInput"
                                    label="Edit Your Name"
                                    variant="bordered"
                                    radius="full"
                                    maxLength={30}
                                    color={isInvalidEditedUsername || isUsernameTaken ? "danger" : "success"}
                                    value={editedUsername}
                                    onValueChange={setEditedUsername}
                                    onFocus={onUsernameFocus}
                                    onBlur={onUsernameBlur}
                                    isInvalid={isInvalidEditedUsername || isUsernameTaken}
                                    errorMessage={isInvalidEditedUsername ? "We'll need a proper name, nutcracker" 
                                    : isUsernameTaken ? "This user already exists" : false}
                                    className="pb-5"
                                    classNames={{
                                        label: "text-xl group-data-[filled=true]:-translate-y-4",
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: ["pr-0", "bg-white", "rounded-r-none"],
                                        errorMessage: "italic ml-4"
                                    }}
                                />
                                <span className="flex">
                                    <Button
                                        classNames={{base: "rounded-l-none"}}
                                        size="md"
                                        className="h-14 bg-rose-700 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                        isIconOnly
                                        type = "button"
                                        onPress={cancelEditName}
                                    ><FontAwesomeIcon icon={faClose}/>
                                    </Button>
                                    <Button
                                        isDisabled={isInvalidEditedUsername || isUsernameTaken || storedUsername === editedUsername}
                                        size="md"
                                        isIconOnly
                                        radius="full"
                                        className="h-14 bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                        type = "button"
                                        onPress = {handleEditUsername}
                                    ><FontAwesomeIcon icon={faCheck}/>
                                    </Button>
                                </span>
                        </div>
                        }
                        { !hasStoredUserId &&
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
                                color={(isInvalidUsername && !usernameFocused) || isUsernameTaken ? "danger" : "success"}
                                label="Your Name"
                                isInvalid={(isInvalidUsername && !usernameFocused) || isUsernameTaken}
                                onValueChange={setUsername}
                                errorMessage={(isInvalidUsername && !usernameFocused) ? "We'll need your name, nutcracker" : isUsernameTaken ? "This name is already taken" : false}
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
                                    "data-[selectable=true]:focus:bg-emerald-600",
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
                                <SelectItem textValue="Custom Drink - $10" key={customDrinkId} value={customDrinkId}>Custom Drink — $10</SelectItem>
                            </SelectSection>
                        </Select>
                        { /** Custom Drink Dropdown */
                            selectedDrinkId > -1 && <div className="border-2 border-slate-200 p-2 rounded-3xl">
                            {
                                isCustomDrinkSelected &&
                                <Input
                                    ref={customDrinkDescriptionRef}
                                    id = "customDrinkInput"
                                    label = "Describe your drink"
                                    radius="full"
                                    variant="bordered"
                                    className="pb-5"
                                    maxLength={200}
                                    onFocus={onCustomDrinkDescriptionFocus}
                                    onBlur={onCustomDrinkDescriptionBlur}
                                    value={customDrinkDescription}
                                    onValueChange={setCustomDrinkDescription}
                                    color={isInvalidCustomDrinkDescription && !customDrinkDescriptionFocused ? "danger" : "success"}
                                    isInvalid={isInvalidCustomDrinkDescription && !customDrinkDescriptionFocused}
                                    errorMessage={isInvalidCustomDrinkDescription && !customDrinkDescriptionFocused && "We need to know what you want"}
                                    classNames={{
                                        label: "text-xl group-data-[filled=true]:-translate-y-4",
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: "bg-white",
                                        errorMessage: "absolute italic bottom-2 left-4"
                                    }}
                                />
                            }
                    
                        <div className={`text-center transition-all ease-out ${drinkPrice !== 0 ? 'visible' : 'invisible'}`}>
                            <label className="text-lg font-semibold mr-4 block text-center tracking-wide">How Many?</label>
                            <Button isIconOnly className="border-solid border-2 border-green-200 bg-emerald-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full mr-5" 
                            isDisabled={drinkQuantity <= 1} type="button" onPress={decrementDrinkQuantity}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </Button>
                            <span className="text-xl">{drinkQuantity}</span>
                            <Button  isIconOnly className="border-solid border-2 border-green-200  bg-emerald-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full ml-5" 
                            isDisabled={drinkQuantity >= 5} type="button" onPress={incrementDrinkQuantity}>
                                <FontAwesomeIcon icon={faPlus}/>
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
                                className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 2 ? "text-slate-200 bg-emerald-700" : "text-emerald-700" }`}
                                    onPress = { donationAmount === 2 ? () => donationHandler(0) : () => donationHandler(2)}
                                >$2</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 5 ? "text-slate-200 bg-emerald-700" : "text-emerald-700" }`}
                                    onPress = { donationAmount === 5 ? () => donationHandler(0) : () => donationHandler(5)}
                                    >$5</Button>
                                <Button
                                isIconOnly
                                radius="full"
                                className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 10 ? "text-slate-200 bg-emerald-700" : "text-emerald-700" }`}
                                onPress = { donationAmount === 10 ? () => donationHandler(0) : () => donationHandler(10)}
                                    >$10</Button>
                                <Button
                                    radius="full"
                                    className={`border-2 font-bold bg-white border-emerald-600  ${showCustomDonation || (donationAmount > 0 && 
                                        donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10)  ? "text-slate-200 bg-emerald-700" : "text-emerald-700" }`}
                                    onPress = { donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10 ? () => donationHandler(0) : () => setShowCustomDonation(true) }
                                    > 
                                    { (donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10) ? `$${donationAmount}` : 'Custom'} 
                                </Button>
                            </div>
                            {
                                showCustomDonation && 
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
                                    onKeyDown={limitKeyPress}
                                    color={isInvalidDonationAmount ? "danger" : "success"}
                                    onValueChange={setDonationAmount}
                                    isInvalid={isInvalidDonationAmount}
                                    errorMessage={isInvalidDonationAmount && "Please enter a valid donation"}
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
                                                className="bg-rose-700 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                                isIconOnly
                                                type = "button"
                                                onPress={cancelCustomDonation}
                                            >
                                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                            </Button>
                                            <Button
                                                isDisabled={isInvalidDonationAmount}
                                                size="md"
                                                isIconOnly
                                                className="bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                                type = "button"
                                                onPress = { () => setShowCustomDonation(false) }
                                            ><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
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
                                onPress={submitOrder}
                                isDisabled={isLoading || isInvalidUsername || isUsernameTaken || showEditNameInput || !selectedDrinkId || selectedDrinkId < 0 || isInvalidCustomDrinkDescription || isInvalidDonationAmount}
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