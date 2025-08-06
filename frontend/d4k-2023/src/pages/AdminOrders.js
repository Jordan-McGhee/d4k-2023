import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faCheck, faMagnifyingGlass, faTrash, faX, faChevronDown, faDollar, faRefresh 
} from '@fortawesome/free-solid-svg-icons'
import {
    Switch, Spinner, Input, Button, ButtonGroup, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@nextui-org/react";

import ErrorModal from "../components/UIElements/ErrorModal";
import convertDate from "../Conversions/convertDateTime";
import { OrderApi } from "../api/orderApi";
import { BartenderApi } from "../api/bartenderApi"

// Constants
const VALIDATION_RULES = {
    MAX_TIP: 1000,
    MAX_INPUT_LENGTH: 4
};

const STATUS_OPTIONS = ["paid", "complete"];
const ROW_LIMIT_OPTIONS = [25, 50, 100, 500];

const TABLE_COLUMNS = [
    { key: "username", label: "Name", className: "w-2/12" },
    { key: "drink", label: "Drink", className: "w-1/12" },
    { key: "quantity", label: "Amt", className: "w-1/12" },
    { key: "total", label: "Cost", className: "w-1/12" },
    { key: "tip_amount", label: "Tip", className: "w-1/12" },
    { key: "total_with_tip", label: "Total", className: "w-1/12" },
    { key: "created_at", label: "Time", className: "w-1/12", allowsSorting: true },
    { key: "bartender", label: "Bartender", className: "w-1/12", align: "center" },
    { key: "is_paid", label: "Paid", className: "w-1/12", align: "center" },
    { key: "is_completed", label: "Done", className: "w-1/12", align: "center" },
    { key: "delete", label: "", className: "w-1/12", align: "center" }
];

const AdminOrders = () => {
    // API hooks
    const { getBartenders } = BartenderApi()
    const { 
        getOrdersAdmin, 
        updateOrderTip, 
        updateOrderCompleted, 
        updateOrderPaid, 
        updateOrderBartender, 
        deleteOrder, 
        isLoading, 
        hasError, 
        clearError 
    } = OrderApi()

    // Data state
    const [allOrders, setAllOrders] = useState([])
    const [bartenders, setBartenders] = useState([])
    const [originalTipValue, setOriginalTipValue] = useState(0)
    
    // UI state
    const [sortDescriptor, setSortDescriptor] = useState({column: "created_at", direction: "descending"})
    const [filterValue, setFilterValue] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [rowLimitKeys, setRowLimitKeys] = useState(new Set([50]))
    
    // Computed values
    const selectedRowLimit = useMemo(() => 
        Array.from(rowLimitKeys).join(", ").replaceAll("_", " "), [rowLimitKeys])

    // Data fetching functions
    const fetchOrders = useCallback(async (limit) => {
        try {
            const response = await getOrdersAdmin(limit)
            setAllOrders(response)
        } catch (err) {
            console.log(err)
        }
    }, [getOrdersAdmin])

    const fetchBartenders = useCallback(async () => {
        try {
            const response = await getBartenders()
            setBartenders(response)
        } catch (err) {
            console.log(err)
        }
    }, [getBartenders])

    const refreshOrders = useCallback(async () => {
        try {
            const response = await getOrdersAdmin(selectedRowLimit)
            setAllOrders(response)
        } catch (err) {
            console.log(err)
        }
    }, [getOrdersAdmin, selectedRowLimit])

    // Effects
    useEffect(() => {
        fetchOrders(selectedRowLimit)
    }, [fetchOrders, selectedRowLimit])

    useEffect(() => {
        fetchOrders(selectedRowLimit)
    }, [fetchOrders, rowLimitKeys, selectedRowLimit])

    useEffect(() => {
        fetchBartenders()
    }, [fetchBartenders])


    // Switch Components
    const SwitchIsPaid = ({order, onSwitchFunction}) => {
        const [isPaid, setIsPaid] = useState(order.is_paid)
        
        useEffect(() => {
            setIsPaid(order.is_paid)
        }, [order.is_paid])
          
        const updatePaid = async (order) => {
            let response = null
            try {
                response = await updateOrderPaid(order.order_id, isPaid)
            } catch (error) {
                console.log(error)
            }
            if (response?.newValue === null) return
            setIsPaid(response.newValue)
            onSwitchFunction(order, response.newValue)
            console.log(`${order.order_id} isPaid: ${response.newValue}`)
        }

        return (
            <Switch 
                className="w-100" 
                size="sm" 
                color="success" 
                isDisabled={isLoading} 
                isSelected={isPaid} 
                onValueChange={() => updatePaid(order)}
                classNames={{base: "w-50"}} 
                thumbIcon={<FontAwesomeIcon icon={faDollar} />}
            />
        )
    }

    const SwitchIsCompleted = ({order, onSwitchFunction}) => {
        const [isCompleted, setIsCompleted] = useState(order.is_completed)
        
        useEffect(() => {
            setIsCompleted(order.is_completed)
        }, [order.is_completed])

        const updateCompleted = async (order) => {
            let response = null
            try {
                response = await updateOrderCompleted(order.order_id, isCompleted)
            } catch (error) {
                console.log(error)
            }
            if (response?.newValue === null) return
            setIsCompleted(response.newValue)
            onSwitchFunction(order, response.newValue)
        }
        
        return (
            <Switch 
                className="w-100" 
                size="sm" 
                color="warning" 
                isDisabled={isLoading} 
                isSelected={isCompleted} 
                onValueChange={() => updateCompleted(order)}
                thumbIcon={({ isSelected, className }) => 
                    isSelected ? (<FontAwesomeIcon className={className} icon={faCheck} />) : (<></>)
                }
            />
        )
    }

    // Dropdown Components  
    const DropdownBartenders = ({order, onUpdateFunction}) => {
        const [selectedBartenderKey, setSelectedBartenderKey] = useState(new Set([order.bartender_id]))
        const [selectedBartenderId, setSelectedBartenderId] = useState(order.bartender_id)
        
        const selectedBartenderInitials = useMemo(() => 
            bartenders?.find(b => b.id === selectedBartenderId)?.initials, 
            [selectedBartenderId]
        )

        useEffect(() => {
            setSelectedBartenderKey(new Set([order.bartender_id]))
            setSelectedBartenderId(order.bartender_id)
        }, [order.bartender_id])

        const updateBartender = async (key, order) => {
            let response = null
            try {
                const [bartenderId] = key
                response = await updateOrderBartender(order.order_id, bartenderId)
            } catch (error) {
                console.log(error)
            }
            if (response?.bartender_id === null) return
            const newBartenderId = response.bartender_id
            setSelectedBartenderKey(new Set([newBartenderId]))
            setSelectedBartenderId(newBartenderId)
            onUpdateFunction(order, newBartenderId)
        }
        
        return (
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                        size="sm" 
                        endContent={
                            <FontAwesomeIcon 
                                className={"text-sm " + (selectedBartenderId !== null ? "hidden" : "")} 
                                icon={faChevronDown} 
                            />
                        } 
                        variant="flat"
                    >
                        {selectedBartenderInitials}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Bartender Selection"
                    selectedKeys={selectedBartenderKey}
                    selectionMode="single"
                    onSelectionChange={(key) => updateBartender(key, order)}
                >
                    {bartenders.map((b) => (
                        <DropdownItem key={b.id} className="capitalize">
                            {b.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        )
    }

    const ButtonGroupDelete = ({order, onDeleteFunction}) => {
        const [showConfirmDelete, setShowConfirmDelete] = useState(false)
   
        const deleteOrderPress = async (order) => {
            try {
                await deleteOrder(order.order_id)
                onDeleteFunction(order.order_id)
            } catch (error) {
                console.log(error)
            }
        }
        
        return (
            <div>
                {!showConfirmDelete && (
                    <Button 
                        isIconOnly 
                        size="sm" 
                        radius="sm" 
                        variant="bordered" 
                        color="danger" 
                        onPress={() => setShowConfirmDelete(true)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>  
                )}
                {showConfirmDelete && (
                    <ButtonGroup>
                        <Button 
                            size="md" 
                            isIconOnly 
                            color="danger" 
                            onPress={() => deleteOrderPress(order)}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button  
                            size="md" 
                            isIconOnly 
                            color="default" 
                            onPress={() => setShowConfirmDelete(false)}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </Button>  
                    </ButtonGroup>
                )}
            </div>
        )
    }

    // Table render function
    const renderCell = useCallback((order, columnKey) => {
        const cellValue = order[columnKey];

        const removeRow = (orderId) => {
            setAllOrders((prevOrders) => prevOrders.filter(o => o.order_id !== orderId))
        }
        
        const handleAdjustTip = (order, value) => {
            setAllOrders(prevOrders => prevOrders.map(o => 
                o.order_id === order.order_id ? {...o, tip_amount: parseInt(value)} : o
            ))
        }

        const handleUpdateBartender = (order, value) => {
            setAllOrders(prevOrders => prevOrders.map(o => 
                o.order_id === order.order_id ? {...o, bartender_id: value} : o
            ))
        }

        const handleAdjustPaid = (order, value) => {
            setAllOrders(prevOrders => prevOrders.map(o => 
                o.order_id === order.order_id ? {...o, is_paid: value} : o
            ))
        }
        
        const handleAdjustCompleted = (order, value) => {
            setAllOrders(prevOrders => prevOrders.map(o => 
                o.order_id === order.order_id ? {...o, is_completed: value} : o
            ))
        }

        const onAdjustDonationInputBlur = async (order) => {
            if (order.tip_amount === originalTipValue) return
            const success = await updateOrderTip(order.order_id, order.tip_amount)
            if (!success) { 
                setAllOrders(prevOrders => prevOrders.map(o => 
                    o.order_id === order.order_id ? {...o, tip_amount: originalTipValue} : o
                )) 
            }
        }

        switch (columnKey) {
            case "tip_amount":
                return (   
                    <Input
                        variant="faded"
                        type="number"
                        pattern="\d*"
                        inputMode="decimal"
                        min={0}
                        max={VALIDATION_RULES.MAX_TIP}
                        maxLength={VALIDATION_RULES.MAX_INPUT_LENGTH}
                        value={order.tip_amount}
                        onFocus={() => setOriginalTipValue(order.tip_amount)}
                        onBlur={() => onAdjustDonationInputBlur(order)}
                        onValueChange={(value) => handleAdjustTip(order, value)}
                        startContent={<FontAwesomeIcon icon={faDollar} />}
                    />
                )
            case "drink":
                return (
                    <div>
                        <div>{cellValue}</div>
                        <div className="text-slate-500 italic">{order.comments}</div>
                    </div>
                )
            case "bartender":
                return (<DropdownBartenders order={order} onUpdateFunction={handleUpdateBartender}/>)
            case "is_paid":
                return (<SwitchIsPaid order={order} onSwitchFunction={handleAdjustPaid}/>)
            case "is_completed":
                return (<SwitchIsCompleted order={order} onSwitchFunction={handleAdjustCompleted}/>)
            case "total": 
                return (<div>${order.total}</div>)
            case "total_with_tip":
                return (<div className="font-bold text-green-700">${order.total + order.tip_amount}</div>)
            case "created_at":
                return convertDate(order.created_at)
            case "delete":
                return (<ButtonGroupDelete onDeleteFunction={removeRow} order={order}/>)
            default:
                return cellValue;
        }
    }, [originalTipValue, updateOrderTip])

    // Filtering and sorting
    const filteredOrders = useMemo(() => {
        let filterOrders = [...allOrders]
        
        // Status filtering
        if (statusFilter !== "all") {
            filterOrders = filterOrders.filter((order) => {
                const filters = Array.from(statusFilter)
                let show = true
                if (!filters.includes('paid')) show = show && !order.is_paid
                if (!filters.includes('complete')) show = show && !order.is_completed
                return show
            });
        }

        // Name filtering
        if (filterValue.trim().length > 0) {
            filterOrders = filterOrders.filter(order => 
                order.username.toLowerCase().includes(filterValue.trim().toLowerCase())
            )
        }

        return filterOrders
    }, [allOrders, filterValue, statusFilter])

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
            <div className="flex gap-4 bg-slate-100 rounded-xl px-3 py-2">
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
                            {STATUS_OPTIONS.map((status) => (
                            <DropdownItem key={status} className="capitalize">
                                {status}
                            </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button endContent={<FontAwesomeIcon className="text-sm" icon={faChevronDown} />} variant="flat">
                            {rowLimitKeys} Limit
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Limit"
                            closeOnSelect={false}
                            selectedKeys={rowLimitKeys}
                            selectionMode="single"
                            onSelectionChange={setRowLimitKeys}
                        >
                            {ROW_LIMIT_OPTIONS.map((l) => (
                            <DropdownItem key={l} className="capitalize">
                                {l}
                            </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex justify-end flex-grow">
                   <Button isIconOnly size="lg" radius="full" variant="ghost" color="default"
                   onPress={refreshOrders}>
                        <FontAwesomeIcon className="text-2xl text-blue-600" icon={faRefresh} />
                    </Button>
                </div>
            </div>       
        )
      }, [filterValue, statusFilter, rowLimitKeys, refreshOrders])

    return (
        <>
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
                        <Table topContent={topContent} topContentPlacement="outside" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}  
                        fullWidth isHeaderSticky 
                        classNames={{
                            wrapper: "max-h-[700px]",
                            tr: "border-b-1 border-slate-400"
                          }}
                        className="w-full text-md text-left rounded-lg">
                            <TableHeader className="text-xs bg-gray-50">
                                {TABLE_COLUMNS.map(column => (
                                    <TableColumn 
                                        key={column.key}
                                        scope="col" 
                                        className={column.className}
                                        align={column.align}
                                        allowsSorting={column.allowsSorting}
                                    >
                                        {column.label}
                                    </TableColumn>
                                ))}
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
            </div>
        </>
    )
}

export default AdminOrders