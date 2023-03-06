import React, { useState, useEffect } from "react"
import TabTable from "../components/tab/TabTable"
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"
import { useFetch } from "../hooks/useFetch"

const Tab = () => {
    const [ tabs, setTabs ] = useState([])
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

                setTabs(responseData.response)

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

            <div>
                <p className="my-5 text-4xl font-bold uppercase text-white">TABS</p>
            </div>
            <TabTable data = { tabs } />

            </div>
        </React.Fragment>
    )
}

export default Tab