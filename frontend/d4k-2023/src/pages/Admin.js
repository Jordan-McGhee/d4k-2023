import React, {useState, useEffect} from "react";
import AdminTable from "../components/admin/AdminTable";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import ErrorModal from "../components/UIElements/ErrorModal";
import { useFetch } from "../hooks/useFetch";

// dummy
//import data from "../DUMMY/DUMMY_DATA"

const Admin = () => {
    const [ orders, setOrders ] = useState([])
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
                console.log(responseData.response)

                setOrders(responseData.response)

            } catch(err) {
                console.log(err)
            }
        }

        getOrders()

    }, [ sendRequest ])

    return (
        // <div>asdf</div>
        <React.Fragment>
            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            {/* IN PROGRESS DIV */}
            <div>
                <p className="my-5 text-4xl font-bold uppercase text-green-600">WORKING ON IT</p>
                <AdminTable data = { [orders] }/>
            </div>

            {/* completed DIV */}
            <div>
                <p className="my-5 text-4xl font-bold uppercase text-green-600">Completed</p>
                <AdminTable data = { [] }/>
            </div>

        </React.Fragment>
    )
}

export default Admin