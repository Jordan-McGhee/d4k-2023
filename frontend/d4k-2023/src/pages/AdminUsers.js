import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCheck, faMagnifyingGlass, faDollar, faPlus, faUser 
} from '@fortawesome/free-solid-svg-icons'
import {
    Spinner, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Link
} from "@nextui-org/react";

import ErrorModal from "../components/UIElements/ErrorModal"
import convertDate from "../Conversions/convertDateTime";
import { UserApi } from "../api/userApi";

// Constants
const VALIDATION_RULES = {
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 30,
    MAX_DONATION: 1000,
    MAX_INPUT_LENGTH: 4
};

const TABLE_COLUMNS = [
    { key: "username", label: "Name", className: "w-2/12" },
    { key: "phone_number", label: "Phone", className: "w-2/12" },
    { key: "adjusted_donations", label: "Donation Adjust", className: "w-1/12" },
    { key: "created_at", label: "Created", className: "w-1/12" },
    { key: "updated_at", label: "Updated", className: "w-1/12" }
];

const AdminUsers = () => {
    // API hooks
    const { 
        updateUserDonations, 
        getAllUsers, 
        createUser, 
        getUserIdByUsername, 
        isUserApiLoading, 
        hasError, 
        clearError 
    } = UserApi()

    // User data state
    const [allUsers, setAllUsers] = useState([])
    const [originalAdjustDonationValue, setOriginalAdjustDonationValue] = useState(0)
    
    // UI state
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    const [sortDescriptor, setSortDescriptor] = useState({column: "created_at", direction: "descending"})
    const [filterValue, setFilterValue] = useState("")
    
    // New user form state
    const [username, setUsername] = useState('')
    const [usernameFocused, setUsernameFocused] = useState(false)
    const [isUsernameTaken, setIsUsernameTaken] = useState(false)
    const [isLoadingUsername, setIsLoadingUsername] = useState(false)

    // Focus handlers
    const onUsernameFocus = () => setUsernameFocused(true)
    const onUsernameBlur = () => setUsernameFocused(false)

    // Validation
    const isInvalidUsername = useMemo(() => 
        !username || username.trim().length < VALIDATION_RULES.MIN_USERNAME_LENGTH, [username])

    // Username verification
    const verifyUsernameIsNew = useCallback(async (uname) => {
        setIsLoadingUsername(true)
        const data = await getUserIdByUsername(uname)
        if (data?.user_id) {
            setIsUsernameTaken(true)
        }
        setIsLoadingUsername(false)
        return !data?.user_id
    }, [getUserIdByUsername])

    // Data fetching
    const fetchUsers = useCallback(async () => {
        try {
            const responseData = await getAllUsers()
            setAllUsers(responseData)
        } catch (error) {
            console.log(error)
        }
    }, [getAllUsers])

    const refreshUsers = useCallback(async () => {
        try {
            const responseData = await getAllUsers()
            setAllUsers(responseData)
        } catch (error) {
            console.log(error)
        }
    }, [getAllUsers])

    // Effects
    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    useEffect(() => {
        setIsUsernameTaken(false)
        if (!isInvalidUsername && !usernameFocused) {
            verifyUsernameIsNew(username);
        }
    }, [usernameFocused, isInvalidUsername, username, verifyUsernameIsNew])

    // Modal handlers
    const handleCloseModal = () => {
        setShowAddUserModal(false)
        setUsername('')
        setIsUsernameTaken(false)
    }
    const submitNewUser = async () => {
        const trimmedUsername = username.trim()
        const isNewUsername = await verifyUsernameIsNew(trimmedUsername)
        if (!isNewUsername) {
            setIsUsernameTaken(true)
            return
        }
        const data = await createUser(trimmedUsername)
        if (!data?.user_id) throw Error('User not created')
        refreshUsers()
        handleCloseModal()
    }



    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        const handleAdjustDonations = async (tab, value) => {    
            setAllUsers(prevUsers => prevUsers.map(t => 
                t.user_id === tab.user_id ? {...t, adjusted_donations: parseInt(value)} : t
            ));
        }

        const onAdjustDonationInputBlur = async (tab) => {
            if (tab.adjusted_donations === originalAdjustDonationValue) return
            const success = await updateUserDonations(tab.user_id, tab.adjusted_donations)
            if (!success) { 
                setAllUsers(prevUsers => prevUsers.map(t => 
                    t.user_id === tab.user_id ? {...t, adjusted_donations: originalAdjustDonationValue} : t
                )) 
            }
        }

        switch (columnKey) {
            case "phone_number":
                return (
                    <Link href={`tel:${user.phone_number}`}>{user.phone_number}</Link>
                )
            case "adjusted_donations":
                return (   
                    <Input
                        variant="faded"
                        type="number"
                        pattern="\d*"
                        inputMode="decimal"
                        min={0}
                        max={VALIDATION_RULES.MAX_DONATION}
                        maxLength={VALIDATION_RULES.MAX_INPUT_LENGTH}
                        value={user.adjusted_donations}
                        onFocus={() => setOriginalAdjustDonationValue(user.adjusted_donations)}
                        onBlur={() => onAdjustDonationInputBlur(user)}
                        onValueChange={(value) => handleAdjustDonations(user, value)}
                        startContent={<FontAwesomeIcon icon={faDollar} />}
                    />
                )
            case "created_at":
                return convertDate(user.created_at)
            case "updated_at":
                return convertDate(user.updated_at)
            default:
                return cellValue
        }
    }, [originalAdjustDonationValue, updateUserDonations])

    const filteredUsers = useMemo(() => {
        if (filterValue.trim().length === 0) return allUsers
        
        return allUsers.filter(user => 
            user.username.toLowerCase().includes(filterValue.trim().toLowerCase())
        )
    }, [allUsers, filterValue])

    const topContent = useMemo(() => {
        return (
          <div className="flex gap-4 bg-slate-100 rounded-xl px-3 py-2">
            <div className="flex gap-3 align-bottom">
              <Input
                isClearable
                variant="faded"
                className="w-full sm:max-w-[400px]"
                placeholder="Search by name..."
                startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                value={filterValue}
                onClear={() => setFilterValue("")}
                onValueChange={setFilterValue}
              />
            </div>
            <div className="flex justify-end flex-grow">
                   <Button isIconOnly size="lg" radius="full" variant="shadow" color="success"
                   onPress={() => setShowAddUserModal(true)}>
                        <FontAwesomeIcon className="text-2xl text-white" icon={faPlus} />
                    </Button>
                </div>
          </div>
        );
      }, [ filterValue ]);

    return (
        <>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />
                { (isUserApiLoading) && <Spinner color="success" className="fixed top-2/4 z-50 w-50" style={{left:'calc(50% - 20px)'}} size="lg" /> }
                <div>
                    <div className="rounded-lg shadow-md">
                        <Table topContent={topContent} topContentPlacement="outside" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}  
                                fullWidth isHeaderSticky 
                                classNames={{
                                    wrapper: "max-h-[600px]",
                                    tr: "border-b-1 last:border-b-0 border-slate-500"
                                }}
                                className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                {TABLE_COLUMNS.map(column => (
                                    <TableColumn 
                                        key={column.key} 
                                        scope="col" 
                                        className={`py-3 ${column.className}`}
                                    >
                                        {column.label}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody items={filteredUsers}>
                                {(item) => (
                                <TableRow key={item.username}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
            <Modal isOpen={showAddUserModal} onClose={handleCloseModal}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add User</ModalHeader>
                    <ModalBody>
                        <div>
                            <Input
                                className="pb-5"
                                classNames={{
                                    label: "text-xl group-data-[filled=true]:-translate-y-4",
                                    trigger: "min-h-unit-16",
                                    listboxWrapper: "max-h-[400px]",
                                    inputWrapper: "bg-white",
                                    errorMessage: "absolute italic bottom-2 left-4"
                                }}
                                maxLength={VALIDATION_RULES.MAX_USERNAME_LENGTH}
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
                                errorMessage={(isInvalidUsername && !usernameFocused) ? "Invalid username" : isUsernameTaken ? "This name is already taken" : false}
                            />
                            {!usernameFocused &&
                                <div className="absolute right-12 top-20 pt-1"> {
                                    ((isLoadingUsername && <Spinner color="success" />) ||
                                        (!isInvalidUsername && !isLoadingUsername && !isUsernameTaken && <FontAwesomeIcon className="text-emerald-600" icon={faCheck} />))
                                }
                                </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="bordered" radius="full" onPress={handleCloseModal}>
                        Close
                        </Button>
                        <Button color="primary" radius="full" onPress={submitNewUser}>
                        Create User <FontAwesomeIcon icon={faUser}/>
                        </Button>
                    </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default AdminUsers