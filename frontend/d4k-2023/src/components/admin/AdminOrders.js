import React, { useState, useEffect } from "react";
import AdminTable from "./orders/AdminTable";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AdminOrders = props => {
    const [ incompleteOrders, setIncompleteOrders ] = useState([])
    const [ completedOrders, setCompletedOrders ] = useState([])
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const getOrders = async () => {

            try {
                const responseData = await sendRequest(
                    // URL
                    `${process.env.REACT_APP_BACKEND_URL}/order/admin`,
                    // METHOD
                    'GET',
                    // HEADERS
                    {
                        Accept: 'application/json',
                    },
                )
                console.log(responseData)

                setIncompleteOrders(responseData.incompleteOrders)
                setCompletedOrders(responseData.completedOrders)

            } catch(err) {
                console.log(err)
            }
        }

        localStorage.setItem('showingOrders', 'true')
        getOrders()

    }, [ sendRequest ])

    return (
        <React.Fragment>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />

                { isLoading && <LoadingSpinner />}

                {/* IN PROGRESS DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">WORKING ON IT</p>
                    <AdminTable data = { incompleteOrders }/>
                </div>

                {/* completed DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">Completed</p>
                    <AdminTable data = { completedOrders }/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminOrders