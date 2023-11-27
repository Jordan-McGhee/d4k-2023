import { useFetch } from "../hooks/useFetch";

/** Admin API */
export const AdminApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const login = async (password) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/admin/login/${password}`, "GET")
    }

    return { 
        login,
        isLoading, hasError, clearError }
}
