import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCheck, faMagnifyingGlass, faDollar, faX, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import ErrorModal from "../components/UIElements/ErrorModal"
import convertDate from "../Conversions/convertDateTime";
import { Spinner, Input, Button, ButtonGroup, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalBody, ModalContent , ModalHeader, ModalFooter,
} from "@nextui-org/react";

import { Chart } from "react-google-charts";
import OrderAnalytics from "../components/admin/analytics/OrderAnalytics";
import IngredientAnalytics from "../components/admin/analytics/IngredientAnalytics";
import { UserApi }  from "../api/userApi";
import { AnalyticsApi }  from "../api/analyticsApi";

const Tab = () => {
    const [ orderData, setOrderData] = useState([])
    const [ ingredientData, setIngredientData] = useState([])

    const { getDrinkData, getIngredientData, hasError, clearError, isLoading} = AnalyticsApi()

    useEffect(() => {
        const getData = async () => {
            try {
                const drinkResponseData = await getDrinkData()
                setOrderData(drinkResponseData)
                const ingredientResponseData = await getIngredientData()
                setIngredientData(ingredientResponseData)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [ ])

    const refreshData = async () => {
        try {
            const responseData = await getDrinkData()
            setOrderData(responseData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />
                { (isLoading) && <Spinner color="success" className="fixed top-2/4 z-50 w-50" style={{left:'calc(50% - 20px)'}} size="lg" /> }
                <div>
                    <div className="rounded-lg shadow-md">
                    <OrderAnalytics data={orderData}/>
                    <IngredientAnalytics data={ingredientData}/>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Tab