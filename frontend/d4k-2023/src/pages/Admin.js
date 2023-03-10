import React, {useState, useEffect} from "react";
import AdminTable from "../components/admin/AdminTable";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import ErrorModal from "../components/UIElements/ErrorModal";
import DeleteModal from "../components/admin/DeleteModal";
import { useFetch } from "../hooks/useFetch";

// dummy
//import data from "../DUMMY/DUMMY_DATA"

const Admin = () => {
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

export default Admin