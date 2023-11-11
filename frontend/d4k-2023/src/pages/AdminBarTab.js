import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import TabTable from "../components/tab/TabTable"
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"
import {Switch, Spinner, Input, Button, ButtonGroup, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import { useFetch } from "../hooks/useFetch"

const Tab = () => {
    const [ allTabs, setAllTabs] = useState([])
    const [ paidTabs, setPaidTabs ] = useState([])
    const [ unpaidTabs, setUnpaidTabs ] = useState([])
    const { isLoading, hasError, clearError, sendRequest } = useFetch()
    const [sortDescriptor, setSortDescriptor] = useState({column: "total_unpaid", direction: "descending" });
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        const getTabs = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/grouped`, 
                    'GET',{Accept: 'application/json'})
                setPaidTabs(responseData.paid)
                setUnpaidTabs(responseData.unpaid)
                setAllTabs(responseData.paid.concat(responseData.unpaid))
            } catch (error) {
                console.log(error)
            }
        }
        getTabs()
    }, [ sendRequest ])

    const renderCell = useCallback((order, columnKey) => {
        const cellValue = order[columnKey];

        switch (columnKey) {
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
        <React.Fragment>
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
                          }}
                        className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                    <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <TableColumn key="username" scope="col" className="px-6 py-3 w-3/12">NAME</TableColumn>
                        <TableColumn key="drinks_ordered" scope="col" className="px-6 py-3 text-center w-1/12">Quantity</TableColumn>
                        <TableColumn key="orders_total" scope="col" className="px-6 py-3 w-2/12">Orders Total</TableColumn>
                        <TableColumn key="orders_total_unpaid" scope="col" className="px-6 py-3 w-1/12">Orders Unpaid</TableColumn>
                        <TableColumn key="donations_total" scope="col" className="px-6 py-3 w-1/12">Total Donations</TableColumn>
                        <TableColumn key="donations_total_unpaid" scope="col" className="px-6 py-3 text-center w-1/12">Unpaid Donations</TableColumn>
                        <TableColumn align="center" key="delete" scope="col" className="px-6 py-3 text-center w-1/12">DELETE</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredTabs}>
                        {(item) => (
                        <TableRow key={item.username}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
        </div>            </div>

            {/* PAID TABS */}
            <div>
                <p className="my-5 text-4xl font-bold uppercase text-white">PAID TABS</p>
                <TabTable data = { paidTabs } />
            </div>

            </div>
        </React.Fragment>
    )
}

export default Tab