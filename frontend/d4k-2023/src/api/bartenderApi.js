import { useFetch } from "../hooks/useFetch";

/** Bartender API */
export const BartenderApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const getBartenders = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/bartenders/getBartenders`, "GET")
    }

    return { 
        getBartenders,
        isLoading, hasError, clearError }
}
