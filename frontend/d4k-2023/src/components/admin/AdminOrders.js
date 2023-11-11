import React, { useState, useEffect, useCallback, useMemo } from "react";
import AdminTable from "./orders/AdminTable";
import AdminTableBody from "./orders/AdminTableBody";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../UIElements/ErrorModal";
import convertDate from "../../Conversions/convertDateTime";

import {Switch, Spinner, Input, Button, ButtonGroup, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
const AdminOrders = props => {
    const [ incompleteOrders, setIncompleteOrders ] = useState([])
    const [ completedOrders, setCompletedOrders ] = useState([])
    const { isLoading, hasError, sendRequest, clearError } = useFetch()
    const [ allOrders, setAllOrders] = useState([])
    const [sortDescriptor, setSortDescriptor] = useState({column: "created_at", direction: "descending" });
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const getOrders = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/admin`, 'GET', { Accept: 'application/json' })
                setIncompleteOrders(responseData.incompleteOrders)
                setCompletedOrders(responseData.completedOrders)
                setAllOrders(responseData.incompleteOrders.concat(responseData.completedOrders))
            } catch(err) {
                console.log(err)
            }
        }
        localStorage.setItem('showingOrders', 'true')
        getOrders()
    }, [ sendRequest ])



    const SwitchIsPaid = ({order}) => {
        const [isPaid, setIsPaid] = useState(false)
        useEffect(() => {
            setIsPaid(order.is_paid)
          }, [ order ])

        const updatePaid = async (order) => {
            let response = null
            try {
                response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${order.order_id}/updatePaid`, 
                "PATCH", {'Content-Type': 'application/json'},JSON.stringify({isPaid}))
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
                classNames={{
                    base: "w-50"}}>
                    Paid
            </Switch>  
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
                response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${order.order_id}/updateCompleted`, "PATCH",
                    { 'Content-Type': 'application/json' }, JSON.stringify({isCompleted}))
            } catch (error) {
                console.log(error)
            }
            if(!response?.newValue === null) return
            setIsCompleted(response.newValue)
        }
        return (
            <Switch className="w-100" size="lg" color="success" isDisabled={isLoading} isSelected={isCompleted} onValueChange={() => updateCompleted(order)}>
                Complete
            </Switch>  
        )
    }

    const ButtonGroupDelete = ({order, onDeleteFunction}) => {
        const [showConfirmDelete, setShowConfirmDelete] = useState(false)
   
        const deleteOrder = async (order) => {
            try {
                await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${order.order_id}`, "DELETE")
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
                    <Button size="md" isIconOnly color="danger" value={showConfirmDelete} onPress={() =>  deleteOrder(order)}>
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
        switch (columnKey) {
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
    }, [])

    const filteredOrders = useMemo(() =>{
        if (filterValue.trim().length === 0) return allOrders
        return [...allOrders].filter(o => o.username.toLowerCase().includes(filterValue.trim().toLowerCase())
        )}, [allOrders, filterValue])

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
        <React.Fragment>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />

                {isLoading && <Spinner color="success" className="fixed top-2/4 z-50 w-50" style={{left:'calc(50% - 20px)'}} size="lg" />}

                {/* IN PROGRESS DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">WORKING ON IT</p>
                    <div className="rounded-lg shadow-md">
                        <Table topContent={topContent} sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}  
                        fullWidth isHeaderSticky 
                        classNames={{
                            wrapper: "max-h-[600px]",
                          }}
                        className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <TableColumn key="username" scope="col" className="px-6 py-3 w-3/12">NAME</TableColumn>
                                <TableColumn key="drink" scope="col" className="px-6 py-3 w-2/12">DRINK</TableColumn>
                                <TableColumn key="quantity" scope="col" className="px-6 py-3 w-1/12">Quantity</TableColumn>
                                <TableColumn allowsSorting key="created_at" scope="col" className="px-6 py-3 w-1/12">TIME</TableColumn>
                                <TableColumn align="center" key="is_paid" scope="col" className="px-6 py-3 text-center w-1/12">PAID</TableColumn>
                                <TableColumn align="center" key="is_completed" scope="col" className="px-6 py-3 text-center w-1/12">STATUS</TableColumn>
                                <TableColumn align="center" key="delete" scope="col" className="px-6 py-3 text-center w-1/12">DELETE</TableColumn>
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