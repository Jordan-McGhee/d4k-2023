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

    const getOrder = async (orderId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/single/${orderId}`, 'GET')
    }

    const getOrders = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/`)
    }

    const getOrdersAdmin = async (limit) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/admin/${limit}`, 'GET', { Accept: 'application/json' })
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

    const updateOrderBartender = async (orderId, bartenderId) => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/${orderId}/updateBartender`, 
            "PATCH", {'Content-Type': 'application/json'}, JSON.stringify({bartender_id: bartenderId}))
    }

    const getNewLeaderboard = async () => {
        return await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/order/stats`, 'GET',{Accept: 'application/json'})
    }

    return { 
        createOrder, 
        deleteOrder,
        getOrder,
        getOrders,
        updateOrderCompleted,
        updateOrderPaid,
        updateOrderTip,
        updateOrderBartender,
        getOrdersAdmin, 
        getOrdersAsTabs, 
        getOrdersLeaderboard,
        getNewLeaderboard,
        isLoadingOrderApi: isLoading, hasError, clearError }
}
