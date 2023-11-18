import { useFetch } from "../hooks/useFetch";

/** Order API */
export const OrderApi = () => {
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    /** Create an order.  
     * @param {Object} orderData user_id, drinkTitle, drinkCost, quantity, tip_amount, comments */
    const createOrder = async (orderData) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order`, 
        "POST", { 'Content-Type': 'application/json' }, JSON.stringify(orderData))
    }

    const deleteOrder = async (orderId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${orderId}`, "DELETE")
    }

    const getOrders = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/`)
    }

    const getOrdersAdmin = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/admin`, 'GET', { Accept: 'application/json' })
    }

    const getOrdersAsTabs = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/grouped`, 'GET',{Accept: 'application/json'})    
    }

    const getOrdersLeaderboard = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/leaderboard`, 'GET',{Accept: 'application/json'})
    }

    const updateOrderPaid = async (orderId, isPaid) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${orderId}/updatePaid`, 
            "PATCH", {'Content-Type': 'application/json'},JSON.stringify({isPaid}))
    }
    
    const updateOrderCompleted = async (orderId, isCompleted) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${orderId}/updateCompleted`, 
            "PATCH", {'Content-Type': 'application/json'}, JSON.stringify({isCompleted}))
    }

    const updateOrderTip = async (orderId, tipAmount) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${orderId}/updateTip`, 
            "PATCH", {'Content-Type': 'application/json'}, JSON.stringify({tip_amount: tipAmount}))
    }

    return { 
        createOrder, 
        deleteOrder, 
        getOrders,
        updateOrderCompleted,
        updateOrderPaid,
        getOrdersAdmin, 
        getOrdersAsTabs, 
        getOrdersLeaderboard, 
        isLoading, hasError, clearError }
}
