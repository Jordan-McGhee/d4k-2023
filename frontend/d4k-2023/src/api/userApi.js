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

    const getUserById = async (userId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, "GET")
    }

    const getAllUsers = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/all`, "GET")
    }

    const createUser = async (username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify({username: username}))
    }

    const createUserWithPhone = async (username, phone) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/withPhone`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify({username: username, phoneNumber: phone}))
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

    const updateUserPhoto = async (userId, photoUrl) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}/changePhotoUrl`, 
            "PATCH", { 'Content-Type': 'application/json' }, JSON.stringify({photo_url: photoUrl}))
    }

    return { 
        updateUsername,
        getUserIdByUsername,
        getUserById,
        createUser,
        createUserWithPhone,
        getAllUsers,
        getTab,
        closeTab,
        updateUserDonations,
        updateUserPhoto,
        isUserApiLoading: isLoading, hasError, clearError }
}
