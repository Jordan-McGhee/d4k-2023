import React, { useState, useEffect, useCallback } from "react";
import { Spinner, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

import ErrorModal from "../components/UIElements/ErrorModal"
import OrderAnalytics from "../components/admin/analytics/OrderAnalytics";
import IngredientAnalytics from "../components/admin/analytics/IngredientAnalytics";
import { AnalyticsApi } from "../api/analyticsApi";

// Constants
const SPINNER_STYLES = {
    left: 'calc(50% - 20px)'
};

/**
 * AdminAnalytics Component
 * 
 * Displays analytics data for orders and ingredients.
 * Fetches data from the analytics API and renders charts/visualizations.
 */
const AdminAnalytics = () => {
    // API hooks
    const { getDrinkData, getIngredientData, hasError, clearError, isLoading } = AnalyticsApi()

    // Data state
    const [orderData, setOrderData] = useState([])
    const [ingredientData, setIngredientData] = useState([])

    // Data fetching functions
    const fetchAnalyticsData = useCallback(async () => {
        try {
            const [drinkResponseData, ingredientResponseData] = await Promise.all([
                getDrinkData(),
                getIngredientData()
            ])
            setOrderData(drinkResponseData)
            setIngredientData(ingredientResponseData)
        } catch (error) {
            console.error('Error fetching analytics data:', error)
        }
    }, [getDrinkData, getIngredientData])

    // Effects
    useEffect(() => {
        fetchAnalyticsData()
    }, [fetchAnalyticsData])

    return (
        <div className="w-full m-auto">
            <ErrorModal error={hasError} onClear={clearError} />
            
            {isLoading && (
                <Spinner 
                    color="success" 
                    className="fixed top-2/4 z-50 w-50" 
                    style={SPINNER_STYLES} 
                    size="lg" 
                />
            )}
            
            {/* Header with refresh button */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                <Button
                    isIconOnly
                    size="lg"
                    radius="full"
                    variant="ghost"
                    color="default"
                    isLoading={isLoading}
                    onPress={fetchAnalyticsData}
                    className="text-blue-600"
                >
                    <FontAwesomeIcon icon={faRefresh} className="text-xl" />
                </Button>
            </div>
            
            <div className="rounded-lg shadow-md space-y-6">
                {orderData.length > 0 && (
                    <OrderAnalytics data={orderData} />
                )}
                {ingredientData.length > 0 && (
                    <IngredientAnalytics data={ingredientData} />
                )}
                
                {!isLoading && orderData.length === 0 && ingredientData.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <p>No analytics data available.</p>
                        <Button
                            className="mt-4"
                            color="primary"
                            variant="flat"
                            onPress={fetchAnalyticsData}
                        >
                            Retry Loading Data
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminAnalytics