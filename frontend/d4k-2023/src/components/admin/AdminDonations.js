import React, { useState, useEffect } from "react";
import DonationsTable from "./donations/DonationsTable";
import { useFetch } from "../../hooks/useFetch";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AdminDonations = props => {
    const [ incompleteDonations, setIncompleteDonations ] = useState([])
    const [ completedDonations, setCompletedDonations ] = useState([])
    const { isLoading, hasError, sendRequest, clearError } = useFetch()

    useEffect(() => {

        const getOrders = async () => {

            try {
                const responseData = await sendRequest(
                    // URL
                    `${process.env.REACT_APP_BACKEND_URL}/donation`,
                    // METHOD
                    'GET',
                    // HEADERS
                    {
                        Accept: 'application/json',
                    },
                )
                // console.log(responseData)

                setIncompleteDonations(responseData.unpaid)
                setCompletedDonations(responseData.paid)

            } catch(err) {
                console.log(err)
            }
        }

        
        localStorage.setItem('showingOrders', 'false')
        getOrders()

    }, [ sendRequest ])

    return (
        <React.Fragment>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />

                { isLoading && <LoadingSpinner />}

                {/* IN PROGRESS DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">UNPAID DONATIONS</p>
                    <DonationsTable data = { incompleteDonations }/>
                </div>

                {/* completed DIV */}
                <div>
                    <p className="my-5 text-4xl font-bold uppercase text-white">PAID DONATIONS</p>
                    <DonationsTable data = { completedDonations }/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminDonations