import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCheck, faMagnifyingGlass, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import TabTable from "../components/tab/TabTable"
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"
import {Switch, Spinner, Input, Button, ButtonGroup, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalBody, ModalContent , ModalHeader, ModalFooter,
} from "@nextui-org/react";
import { OrderApi } from "../api/orderApi";
import { UserApi }  from "../api/userApi";

const Tab = () => {
    const [ allTabs, setAllTabs] = useState([])
    const [ paidTabs, setPaidTabs ] = useState([])
    const [ selectedTab, setSelectedTab ] = useState({})
    const [ showAdjustDonationsModal, setShowAdjustDonationsModal ] = useState(false)
    const [sortDescriptor, setSortDescriptor] = useState({column: "total_unpaid", direction: "descending" });
    const [filterValue, setFilterValue] = useState("");
    const { getOrdersAsTabs, isLoading, hasError, clearError } = OrderApi()
    const { closeTab, isUserApiLoading } = UserApi()
    useEffect(() => {
        const getTabs = async () => {
            try {
                const responseData = await getOrdersAsTabs()
                setAllTabs(responseData)
                setPaidTabs(responseData)
            } catch (error) {
                console.log(error)
            }
        }
        getTabs()
    }, [ ])

    const refreshTabs = async () => {
        try {
            const responseData = await getOrdersAsTabs()
            setAllTabs(responseData)
            setPaidTabs(responseData)
        } catch (error) {
            console.log(error)
        }
    }
    const ButtonCloseTab = ({userTab, onCloseTabFunction}) => {
        const [showConfirmCloseTab, setShowConfirmCloseTab] = useState(false)
   
        const closeUserTab = async (tab) => {
            try {
                await closeTab(tab.user_id)
            } catch (error) {
                console.log(error)
                return
            }
            onCloseTabFunction()
            setShowConfirmCloseTab(false)
        }
        return (
            <div>
                {!showConfirmCloseTab &&
                <Button isDisabled={userTab.amount_unpaid === 0} isIconOnly radius="sm" variant="bordered" color="danger" value={showConfirmCloseTab} onPress={() => setShowConfirmCloseTab(true)}>
                    <FontAwesomeIcon icon={faCashRegister}/>
                </Button>  
                }
                {showConfirmCloseTab &&
                <ButtonGroup>
                    <Button size="md" isIconOnly color="danger" value={showConfirmCloseTab} onPress={() =>  closeUserTab(userTab)}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </Button>
                    <Button  size="md" isIconOnly color="default" value={showConfirmCloseTab} onPress={() => setShowConfirmCloseTab(false)}>
                    <FontAwesomeIcon icon={faX}/>
                    </Button>  
                </ButtonGroup>
                }
            </div>
        )
    }

    const handleAdjustDonationsPress = (tab) => {
        setSelectedTab(tab)
        setShowAdjustDonationsModal(true)
    }

    const renderCell = useCallback((tab, columnKey) => {
        const cellValue = tab[columnKey];

        switch (columnKey) {
            case "drink_cost_total":
            case "tab_total":
            case "tips_total":
            case "amount_paid":
                return `$${cellValue}`
            case "adjusted_donations":
                return ( <Button variant="bordered" onPress={() => handleAdjustDonationsPress(tab)} >${tab.adjusted_donations}</Button>)
            case "amount_unpaid":
                return (<div className="text-red-500">${cellValue}</div>)
            case "close_tab":
                return ( <ButtonCloseTab userTab={tab} onCloseTabFunction={refreshTabs}/>)
            default:
                return cellValue
            }
    }, [])

    const filteredTabs = useMemo(() =>{
        if (filterValue.trim().length === 0) return allTabs
        return [...allTabs].filter(t => t.username.toLowerCase().includes(filterValue.trim().toLowerCase())
        )}, [allTabs, filterValue])

    const topContent = useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
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
          </div>
        );
      }, [ filterValue ]);

    return (
        <>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />
                { isLoading && <LoadingSpinner /> }
                {/* UNPAID TABS */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">UNPAID TABS</p>
                    <div className="rounded-lg shadow-md">
                        <Table topContent={topContent} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}  
                                fullWidth isHeaderSticky 
                                classNames={{
                                    wrapper: "max-h-[600px]",
                                    tr: "border-b-1 border-slate-500"
                                }}
                                className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <TableColumn key="username" scope="col" className="py-3 w-3/12">NAME</TableColumn>
                                <TableColumn key="adjusted_donations" scope="col" className="py-3 w-1/12">Donation Adjust</TableColumn>
                                <TableColumn key="quantity" scope="col" className="py-3 w-1/12">Quantity</TableColumn>
                                <TableColumn key="drink_cost_total" scope="col" className="py-3 w-1/12">Drink $</TableColumn>
                                <TableColumn key="tab_total" scope="col" className="py-3 w-1/12">Tab Total</TableColumn>
                                <TableColumn key="tips_total" scope="col" className="py-3 w-1/12">Order Tips</TableColumn>
                                <TableColumn key="amount_paid" scope="col" className="py-3 w-1/12">Total Paid</TableColumn>
                                <TableColumn key="amount_unpaid" scope="col" className="py-3 w-1/12">Balance Due</TableColumn>
                                <TableColumn key="close_tab" scope="col" className="py-3 w-1/12">Close Tab</TableColumn>
                            </TableHeader>
                            <TableBody items={filteredTabs}>
                                {(item) => (
                                <TableRow key={item.username}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* PAID TABS */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">PAID TABS</p>
                    <TabTable data = { paidTabs } />
                </div>

            </div>
            <Modal isOpen={showAdjustDonationsModal} onClose={() => setShowAdjustDonationsModal(false)}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Adjust Donation</ModalHeader>
                    <ModalBody>
                       {selectedTab.username}
                       
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => setShowAdjustDonationsModal(false)}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
                        </Button>
                    </ModalFooter>
                    </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}

export default Tab