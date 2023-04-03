import React, { useState } from "react";
import AdminOrders from "../components/admin/AdminOrders";
import AdminDonations from "../components/admin/AdminDonations";
import Button from "../components/FormElements/Button";

const Admin = () => {

    // PULL FROM LOCAL STORAGE ON WHETHER WE'RE SHOWING DONATIONS or ORDERS?
    // ON PAGE REFRESH - WON'T DEFAULT TO DIFFERENT VIEW
    const showingOrdersString = localStorage.getItem('showingOrders')
    let showingOrdersBoolean
    showingOrdersString === "true" ? showingOrdersBoolean = true : showingOrdersBoolean = false

    const [ showOrders, setShowOrders ] = useState(showingOrdersBoolean)

    return (
        <React.Fragment>
            {/* buttons for switching between orders and donations */}
            <div className="w-[22%] flex justify-between">
                <Button
                    text = "Orders"
                    type = "button"
                    onClick = { !showOrders ? () => setShowOrders(true) : null }
                />

                <Button
                    text = "Donations"
                    type = "button"
                    onClick = { showOrders ? () => setShowOrders(false) : null }
                />
            </div>

            {
                showOrders ?
                <AdminOrders />
                    :
                <AdminDonations />
            }

        </React.Fragment>
    )

    // const [ incompleteOrders, setIncompleteOrders ] = useState([])
    // const [ completedOrders, setCompletedOrders ] = useState([])
    // const { isLoading, hasError, sendRequest, clearError } = useFetch()

    // useEffect(() => {

    //     const getOrders = async () => {

    //         try {
    //             const responseData = await sendRequest(
    //                 // URL
    //                 `${process.env.REACT_APP_BACKEND_URL}/order/admin`,
    //                 // METHOD
    //                 'GET',
    //                 // HEADERS
    //                 {
    //                     Accept: 'application/json',
    //                 },
    //             )
    //             console.log(responseData)

    //             setIncompleteOrders(responseData.incompleteOrders)
    //             setCompletedOrders(responseData.completedOrders)

    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }

    //     getOrders()

    // }, [ sendRequest ])

    // return (
    //     <React.Fragment>
    //         <div className="w-full m-auto">
    //             <ErrorModal error = { hasError } onClear = { clearError } />

    //             { isLoading && <LoadingSpinner />}

    //             {/* IN PROGRESS DIV */}
    //             <div>
    //                 <p className="my-5 text-4xl font-bold uppercase text-white">WORKING ON IT</p>
    //                 <AdminTable data = { incompleteOrders }/>
    //             </div>

    //             {/* completed DIV */}
    //             <div>
    //                 <p className="my-5 text-4xl font-bold uppercase text-white">Completed</p>
    //                 <AdminTable data = { completedOrders }/>
    //             </div>
    //         </div>
    //     </React.Fragment>
    // )
}

export default Admin