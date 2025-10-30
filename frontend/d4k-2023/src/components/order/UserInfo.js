import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Button, Select, SelectItem, SelectSection, Textarea, Input, Card, CardHeader, CardBody, CardFooter,
    Spinner, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Link,
    Checkbox
} from "@nextui-org/react"
import { useNavigate, createSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck, faMinus, faPlus, faChampagneGlasses, faEdit, faX } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";

// api imports
import { UserApi } from "../api/userApi"

const UserInfo = ({ userId, onUserSelect }) => {
    // api hooks
    const { updateUsername, getUserIdByUsername, getUserById, isUserApiLoading, createUserWithPhone } = UserApi();

    // states
    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [user, setUser] = useState(null)
    const [storedUsername, setStoredUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [editedUsername, setEditedUsername] = useState('')
    const [isUsernameTaken, setIsUsernameTaken] = useState(false)

    const [showEditNameInput, setShowEditNameInput] = useState(false)
    const [isLoadingUsername, setIsLoadingUsername] = useState(false)
    const [isLoadingUserData, setIsLoadingUserData] = useState(false)
    const [usernameFocused, setUsernameFocused] = useState(false)
    const [phoneNumberFocused, setPhoneNumberFocused] = useState(false)

    const onUsernameFocus = () => setUsernameFocused(true)
    const onUsernameBlur = () => setUsernameFocused(false)
    const onPhoneNumberFocus = () => setPhoneNumberFocused(true)
    const onPhoneNumberBlur = () => setPhoneNumberFocused(false)

    // refs & memos
    const editUsernameInputRef = useRef(null);

    const hasStoredUserId = useMemo(() => {
        return (!!userId)
    }, [userId]);

    const isInvalidUsername = useMemo(() => {
        return (!username || username.trim().length < 3)
    }, [username]);

    const isInvalidPhoneNumber = useMemo(() => {
        let regexp = /[a-zA-Z]/g
        return (!phoneNumber || phoneNumber.trim().length < 10 || phoneNumber.trim().length > 12 || regexp.test(phoneNumber))
    }, [phoneNumber]);

    const isInvalidEditedUsername = useMemo(() => {
        return (!editedUsername || editedUsername.trim().length < 3)
    }, [editedUsername]);


    // effects

    // grab from local storage if possible
    useEffect(() => {
        const localStorageUserId = localStorage.getItem('userId')
        console.log(localStorageUserId)
        if (localStorageUserId) {
            const getUser = async () => {
                setIsLoadingUserData(true)
                try {
                    const userResponse = await getUserById(localStorageUserId)
                    if (!userResponse.user) {
                        setStoredUsername(null)
                        setUsername(null)
                    } else {
                        setUserId(parseInt(localStorageUserId))
                        setUser(userResponse.user)
                        setUsername(userResponse.user.username)
                        setStoredUsername(userResponse.user.username)
                        setPhoneNumber(userResponse.user.phone_number)
                        setOptInSelected(true)
                    }
                } catch (error) {
                    console.log(error)
                }
                setIsLoadingUserData(false)
            }
            getUser()

        }
    }, [])

    useEffect(() => {
        if (showEditNameInput) editUsernameInputRef.current.focus()
    }, [showEditNameInput])

    useEffect(() => {
        setIsUsernameTaken(false)
    }, [editedUsername])

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

    }, [usernameFocused]);


    // handlers
    const handleShowEditName = () => {
        setShowEditNameInput(true)
        setEditedUsername(username)
    }

    const cancelEditName = () => {
        setShowEditNameInput(false)
        setEditedUsername(username)
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

    return (
        <>

            {hasStoredUserId && !showEditNameInput &&
                <div className="text-xl text-center mr-4 block font-fugaz tracking-wide mb-6">Welcome back <br /> <span className="font-bold text-emerald-900">{username}</span>
                    <Button className="bg-transparent" value={showEditNameInput} onPress={() => handleShowEditName()} radius="full" variant="flat" isIconOnly><FontAwesomeIcon size="lg" className="text-xl text-emerald-600" icon={faEdit} /></Button> </div>
            }
            {hasStoredUserId && showEditNameInput &&
                <div className="flex justify-between duration-200 ease-out transition animate-slideIn">
                    <Input
                        ref={editUsernameInputRef}
                        id="editNameInput"
                        label="Edit Your Name"
                        variant="bordered"
                        radius="full"
                        maxLength={20}
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
                        isDisabled={isLoadingUserData}
                        className="pb-5"
                        classNames={{
                            label: `text-xl group-data-[filled=true]:-translate-y-2 ${isInvalidUsername ? '-translate-y-2.5' : ''}`,
                            trigger: "min-h-unit-16",
                            listboxWrapper: "max-h-[400px]",
                            inputWrapper: "bg-white",
                            errorMessage: `${username ? "absolute italic -bottom-5 ml-3.5 mb-1.5 text-sm" : "absolute italic bottom-2 ml-3.5 mb-1.5 text-sm"}`
                        }}
                        maxLength={30}
                        autoFocus
                        onFocus={onUsernameFocus}
                        onBlur={onUsernameBlur}
                        value={username}
                        variant="bordered"
                        radius="full"
                        color={(isInvalidUsername && !usernameFocused) || isUsernameTaken ? "danger" : "success"}
                        label="Your Full Name"
                        isInvalid={(isInvalidUsername && !usernameFocused && !isLoadingUserData) || isUsernameTaken}
                        onValueChange={setUsername}
                        errorMessage={(isInvalidUsername && !usernameFocused && !isLoadingUserData) ? "We'll need your name, nutcracker" : isUsernameTaken ? "This name is already taken" : false}
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
            <Input
                className="pb-5"
                classNames={{
                    label: `text-xl group-data-[filled=true]:-translate-y-2 ${isInvalidPhoneNumber ? '-translate-y-2.5' : ''}`,
                    trigger: "min-h-unit-16",
                    listboxWrapper: "max-h-[400px]",
                    inputWrapper: "bg-white",
                    errorMessage: `${phoneNumber ? "absolute italic -bottom-5 ml-3.5 mb-1.5 text-sm" : "absolute italic bottom-2 ml-3.5 mb-1.5 text-sm"}`
                }}
                maxLength={15}
                type="tel"
                name="phone"
                onFocus={onPhoneNumberFocus}
                onBlur={onPhoneNumberBlur}
                value={phoneNumber}
                variant="bordered"
                radius="full"
                color={(isInvalidPhoneNumber && !phoneNumberFocused) ? "danger" : "success"}
                label="Your Phone Number"
                isInvalid={(isInvalidPhoneNumber && !phoneNumberFocused)}
                onValueChange={setPhoneNumber}
                errorMessage={(isInvalidPhoneNumber && !phoneNumberFocused) ? "We'll need a valid number" : false}
            />

        </>
    )
}

export default UserInfo;