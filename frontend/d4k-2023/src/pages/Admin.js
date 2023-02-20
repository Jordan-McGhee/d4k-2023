import React, {useState, useEffect} from "react";
import AdminTable from "../components/admin/AdminTable";
import { useFetch } from "../hooks/useFetch";

// dummy
//import data from "../DUMMY/DUMMY_DATA"

const Admin = () => {
    const [ orderData, setOrderData ] = useState({orderData: []})
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const getOrders = async () => {

            try {
                const responseData = await sendRequest(
                    // URL
                    `${process.env.REACT_APP_BACKEND_URL}/admin/view`,
                    // METHOD
                    'GET',
                    // HEADERS
                    {
                        Accept: 'application/json',
                    },
                )
                setOrderData(responseData)
                console.log(responseData)

            } catch(err) {
                console.log(err)
            }
        }

        getOrders()

    }, [ sendRequest ])

    return (
        <div>asdf</div>
        // <div>

        //     {/* IN PROGRESS DIV */}
        //     <div>
        //         <p className="my-5 text-4xl font-bold uppercase text-green-600">WORKING ON IT</p>
        //         <AdminTable data = { orderData.filter((order) => order.deliveredToCustomer === false) }/>
        //     </div>

        //     {/* completed DIV */}
        //     <div>
        //         <p className="my-5 text-4xl font-bold uppercase text-green-600">Completed</p>
        //         <AdminTable data = { orderData.filter((order) => order.deliveredToCustomer === true) }/>
        //     </div>

        // </div>
    )
}

export default Admin