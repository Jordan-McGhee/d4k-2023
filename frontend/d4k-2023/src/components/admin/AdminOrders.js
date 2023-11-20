import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminTable from "./orders/AdminTable";
import AdminTableBody from "./orders/AdminTableBody";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass, faTrash, faX, faChevronDown, faDollar, faSlash, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../UIElements/ErrorModal";
import convertDate from "../../Conversions/convertDateTime";
import { OrderApi } from "../../api/orderApi";
import {Switch, Spinner, Input, Button, ButtonGroup, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
const AdminOrders = props => {
    const [ incompleteOrders, setIncompleteOrders ] = useState([])
    const [ completedOrders, setCompletedOrders ] = useState([])

    const [originalTipValue, setOriginalTipValue] = useState(0)

    const [ allOrders, setAllOrders] = useState([])
    const [sortDescriptor, setSortDescriptor] = useState({column: "created_at", direction: "descending" })
    const [filterValue, setFilterValue] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    
    const statusOptions = ["paid", "complete"]

    const { getOrdersAdmin, updateOrderTip, updateOrderCompleted, updateOrderPaid, deleteOrder, isLoading, hasError, clearError } = OrderApi()
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await getOrdersAdmin()
                setAllOrders(response)
            } catch(err) {
                console.log(err)
            }
        }
        localStorage.setItem('showingOrders', 'true')
        getOrders()
    }, [ ])

    const getOrders = async () => {
        try {
            const response = await getOrdersAdmin()
            setAllOrders(response)
        } catch(err) {
            console.log(err)
        }
    }

    const SwitchIsPaid = ({order}) => {
        const [isPaid, setIsPaid] = useState(false)
        useEffect(() => {
            setIsPaid(order.is_paid)
          }, [ order ])

        const updatePaid = async (order) => {
            let response = null
            try {
                response = await updateOrderPaid(order.order_id, isPaid)
            } catch (error) {
                console.log(error)
            }
            if(!response?.newValue === null) return
            setIsPaid(response.newValue)
            console.log(`${order.order_id} isPaid: ${response.newValue}`)
        }
        return (
            <Switch className="w-100" size="lg" color="success" 
                isDisabled={isLoading} isSelected={isPaid} onValueChange={() => updatePaid(order)}
                classNames={{base: "w-50"}} 
                thumbIcon={ <FontAwesomeIcon icon={faDollar} /> }
            />
        )
    }


    const SwitchIsCompleted = ({order}) => {
        const [isCompleted, setIsCompleted] = useState(false)
        useEffect(() => {
            setIsCompleted(order.is_completed)
        }, [ order ])

        const updateCompleted = async (order) => {
            let response = null
            try {
                response = await updateOrderCompleted(order.order_id, isCompleted)
            } catch (error) {
                console.log(error)
            }
            if(!response?.newValue === null) return
            setIsCompleted(response.newValue)
        }
        return (
            <Switch className="w-100" size="lg" color="warning" isDisabled={isLoading} isSelected={isCompleted} onValueChange={() => updateCompleted(order)}
            thumbIcon={({ isSelected, className }) => isSelected ? (<FontAwesomeIcon className={className} icon={faCheck} />) : (<></>) }/>
            )
    }

    const ButtonGroupDelete = ({order, onDeleteFunction}) => {
        const [showConfirmDelete, setShowConfirmDelete] = useState(false)
   
        const deleteOrderPress = async (order) => {
            try {
                await deleteOrder(order.order_id)
            } catch (error) {
                console.log(error)
                return
            }
            onDeleteFunction(order.order_id)
        }
        return (
            <div>
                {!showConfirmDelete &&
                <Button isIconOnly radius="sm" variant="bordered" color="danger" value={showConfirmDelete} onPress={() => setShowConfirmDelete(true)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Button>  
                }
                {showConfirmDelete &&
                <ButtonGroup>
                    <Button size="md" isIconOnly color="danger" value={showConfirmDelete} onPress={() =>  deleteOrderPress(order)}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </Button>
                    <Button  size="md" isIconOnly color="default" value={showConfirmDelete} onPress={() => setShowConfirmDelete(false)}>
                    <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                    </Button>  
                </ButtonGroup>
                }
            </div>
        )
    }

    const renderCell = useCallback((order, columnKey) => {
        const cellValue = order[columnKey];

        const removeRow = (orderId) => {
            setAllOrders((state) => state.filter(o => o.order_id !== orderId))
        }
        const handleAdjustTip = async (order, value) => {    
            setAllOrders(allOrders.map(o => o.order_id === order.order_id ? {...o ,tip_amount: parseInt(value) } : o));
            console.log(order)
            console.log(value)
        }

        const onAdjustDonationInputBlur = async (order) => {
            if(order.tip_amount === originalTipValue) return

            let success = await updateOrderTip(order.order_id, order.tip_amount )
            if(!success){ setAllOrders(allOrders.map(o => o.order_id === order.order_id ? {...o , tip_amount: originalTipValue } : o)) }
        }
        switch (columnKey) {
            case "tip_amount":
                return (   <Input
                    variant="faded"
                    type="number"
                    pattern="\d*"
                    inputMode="decimal"
                    min={0}
                    max={1000}
                    maxLength={4}
                    value={order.tip_amount}
                    onFocus={() => setOriginalTipValue(order.tip_amount)}
                    onBlur={() => onAdjustDonationInputBlur(order)}
                    onValueChange={(value) => handleAdjustTip(order, value)}
                    startContent={ <FontAwesomeIcon icon={faDollar} /> }
                  />)
            case "is_paid":
                return ( <SwitchIsPaid order={order}/> )
            case "is_completed":
                return ( <SwitchIsCompleted order={order}/> )
            case "created_at":
                return convertDate(order.created_at)
            case "delete":
                return ( <ButtonGroupDelete onDeleteFunction={removeRow} order={order}/> )
            default:
                return cellValue;
            }
    }, [allOrders, originalTipValue])

    const filteredOrders = useMemo(() => {
        let filterOrders = [...allOrders]
        if (statusFilter !== "all") {
            filterOrders = filterOrders.filter((order) => {
                let show = true
                let filters = Array.from(statusFilter)
                if(!filters.includes('paid')) show = !order.is_paid
                if(!filters.includes('complete')) show = !order.is_completed
                return show
            });
        }

        if (filterValue.trim().length === 0) return filterOrders
        return [...allOrders].filter(o => o.username.toLowerCase().includes(filterValue.trim().toLowerCase())
        )}, [allOrders, filterValue, statusFilter])

    const sortedOrders = useMemo(() => {
        return [...filteredOrders].sort((a, b) => {
          const first = a[sortDescriptor.column];
          const second = b[sortDescriptor.column];
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, filteredOrders]);



      const topContent = useMemo(() => {
        return (
            <div className="flex gap-4">
                <div className="flex justify-between gap-3 align-top ">
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
                <div className="flex gap-3 align-bottom">
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<FontAwesomeIcon className="text-sm" icon={faChevronDown} />} variant="flat">
                            Status
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Table Columns"
                            closeOnSelect={false}
                            selectedKeys={statusFilter}
                            selectionMode="multiple"
                            onSelectionChange={setStatusFilter}
                        >
                            {statusOptions.map((status) => (
                            <DropdownItem key={status} className="capitalize">
                                {status}
                            </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex justify-end flex-grow">
                   <Button isIconOnly size="lg" radius="full" variant="ghost" color="default"
                   onPress={getOrders}>
                        <FontAwesomeIcon className="text-2xl text-slate-600" icon={faRefresh} />
                    </Button>
                </div>
            </div>       
        );
      }, [ filterValue, statusOptions, statusFilter ]);

    return (
        <React.Fragment>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />

                {isLoading && <Spinner 
                                color="success"
                                className="fixed top-2/4"
                                style={{left:'calc(50% - 40px)', zIndex:100}}
                                classNames={{
                                    wrapper: "w-20 h-20",
                                    circle1: "border-8",
                                    circle2: "border-8"
                                }} /> }


                <div>
                    <div className="rounded-lg shadow-md">
                        <Table topContent={topContent} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}  
                        fullWidth isHeaderSticky 
                        classNames={{
                            wrapper: "max-h-[600px]",
                            tr: "border-b-1 border-slate-500"
                          }}
                        className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <TableColumn key="username" scope="col" className="w-3/12">Name</TableColumn>
                                <TableColumn key="drink" scope="col" className=" w-2/12">Drink</TableColumn>
                                <TableColumn key="quantity" scope="col" className="w-1/12">Quantity</TableColumn>
                                <TableColumn key="total" scope="col" className="w-1/12">Cost</TableColumn>
                                <TableColumn key="tip_amount" scope="col" className="w-1/12">Tip</TableColumn>
                                <TableColumn allowsSorting key="created_at" scope="col" className="w-1/12">Time</TableColumn>
                                <TableColumn align="center" key="is_paid" scope="col" className="text-center w-1/12">Paid</TableColumn>
                                <TableColumn align="center" key="is_completed" scope="col" className=" text-center w-1/12">Status</TableColumn>
                                <TableColumn align="center" key="delete" scope="col" className="text-center w-1/12"></TableColumn>
                            </TableHeader>
                            <TableBody items={sortedOrders}>
                                {(item) => (
                                <TableRow key={item.order_id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* completed DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">Completed</p>
                    <AdminTable data = { completedOrders }/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminOrders