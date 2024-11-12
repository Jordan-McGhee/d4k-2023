import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faRefresh } from '@fortawesome/free-solid-svg-icons'
import ErrorModal from "../components/UIElements/ErrorModal"
import convertDate from "../Conversions/convertDateTime";
import { Spinner, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalBody, ModalContent , ModalHeader, ModalFooter, Switch
} from "@nextui-org/react";
import { DrinkApi }  from "../api/drinkApi";

const Tab = () => {
    const [ drinks, setDrinks] = useState([])
    const [ showAddUserModal, setshowAddUserModal ] = useState(false)
    const { getDrinks, getDrinksAdmin, updateOutOfStock, isLoading, hasError, clearError } = DrinkApi()
    
    const refreshDrinks = async () => {
        try {
            const responseData = await getDrinksAdmin()
            setDrinks(responseData)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getDrinksCall = async () => {
            try {
                const responseData = await getDrinksAdmin()
                setDrinks(responseData)
                
            } catch (error) {
                console.log(error)
            }
        }
        getDrinksCall()
    }, [])

    const Switch86 = ({ drink, onSwitchFunction}) => {
        const [isOutOfStock, setIsOutOfStock] = useState(false)
        useEffect(() => {
                setIsOutOfStock(drink.out_of_stock)
        }, [ drink.out_of_stock ])

        const update = async (drink) => {
            let response = null
            try {
                response = await updateOutOfStock(drink.drink_id, isOutOfStock)
            } catch (error) {
                console.log(error)
            }
            if(!response?.newValue === null) return
            setIsOutOfStock(response.newValue)
            onSwitchFunction(drink, response.newValue)
        }
        return (
            <Switch className="w-100" size="sm" color="danger" isDisabled={isLoading} isSelected={isOutOfStock} onValueChange={() => update(drink)}
            thumbIcon={({ isSelected, className }) => isSelected ? (<FontAwesomeIcon className={className} icon={faX} />) : (<></>) }/>
            )
    }

    const renderCell = useCallback((drink, columnKey) => {
        const cellValue = drink[columnKey];

        const handleOutOfStockSwitch = (drink, value) => {
            setDrinks(a => a.map(o => o.drink_id === drink.drink_id ? {...o , out_of_stock: value } : o))
        }


        switch (columnKey) {
            case "drink":
                return drink.name 
            case "cost":
                return `$${drink.cost}`
            case "type":
                return drink.type
            case "out_of_stock":
                return ( <Switch86 drink={drink} onSwitchFunction={handleOutOfStockSwitch}/> )
            default:
                return cellValue
            }
    }, [drinks])


    const topContent = useMemo(() => {
        return (
            <div className="flex gap-4 bg-slate-100 rounded-xl px-3 py-2">
                <div className="flex justify-end flex-grow">
                   <Button isIconOnly size="lg" radius="full" variant="ghost" color="default"
                   onPress={refreshDrinks}>
                        <FontAwesomeIcon className="text-2xl text-blue-600" icon={faRefresh} />
                    </Button>
                </div>
            </div>       
        )
      }, [ ])

    return (
        <>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />
                { (isLoading) && <Spinner color="success" className="fixed top-2/4 z-50 w-50" style={{left:'calc(50% - 20px)'}} size="lg" /> }
                <div>
                    <div className="rounded-lg shadow-md">
                        <Table topContent={topContent} topContentPlacement="outside"  
                                fullWidth isHeaderSticky 
                                classNames={{
                                    tr: "border-b-1 last:border-b-0 border-slate-500"
                                }}
                                className="w-full text-md text-left text-gray-500 dark:text-gray-400 rounded-lg">
                            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <TableColumn key="drink" scope="col" className="py-3 w-2/12">Drink</TableColumn>
                                <TableColumn key="cost" scope="col" className="py-3 w-1/12">Cost</TableColumn>
                                <TableColumn key="type" scope="col" className="py-3 w-1/12">Type</TableColumn>
                                <TableColumn key="out_of_stock" scope="col" className="py-3 w-1/12">86'd</TableColumn>

                            </TableHeader>
                            <TableBody items={drinks}>
                                {(item) => (
                                <TableRow key={item.drink_id}>
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

export default Tab