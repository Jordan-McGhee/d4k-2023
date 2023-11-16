import { useFetch } from "../hooks/useFetch";

/** User API */
export const UserApi = () => {
    const { sendRequest } = useFetch()

    /** Update a username */
    const updateUsername = async (userId, username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/${userId}`, 
            "PATCH", { 'Content-Type': 'application/json' }, JSON.stringify({username: username}))
    }

    const getUserIdByUsername = async (username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/verify/${username}`, "GET")
    }

    const createUser = async (username) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user`, "POST", { 'Content-Type': 'application/json' }, JSON.stringify({username: username}))
    }

    return { updateUsername, getUserIdByUsername, createUser }
}
