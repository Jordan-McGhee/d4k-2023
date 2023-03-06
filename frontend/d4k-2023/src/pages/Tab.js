import React, { useState, useEffect } from "react"
import TabTable from "../components/tab/TabTable"
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"
import { useFetch } from "../hooks/useFetch"

const Tab = () => {
    const [ paidTabs, setPaidTabs ] = useState([])
    const [ unpaidTabs, setUnpaidTabs ] = useState([])
    const { isLoading, hasError, clearError, sendRequest } = useFetch()

    useEffect(() => {

        const getTabs = async () => {

            try {
                const responseData = await sendRequest(
                    // URL
                    `${process.env.REACT_APP_BACKEND_URL}/order/grouped`,
                    // METHOD
                    'GET',
                    // HEADERS
                    {
                        Accept: 'application/json'
                    }
                )

                console.log(responseData)

                setPaidTabs(responseData.paid)
                setUnpaidTabs(responseData.unpaid)

            } catch (error) {
                console.log(error)
            }

        }

        getTabs()

    }, [ sendRequest ])

    return (
        <React.Fragment>
            <div className="w-full m-auto">

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner /> }

            {/* UNPAID TABS */}
            <div>
                <p className="my-5 text-4xl font-bold uppercase text-white">UNPAID TABS</p>
                <TabTable data = { unpaidTabs } />
            </div>

            {/* PAID TABS */}
            <div>
                <p className="my-5 text-4xl font-bold uppercase text-white">PAID TABS</p>
                <TabTable data = { paidTabs } />
            </div>

            </div>
        </React.Fragment>
    )
}

export default Tab