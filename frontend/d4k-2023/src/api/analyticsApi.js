import { useFetch } from "../hooks/useFetch";

/** Analytics API */
export const AnalyticsApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const login = async (password) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/analytics/getDrinkData`, "GET")
    }

    return { 
        login,
        isLoading, hasError, clearError }
}
