import React, { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { OrderApi } from "../../../api/orderApi";
import {Switch} from "@nextui-org/react";

const SwitchIsCompleted = ({order, onSwitchFunction}) => {
    const { updateOrderCompleted, isLoading } = OrderApi()
    const [isCompleted, setIsCompleted] = useState(false)
    useEffect(() => {
            setIsCompleted(order.is_completed)
    }, [ order.is_completed ])

    const updateCompleted = async (order) => {
        let response = null
        try {
            response = await updateOrderCompleted(order.order_id, isCompleted)
        } catch (error) {
            console.log(error)
        }
        if(!response?.newValue === null) return
        setIsCompleted(response.newValue)
        onSwitchFunction(order, response.newValue)
    }
    return (
        <Switch className="w-100" size="lg" color="warning" isDisabled={isLoading} isSelected={isCompleted} onValueChange={() => updateCompleted(order)}
        thumbIcon={({ isSelected, className }) => isSelected ? (<FontAwesomeIcon className={className} icon={faCheck} />) : (<></>) }/>
        )
}
export default memo(SwitchIsCompleted)