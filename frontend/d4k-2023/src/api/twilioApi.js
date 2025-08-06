import { useFetch } from "../hooks/useFetch";

/** Admin API */
export const TwilioApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    const sendMessage = async (phoneNumber, msg) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/twilio/sendMessage/${phoneNumber}`, 
            "POST", { 'Content-Type': 'application/json' }, JSON.stringify({message: msg}))

    }

    return { 
        sendMessage,
        isLoading, hasError, clearError }
}
