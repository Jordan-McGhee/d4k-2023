import { useFetch } from "../hooks/useFetch";

/** Bartender API */
export const DrinkApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const getDrinks = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/drinks/`, "GET")
    }
    
    const getDrinksAdmin = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/drinks/getAdmin`, "GET")
    }
    
    const updateOutOfStock = async (drinkId, isOutOfStock) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/drinks/${drinkId}/updateOutOfStock`, 
            "PATCH", {'Content-Type': 'application/json'},JSON.stringify({isOutOfStock}))
    }

    return { 
        getDrinks, getDrinksAdmin, updateOutOfStock,
        isLoadingDrinksApi: isLoading, hasError, clearError }
}
