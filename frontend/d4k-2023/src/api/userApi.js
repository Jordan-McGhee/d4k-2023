import { useFetch } from "../hooks/useFetch";

/** User API */
export const UserApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    /** Update a username */
    const updateUsername = async (userId, username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, 
            "PATCH", { 'Content-Type': 'application/json' }, JSON.stringify({username: username}))
    }

    const getUserIdByUsername = async (username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/verify/${username}`, "GET")
    }

    const getAllUsers = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/all`, "GET")
    }

    const createUser = async (username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify({username: username}))
    }

    const getTab = async (userId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/getTab`, "GET")
    }

    const closeTab = async (userId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/closeTab`, "POST")
    }

    const updateUserDonations = async (userId, donationAmount) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/adjustDonations`, 
            "PATCH", { 'Content-Type': 'application/json' }, JSON.stringify({donation_amount: donationAmount}))
    }

    return { 
        updateUsername,
        getUserIdByUsername,
        createUser,
        getAllUsers,
        getTab,
        closeTab,
        updateUserDonations,
        isUserApiLoading: isLoading, hasError, clearError }
}
