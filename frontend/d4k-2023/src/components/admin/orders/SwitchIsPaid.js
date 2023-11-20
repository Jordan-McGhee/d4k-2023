import React, { useState, useEffect, useCallback, memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass, faTrash, faX, faChevronDown, faDollar, faSlash, faRefresh } from '@fortawesome/free-solid-svg-icons'

import { OrderApi } from "../../../api/orderApi";
import {Switch, Spinner, Input, Button, ButtonGroup, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem,
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const SwitchIsPaid =  ({orderId, orderIsPaid, onSwitchFunction}) => {
    const { getOrdersAdmin, updateOrderTip, updateOrderCompleted, updateOrderPaid, deleteOrder, isLoading, hasError, clearError } = OrderApi()



    const updatePaid = async (orderId) => {
        let response = null
        try {
            response = await updateOrderPaid(orderId, orderIsPaid)
        } catch (error) {
            console.log(error)
        }
        if(!response?.newValue === null) return
        onSwitchFunction(orderId, response.newValue)
        console.log(`${orderId} isPaid: ${response.newValue}`)
    }
    return (
        <Switch className="w-100" size="lg" color="success" 
            isDisabled={isLoading} isSelected={orderIsPaid} onValueChange={() => updatePaid(orderId)}
            classNames={{base: "w-50"}} 
            thumbIcon={ <FontAwesomeIcon icon={faDollar} /> }
        />
    )
}
export default memo(SwitchIsPaid)