import { useFetch } from "../hooks/useFetch";

/** Analytics API */
export const AnalyticsApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const getDrinkData = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/analytics/getDrinkData`, "GET")
    }
    const getIngredientData = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/analytics/getIngredientData`, "GET")
    }

    return { 
        getDrinkData,
        getIngredientData,
        isLoading, hasError, clearError }
}
