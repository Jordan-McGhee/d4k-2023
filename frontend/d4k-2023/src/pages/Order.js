import React, { useEffect, useState, useMemo, useRef } from "react";
import {
    Button, Select, SelectItem, SelectSection, Textarea, Input, Card, CardHeader, CardBody, CardFooter,
    Spinner, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Link
} from "@nextui-org/react"
import { useNavigate, createSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck, faMinus, faPlus, faChampagneGlasses, faEdit, faX } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import { OrderApi } from "../api/orderApi"
import { toast } from 'react-toastify';
import shots from "../assets/shots.json"

import { DrinkApi } from "../api/drinkApi";
import { UserApi } from "../api/userApi"

import icsFile from '../assets/drink4thekidsparty.ics'

const Order = () => {
    let navigate = useNavigate()
    const { updateUsername, updatePhoneNumber, getUserIdByUsername, getUserIdByPhoneNumber, createUserWithPhone,  getUserById, isUserApiLoading } = UserApi()
    const { createOrder } = OrderApi()
    const { getDrinks, isLoadingDrinksApi } = DrinkApi()

    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')    
    const [user, setUser] = useState(null)
    const [storedUsername, setStoredUsername] = useState('')
    const [allDrinks, setAllDrinks] = useState([])
    const [userId, setUserId] = useState('')
    const [editedUsername, setEditedUsername] = useState('')
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('')
    const [isUsernameTaken, setIsUsernameTaken] = useState(false)
    const [isPhoneNumberTaken, setIsPhoneNumberTaken] = useState(false)
    const [drinkName, setDrinkName] = useState('')
    const [selectedDrinkDescription, setSelectedDrinkDescription] = useState('')
    const [selectedDrinkId, setSelectedDrinkId] = useState(-1)
    const [selectValue, setSelectValue] = useState(new Set([]));
    const [drinkCost, setDrinkCost] = useState(0)
    const [drinkQuantity, setDrinkQuantity] = useState(1)
    const [donationAmount, _setDonationAmount] = useState(0)
    const setDonationAmount = (amount) => { _setDonationAmount(amount > 0 ? parseInt(amount) : 0) }
    const [showCustomDonation, setShowCustomDonation] = useState(false)
    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [showEditPhoneNumberInput, setShowEditPhoneNumberInput] = useState(false)
    const [comments, setComments] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUsername, setIsLoadingUsername] = useState(false)
    const [isLoadingPhoneNumber, setIsLoadingPhoneNumber] = useState(false)
    const [isLoadingUserData, setIsLoadingUserData] = useState(false)
    const [searchParams] = useSearchParams();
    const [usernameFocused, setUsernameFocused] = useState(false)
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false)
    const [usernameEverFocused, setUsernameEverFocused] = useState(false)
    const [phoneNumberEverFocused, setPhoneNumberEverFocused] = useState(false)
    const onUsernameFocus = () => {
        setUsernameFocused(true)
        setUsernameEverFocused(true)
    }
    const onUsernameBlur = () => setUsernameFocused(false)
    const onPhoneNumberFocus = () => {
        setPhoneNumberFocused(true)
        setPhoneNumberEverFocused(true)
    }
    const onPhoneNumberBlur = () => setPhoneNumberFocused(false)
    const [customDrinkDescription, setCustomDrinkDescription] = useState('')
    const [customDrinkDescriptionFocused, setCustomDrinkDescriptionFocused] = useState(false)
    const onCustomDrinkDescriptionFocus = () => setCustomDrinkDescriptionFocused(true)
    const onCustomDrinkDescriptionBlur = () => setCustomDrinkDescriptionFocused(false)
    const [isOrderingEnabled, setIsOrderingEnabled] = useState(false)
    const [showNotPartyTimeModal, setShowNotPartyTimeModal] = useState(false)
    const [showAgeModal, setShowAgeModal] = useState(false)
    const [optInSelected, setOptInSelected] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const customDrinkDescriptionRef = useRef(null);
    const editUsernameInputRef = useRef(null);
    const editPhoneNumberInputRef = useRef(null);

    const customDrinkId = 999
    const isCustomDrinkSelected = useMemo(() => {
        return selectedDrinkId === customDrinkId
    }, [selectedDrinkId])

    const isShot = useMemo(() => {
        return shots.some(d => d.id === selectedDrinkId)
    }, [selectedDrinkId])

    const isInvalidCustomDrinkDescription = useMemo(() => {
        return (!customDrinkDescription || customDrinkDescription.trim().length < 3) && isCustomDrinkSelected
    }, [isCustomDrinkSelected, customDrinkDescription]);

    const hasStoredUserId = useMemo(() => {
        return (!!userId)
    }, [userId]);

    const orderTotal = useMemo(() => {
        return (drinkCost * drinkQuantity) + donationAmount
    }, [drinkCost, drinkQuantity, donationAmount]);


    const isInvalidUsername = useMemo(() => {
        return (!username || username.trim().length < 7)
    }, [username]);

    const isInvalidPhoneNumber = useMemo(() => {
        let regexp = /[a-zA-Z]/g
        return (!phoneNumber || phoneNumber.trim().length !== 10 || regexp.test(phoneNumber)) 
    }, [phoneNumber]);

    const isInvalidEditedUsername = useMemo(() => {
        return (!editedUsername || editedUsername.trim().length < 7)
    }, [editedUsername]);

    const isInvalidEditedPhoneNumber = useMemo(() => {
        let regexp = /[a-zA-Z]/g
        return (!editedPhoneNumber || editedPhoneNumber.trim().length < 10 || editedPhoneNumber.trim().length > 12 || regexp.test(editedPhoneNumber))
    }, [editedPhoneNumber]);

    const isInvalidDonationAmount = useMemo(() => {
        return donationAmount < 0 || donationAmount > 1000
    }, [donationAmount]);

    const notify = (error) => {
        toast.error(`UH OH! ${error}`, { position: toast.POSITION.BOTTOM_CENTER });
    }

    useEffect(() => {
        const getDrinksCall = async () => {
            try {
                const response = await getDrinks()

                setAllDrinks(response)
            } catch (err) {
                setErrorMessage(`Error fetching drinks: ${err.message}`)
                console.log(err)
            }
        }
        getDrinksCall()
    }, [])


    useEffect(() => {
        if (allDrinks) {
            let drinkIdParam = searchParams.get("drinkId")
            if (drinkIdParam) {
                updateDrinkState(parseInt(drinkIdParam))
            }
        }
    }, [allDrinks])

    useEffect(() => {
        const localStorageUserId = localStorage.getItem('userId')
        console.log(localStorageUserId)
        if (localStorageUserId) {
            const getUser = async () => {
                setIsLoadingUserData(true)
                try {
                    const userResponse = await getUserById(localStorageUserId)
                    if(!userResponse.user){
                        setStoredUsername('')
                        setUsername('')
                    }else{
                        setUserId(parseInt(localStorageUserId))
                        setUser(userResponse.user)
                        setUsername(userResponse.user.username)
                        setStoredUsername(userResponse.user.username)
                        setPhoneNumber(userResponse.user.phone_number)
                        setOptInSelected(true)
                    }
                } catch (error) {
                    console.log(error)
                    setErrorMessage(`Error fetching user: ${error}`)
                }
                setIsLoadingUserData(false)
            }
            getUser()
        }

        let drinkIdParam = searchParams.get("drinkId")
        if (drinkIdParam) {
            updateDrinkState(parseInt(drinkIdParam))
        }
        
        setIsOrderingEnabled(false)

    }, [])

    useEffect(() => {
        // Check if age verification has been completed
        const ageVerified = localStorage.getItem('ageVerificationClicked');
        if (!ageVerified) {
            setShowAgeModal(true);
        }
    }, [])

    useEffect(() => {
        if (showCustomDonation) setDonationAmount(0)
    }, [showCustomDonation])

    useEffect(() => {
        if (isCustomDrinkSelected) customDrinkDescriptionRef.current.focus()
    }, [isCustomDrinkSelected])

    useEffect(() => {
        if (showEditNameInput) editUsernameInputRef.current.focus()
    }, [showEditNameInput])

    useEffect(() => {
        setIsUsernameTaken(false)
    }, [editedUsername])

    useEffect(() => {
        setIsPhoneNumberTaken(false)
    }, [editedPhoneNumber])

    const verifyUsernameIsNew = async (uname) => {
        setIsLoadingUsername(true)
        let data = await getUserIdByUsername(uname)
        if (data?.user_id) {
            setIsUsernameTaken(true)
        }
        setIsLoadingUsername(false)
        return !data?.user_id
    }

    useEffect(() => {
        setIsUsernameTaken(false)
        if (!isInvalidUsername && !usernameFocused && username !== storedUsername) {
            verifyUsernameIsNew(username);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usernameFocused]);

    useEffect(() => {
        setIsPhoneNumberTaken(false)
        if (!isInvalidPhoneNumber && !phoneNumberFocused) {
            verifyPhoneNumberIsNew(phoneNumber);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumberFocused]);

    const updateDrinkState = (drinkId) => {
        if (drinkId === null) return

        if (drinkId < 0) {
            setDrinkName('')
            setDrinkCost(0)
            setDrinkQuantity(1)
            setSelectedDrinkId(-1)
            return
        }
        let selectedDrink = allDrinks.find(x => x.drink_id === drinkId)
        console.log(allDrinks)
        setSelectValue(new Set([drinkId.toString()]))
        setSelectedDrinkId(drinkId)
        setDrinkName(selectedDrink?.name ?? "custom")
        setSelectedDrinkDescription(selectedDrink?.description ?? '')
        setDrinkCost(parseInt(selectedDrink?.cost || 12))
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

    const handleShowEditPhoneNumber = () => {
        setShowEditPhoneNumberInput(true)
        setEditedPhoneNumber(phoneNumber)
    }

    const cancelEditPhoneNumber = () => {
        setShowEditPhoneNumberInput(false)
        setEditedPhoneNumber(phoneNumber)
    }

    const handleEditUsername = async () => {
        if (isLoading || storedUsername === editedUsername) return
        setIsLoading(true)

        let isNew = await verifyUsernameIsNew(editedUsername)

        if (isNew) {
            let data = await updateUsername(userId, editedUsername)
            let userResponse = await getUserById(userId)
            setUser(userResponse)
            setUsername(editedUsername)
            setStoredUsername(editedUsername)
            localStorage.setItem('storedUsername', editedUsername)
            setShowEditNameInput(false)
        }
        setIsLoading(false)
    }

    const verifyPhoneNumberIsNew = async (number) => {
        setIsLoadingPhoneNumber(true)
        let data = await getUserIdByPhoneNumber(number)
        if (data?.user_id) {
            setIsPhoneNumberTaken(true)
        }
        setIsLoadingPhoneNumber(false)
        return !data?.user_id
    }

    const handleEditPhoneNumber = async () => {
        if (isLoading || phoneNumber === editedPhoneNumber) return
        setIsLoading(true)

        let isNew = await verifyPhoneNumberIsNew(editedPhoneNumber)

        if (isNew) {
            try{
            let data = await updatePhoneNumber(userId, editedPhoneNumber)
            setPhoneNumber(editedPhoneNumber)
            }
            catch(error){
            }

            setShowEditPhoneNumberInput(false)
        }
        setIsLoading(false)
    }

    const submitOrder = async () => {
        if (isLoading || isLoadingUserData) return
        setIsLoading(true)

        let currentUserId = userId
        var trimmedUsername = username.trim()
        var trimmedPhoneNumber = phoneNumber.trim()

        if (!hasStoredUserId) {
            let isNewUsername = await verifyUsernameIsNew(trimmedUsername)
            if (!isNewUsername) {
                setIsUsernameTaken(true)
                return
            }

            let data = await createUserWithPhone(trimmedUsername, trimmedPhoneNumber)
            if (!data?.user_id) throw Error('User not created')
            currentUserId = data.user_id
            setUserId(data.user_id)
            localStorage.setItem('userId', data.user_id)
            localStorage.setItem('storedUsername', trimmedUsername)
        }

        let orderData = {
            user_id: currentUserId,
            drinkTitle: drinkName,
            drinkCost: drinkCost,
            quantity: drinkQuantity,
            tip_amount: donationAmount,
            comments: `${comments.trim()}${customDrinkDescription ? ` (${customDrinkDescription.trim()})` : ''}`
        }

        try {
            let data = await createOrder(orderData)
            
            localStorage.setItem('storedUsername', trimmedUsername)
            localStorage.setItem('userId', currentUserId)
            setIsLoading(false)

            navigate({
                pathname: '/queue',
                search: createSearchParams({ orderId: data.order_id }).toString()
            })
        } catch (error) {
            notify(error)
            console.log(error)
        }
    }

    const handleAgeVerificationYes = () => {
        localStorage.setItem('ageVerificationClicked', 'true');
        setShowAgeModal(false);
    };

    const handleAgeVerificationNo = () => {
        navigate('/');
    };

    return (
        <>
            <Modal isOpen={showAgeModal} backdrop="opaque" isDismissable={false} isKeyboardDismissDisabled={true} placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-center font-fugaz text-emerald-600">Age Verification</ModalHeader>
                    <ModalBody>
                        <p className="text-center text-lg font-semibold">Are you over the age of 21?</p>
                    </ModalBody>
                    <ModalFooter className="justify-center gap-4">
                        <Button 
                            color="danger" 
                            variant="light" 
                            onPress={handleAgeVerificationNo}
                            className="font-fugaz"
                        >
                            No
                        </Button>
                        <Button 
                            color="success" 
                            onPress={handleAgeVerificationYes}
                            className="font-fugaz text-white"
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal placement="center" isOpen={showNotPartyTimeModal} onClose={() => setShowNotPartyTimeModal(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-fugaz text-2xl justify-center text-emerald-600">Son of a Nutcracker</ModalHeader>
                            <ModalBody className="justify-center">
                                <p className="text-center text-xl font-bold">
                                    Orders are open at the party on
                                </p>

                                <Link isBlock className="text-center self-center text-xl" underline="always" color="success" href={icsFile} download="d4k-party.ics">
                                    Saturday<br />December 13<br />6PM — Late
                                </Link>
                                <p className="pt-2 text-xl text-center">
                                    Mark your calendar
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <form className="max-w-md m-auto">
                <Card className="bg-slate-200 mb-5 pb-5">
                    <CardHeader className="pb-0 text-4xl font-bungee text-center justify-center text-emerald-700 flex flex-col items-center">
                        Order
                        {user?.photo_url && (
                            <img 
                                alt="Profile" 
                                className="w-16 h-16 object-cover rounded-full mb-2 border-2 border-emerald-700" 
                                src={user.photo_url} 
                            />
                        )}
                    </CardHeader>
                       <div className="flex justify-end mb-3">
                </div>
                    <CardBody>
                        {isLoading && <Spinner size="lg" color="success" />}
                        {!isLoading && errorMessage && 
                            <div className="grid items-center">
                                <div className="text-lg text-center">
                                    Whoops! We're having trouble... <br />
                                     Refresh the page in a bit and try again <br/>
                                     Come to the bar if the issue persists
                                </div>
                                <div className="pt-2 text-sm text-red-600 italic text-center mb-4">
                                {errorMessage}
                                </div>
                                <Button
                                className="h-14 text-center rounded-full bg-emerald-700 text-slate-200 text-xl border-t-2 border-b-2"
                                onPress={() => window.location.reload()}>Refresh</Button>
                            </div>}
                        {!isLoading && errorMessage === null &&
                        <div>
                        {hasStoredUserId && !showEditNameInput &&
                            <div className="text-xl text-center block font-fugaz tracking-wide">Welcome back <br /> <span className="font-bold font-mono text-emerald-700 text-xl">{username}</span>
                                <Button className="bg-transparent absolute pb-5" value={showEditNameInput} onPress={() => handleShowEditName()} radius="full" variant="flat" isIconOnly>
                                    <FontAwesomeIcon size="sm" className="text-gray-600" icon={faEdit} />
                                </Button> 
                            </div>
                        }
                        {hasStoredUserId && showEditNameInput &&
                            <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                                <Input
                                    ref={editUsernameInputRef}
                                    id="editNameInput"
                                    label="Edit Your Name"
                                    variant="bordered"
                                    radius="full"
                                    maxLength={25}
                                    color={isInvalidEditedUsername || isUsernameTaken ? "danger" : "success"}
                                    value={editedUsername}
                                    onValueChange={setEditedUsername}
                                    onFocus={onUsernameFocus}
                                    onBlur={onUsernameBlur}
                                    isInvalid={isInvalidEditedUsername || isUsernameTaken}
                                    errorMessage={isInvalidEditedUsername ? "We'll need a full name, nutcracker" : isUsernameTaken ? "This user already exists" : false}
                                    className="pb-5"
                                    classNames={{
                                        label: "text-xl group-data-[filled=true]:-translate-y-4",
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: ["pr-0", "bg-white", "rounded-r-none"],
                                        errorMessage: "italic ml-4"
                                    }}
                                    endContent={
                                        isLoadingUsername && <Spinner color="success" />
                                    }
                                />
                                <span className="flex">
                                    <Button
                                        classNames={{ base: "rounded-l-none" }}
                                        size="md"
                                        className="h-14 bg-rose-700 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                        isIconOnly
                                        type="button"
                                        onPress={cancelEditName}
                                    ><FontAwesomeIcon icon={faClose} />
                                    </Button>
                                    <Button
                                        isDisabled={isInvalidEditedUsername || isUsernameTaken || storedUsername === editedUsername}
                                        size="md"
                                        isIconOnly
                                        radius="full"
                                        className="h-14 bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                        type="button"
                                        onPress={handleEditUsername}
                                    ><FontAwesomeIcon icon={faCheck} />
                                    </Button>
                                </span>
                            </div>
                        }
                        {!hasStoredUserId &&
                            <div>
                                <Input
                                    isDisabled={isLoadingUserData || isUserApiLoading}
                                    className={isUsernameTaken ? "pb-7" : "pb-5"}
                                    classNames={{
                                        label: `text-xl group-data-[filled=true]:-translate-y-2 ${isInvalidUsername ? '-translate-y-2.5' : ''}`,
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: "bg-white",
                                        input: "placeholder:italic",
                                        errorMessage: `${username ? "absolute italic ml-3.5 mb-3 text-xs" : "absolute italic bottom-2 ml-3.5 mb-1.5 text-xs"}`
                                    }}
                                    maxLength={30}
                                    autoFocus
                                    onFocus={onUsernameFocus}
                                    onBlur={onUsernameBlur}
                                    value={username}
                                    variant="bordered"
                                    radius="full"
                                    color={(isInvalidUsername && usernameEverFocused && !usernameFocused && !isUserApiLoading) || isUsernameTaken ? "danger" : "success"}
                                    label="Your Full Name"
                                    placeholder={isInvalidUsername && usernameEverFocused ? "" : "Help us find you at the bar"}
                                    isInvalid={(isInvalidUsername && usernameEverFocused && !usernameFocused && !isLoadingUserData) || isUsernameTaken}
                                    onValueChange={setUsername}
                                    errorMessage={(isInvalidUsername && usernameEverFocused && !usernameFocused && !isLoadingUserData && !isUserApiLoading) ? (!username.includes(' ') ? "Please provide first and last name" : "We'll need your full name, nutcracker.") : isUsernameTaken ? "This name is taken. Click 'Account Help' to recover your account" : false}
                                />
                                {!usernameFocused &&
                                    <div className="absolute right-10 top-9"> {
                                        ((isLoadingUsername && <Spinner color="success" />) ||
                                            (!isInvalidUsername && !isLoadingUsername &&
                                                (isUsernameTaken ?
                                                    // invalid username 
                                                    <FontAwesomeIcon className="text-red-600" icon={faX} />
                                                    :
                                                    // valid username
                                                    <FontAwesomeIcon className="text-emerald-600" icon={faCheck} />
                                                )
                                            ))
                                    }
                                    </div>
                                }
                            </div>
                        }
                        {!hasStoredUserId &&
                                <Input
                                    className={isPhoneNumberTaken ? "pb-7" : "pb-5"}
                                    classNames={{
                                        label: `text-xl group-data-[filled=true]:-translate-y-2 ${isInvalidPhoneNumber ? '-translate-y-2.5' : ''}`,
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: "bg-white",
                                        input: "placeholder:italic",
                                        errorMessage: `${phoneNumber ? "absolute italic ml-3.5 mb-3 text-xs" : "absolute italic bottom-2 ml-3.5 mb-1.5 text-xs"}`
                                    }}
                                    maxLength={10}
                                    type="tel"
                                    name="phone"
                                    onFocus={onPhoneNumberFocus}
                                    onBlur={onPhoneNumberBlur}
                                    value={phoneNumber}
                                    variant="bordered"
                                    radius="full"
                                    placeholder={isInvalidPhoneNumber && phoneNumberEverFocused ? "" : "We only send you order updates"}
                                    color={(isInvalidPhoneNumber && phoneNumberEverFocused && !phoneNumberFocused && !isUserApiLoading) || isPhoneNumberTaken ? "danger" : "success"}
                                    label="Your Phone Number"
                                    isInvalid={(isInvalidPhoneNumber && phoneNumberEverFocused && !phoneNumberFocused && !isUserApiLoading) || isPhoneNumberTaken}
                                    onValueChange={setPhoneNumber}
                                    errorMessage={(isInvalidPhoneNumber && phoneNumberEverFocused && !phoneNumberFocused && !isUserApiLoading) ? "We'll need a valid number" : isPhoneNumberTaken ? "Phone number is taken. Click 'Account Help' to recover your account." : false}
                                />
                        }     
                        {hasStoredUserId && !showEditPhoneNumberInput &&
                            <div className="text-lg text-center mr-2 block font-fugaz tracking-wide mb-6"><span className="font-bold font-mono text-emerald-700">{phoneNumber}</span>
                                <Button className="bg-transparent absolute pb-5" value={showEditPhoneNumberInput} onPress={() => handleShowEditPhoneNumber()} radius="full" variant="flat" isIconOnly>
                                    <FontAwesomeIcon size="sm" className="text-gray-600" icon={faEdit} />
                                </Button> 
                            </div>
                        }
                        {hasStoredUserId && showEditPhoneNumberInput &&
                            <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                                <Input
                                    ref={editPhoneNumberInputRef}
                                    id="editNumberInput"
                                    label="Edit Phone Number"
                                    variant="bordered"
                                    radius="full"
                                    maxLength={10}
                                    color={isInvalidEditedPhoneNumber || isPhoneNumberTaken ? "danger" : "success"}
                                    value={editedPhoneNumber}
                                    onValueChange={setEditedPhoneNumber}
                                    onFocus={onPhoneNumberFocus}
                                    onBlur={onPhoneNumberBlur}
                                    isInvalid={isInvalidEditedPhoneNumber || isPhoneNumberTaken}
                                    errorMessage={isInvalidEditedPhoneNumber ? "We'll need a proper phone, nutcracker"
                                        : isPhoneNumberTaken ? "This phone number is taken already" : false}
                                    className="pb-5"
                                    classNames={{
                                        label: "text-xl group-data-[filled=true]:-translate-y-4",
                                        trigger: "min-h-unit-16",
                                        listboxWrapper: "max-h-[400px]",
                                        inputWrapper: ["pr-0", "bg-white", "rounded-r-none"],
                                        errorMessage: "italic ml-4"
                                    }}
                                    endContent={
                                        isLoadingPhoneNumber && <Spinner color="success" />
                                    }
                                />
                                <span className="flex">
                                    <Button
                                        classNames={{ base: "rounded-l-none" }}
                                        size="md"
                                        className="h-14 bg-rose-700 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                        isIconOnly
                                        type="button"
                                        onPress={cancelEditPhoneNumber}
                                    ><FontAwesomeIcon icon={faClose} />
                                    </Button>
                                    <Button
                                        isDisabled={isInvalidEditedPhoneNumber || isPhoneNumberTaken || phoneNumber === editedPhoneNumber}
                                        size="md"
                                        isIconOnly
                                        radius="full"
                                        className="h-14 bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                        type="button"
                                        onPress={handleEditPhoneNumber}
                                    ><FontAwesomeIcon icon={faCheck} />
                                    </Button>
                                </span>
                            </div>
                        }

                        <Select
                            showScrollIndicators
                            scrollShadowProps={{
                                hideScrollBar: false,
                                size: 100
                            }}
                            className="pb-2 mb-2"
                            variant="bordered"
                            selectionMode="single"
                            onChange={(e) => drinkDropdownChanged(e)}
                            fullWidth
                            color="success"
                            radius="full"

                            classNames={{
                                label: "text-xl group-data-[filled=true]:-translate-y-2",
                                trigger: "min-h-unit-16 bg-white",
                                listboxWrapper: "max-h-[400px]",
                            }}
                            listboxProps={{
                                itemClasses: {
                                    base: [
                                        "rounded-md",
                                        "data-[hover=true]:bg-default-100",
                                        "data-[selectable=true]:focus:bg-emerald-600/50",
                                        "data-[focus-visible=true]:ring-default-500",
                                    ],
                                },
                            }}
                            label="Select a Drink"
                            selectedKeys={selectValue}
                            endContent={
                                isLoadingDrinksApi && <Spinner style={{bottom: '8px', zIndex:100}} color="success" />
                            }
                        >
                            <SelectSection classNames={{ heading: "font-bold text-sm text-emerald-600" }} showDivider title="Cocktails">
                                {
                                    allDrinks.filter(d => d.type === 'cocktail').map((drink) => (
                                        <SelectItem textValue={`${drink.name} — $${drink.cost}`} key={drink.drink_id} value={drink.drink_id}>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{drink.name} — ${drink.cost}</span>
                                                <span className="text-sm truncate text-default-400">{
                                                    drink.ingredients.map((ingredient, i) => (
                                                        <span key={`${drink.drink_id}-${ingredient}`} className="text-xs italic capitalize text-slate-600">{ingredient + (i !== drink.ingredients.length - 1 ? ', ' : '')}</span>
                                                    ))
                                                }</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectSection>
                            <SelectSection classNames={{ heading: "font-bold text-sm text-emerald-600" }} showDivider title="Batched">
                                {
                                    allDrinks.filter(d => d.type === 'batched').map((drink) => (
                                        <SelectItem textValue={`${drink.name} — $${drink.cost}`} key={drink.drink_id} value={drink.drink_id}>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{drink.name} — ${drink.cost}</span>
                                                <span className="text-sm truncate text-default-400">{
                                                    drink.ingredients.map((ingredient, i) => (
                                                        <span key={`${drink.drink_id}-${ingredient}`} className="text-xs italic capitalize text-slate-600">{ingredient + (i !== drink.ingredients.length - 1 ? ', ' : '')}</span>
                                                    ))
                                                }</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectSection>
                            <SelectSection classNames={{ heading: "font-bold text-sm text-emerald-600" }} showDivider title="Shots">
                                {
                                    allDrinks.filter(d => d.type === 'shot').map((drink) => (
                                        <SelectItem textValue={`${drink.name} — $${drink.cost}`} key={drink.drink_id} value={drink.drink_id}>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{drink.name} — ${drink.cost}</span>
                                                <span className="text-sm truncate text-default-400">{
                                                    drink.ingredients.map((ingredient, i) => (
                                                        <span key={`${drink.drink_id}-${ingredient}`} className="text-xs italic capitalize text-slate-600">{ingredient + (i !== drink.ingredients.length - 1 ? ', ' : '')}</span>
                                                    ))
                                                }</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectSection>
                            <SelectSection classNames={{ heading: "font-bold text-sm text-emerald-600" }} showDivider title="Mocktails">
                                {
                                    allDrinks.filter(d => d.type === 'mocktail').map((drink) => (
                                        <SelectItem textValue={`${drink.name} — $${drink.cost}`} key={drink.drink_id} value={drink.drink_id}>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{drink.name} — ${drink.cost}</span>
                                                <span className="text-sm truncate ">{
                                                    drink.ingredients.map((ingredient, i) => (
                                                        <span key={`${drink.drink_id}-${ingredient}`} className="text-xs italic capitalize text-slate-600">{ingredient + (i !== drink.ingredients.length - 1 ? ', ' : '')}</span>
                                                    ))
                                                }</span>
                                            </div>
                                        </SelectItem>
                                    ))
                                }
                            </SelectSection>
                            <SelectSection classNames={{ heading: "font-bold text-sm text-emerald-600" }} title="Build Your Own">
                                <SelectItem textValue="Make a Drink - $12" key={customDrinkId} value={customDrinkId}>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Make a Drink / Bartender's Choice — $12</span>
                                        <span className="truncate text-xs italic capitalize text-slate-600">Whatever you want, or whatever we want</span>
                                    </div>
                                </SelectItem>
                            </SelectSection>
                        </Select>
                        {
                            selectedDrinkId && <div className="text-center text-xs justify-center italic text-slate-600 mx-1">
                                {selectedDrinkDescription}
                            </div>
                        }
                        { /** Custom Drink Dropdown */
                            selectedDrinkId > -1 && <div className="border-2 border-slate-200 p-2 rounded-3xl">
                                {
                                    isCustomDrinkSelected &&
                                    <Input
                                        ref={customDrinkDescriptionRef}
                                        id="customDrinkInput"
                                        label="Describe your drink"
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

                                <div className={`text-center transition-all ease-out ${drinkCost !== 0 ? 'visible' : 'invisible'}`}>
                                    <label className="text-lg font-semibold block text-center tracking-wide">How Many?</label>
                                    <Button isIconOnly className="border-solid border-2 border-green-200 bg-emerald-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full mr-5"
                                        isDisabled={drinkQuantity <= 1} type="button" onPress={decrementDrinkQuantity}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    <span className="text-xl">{drinkQuantity}</span>
                                    <Button isIconOnly className="border-solid border-2 border-green-200  bg-emerald-600 disabled:bg-gray-400 w-12 h-12 text-white rounded-full ml-5"
                                        isDisabled={drinkQuantity >= (isShot ? 8 : 5)} type="button" onPress={incrementDrinkQuantity}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </div>
                                <div className="my-2">
                                    <label className="text-lg text-center font-semibold block">
                                        Additional Tip / Donation
                                    </label>

                                    {/* DIV OF BUTTONS FOR DIFFERENT DONATION AMOUNTS */}
                                    <div className="flex justify-between my-2">
                                        <Button
                                            isIconOnly
                                            radius="full"
                                            className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 2 ? "text-slate-200 bg-emerald-700" : "text-emerald-700"}`}
                                            onPress={donationAmount === 2 ? () => donationHandler(0) : () => donationHandler(2)}
                                        >$2</Button>
                                        <Button
                                            isIconOnly
                                            radius="full"
                                            className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 5 ? "text-slate-200 bg-emerald-700" : "text-emerald-700"}`}
                                            onPress={donationAmount === 5 ? () => donationHandler(0) : () => donationHandler(5)}
                                        >$5</Button>
                                        <Button
                                            isIconOnly
                                            radius="full"
                                            className={`border-2 font-bold border-emerald-600 bg-white ${donationAmount === 10 ? "text-slate-200 bg-emerald-700" : "text-emerald-700"}`}
                                            onPress={donationAmount === 10 ? () => donationHandler(0) : () => donationHandler(10)}
                                        >$10</Button>
                                        <Button
                                            radius="full"
                                            className={`border-2 font-bold bg-white border-emerald-600  ${showCustomDonation || (donationAmount > 0 &&
                                                donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10) ? "text-slate-200 bg-emerald-700" : "text-emerald-700"}`}
                                            onPress={donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10 ? () => donationHandler(0) : () => setShowCustomDonation(true)}
                                        >
                                            {(donationAmount > 0 && donationAmount !== 2 && donationAmount !== 5 && donationAmount !== 10) ? `$${donationAmount}` : 'Custom'}
                                        </Button>
                                    </div>
                                    {
                                        showCustomDonation &&
                                        <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                                            <Input
                                                id="donationInput"
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
                                                        classNames={{ base: "rounded-l-none" }}
                                                        size="md"
                                                        className="bg-rose-700 text-slate-200 text-xl border-t-2 rounded-none border-b-2"
                                                        isIconOnly
                                                        type="button"
                                                        onPress={cancelCustomDonation}
                                                    >
                                                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                                    </Button>
                                                    <Button
                                                        isDisabled={isInvalidDonationAmount}
                                                        size="md"
                                                        isIconOnly
                                                        className="bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                                        type="button"
                                                        onPress={() => setShowCustomDonation(false)}
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
                            minRows="2"
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
                                inputWrapper: "bg-white",
                                description: "italic",
                            }}
                        />
                        {/* <Checkbox className="text-center italic pt-2 mt-2" isDisabled={false} value={optInSelected} onValueChange={setOptInSelected} size="md">
                            Opt in to order update messages
                        </Checkbox> */}
                        </div>}
                    </CardBody>
                    {!isLoading && <CardFooter>
                        <div className="flex justify-between w-full items-center mb-2">
                            <div className="font-bold text-xl">Total: ${orderTotal}</div>
                            <Button
                                className=" px-4 py-3 rounded-full bg-gradient-to-tr font-fugaz tracking-wide text-lg from-emerald-900 to-emerald-500 text-white  shadow-lg"
                                onPress={submitOrder}
                                isDisabled={isLoading | isLoadingDrinksApi || isInvalidUsername || (isInvalidPhoneNumber && !storedUsername) || isUsernameTaken || showEditNameInput || !selectedDrinkId || selectedDrinkId < 0 || isInvalidCustomDrinkDescription || isInvalidDonationAmount}
                            >
                                Grab a Drink
                                <FontAwesomeIcon beat style={{animationDuration:'2s'}} size="2x" icon={faChampagneGlasses}></FontAwesomeIcon>
                            </Button>
                        </div>
                        <br></br>

                    </CardFooter>}

                    <div className="p-2 text-xs text-center italic">By providing your phone number you agree to receive informational text messages from D4K regarding your order. Frequency will vary. Msg and data rates may apply. Reply STOP to cancel</div>
                    {!hasStoredUserId && <Button
                        isIconOnly
                        size="sm"
                        className="fixed bottom-4 left-4 rounded-full bg-emerald-600 h-10 w-fit px-6 text-xs text-6 text-white"
                        onPress={() => navigate('/request-recovery')}
                        title="Recover your account"
                    >
                        Account Help
                    </Button>}
                </Card>
            </form>
        </>
    )
}

export default Order