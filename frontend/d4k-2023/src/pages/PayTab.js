import React, { useState, useEffect} from "react";
import NoTab from "../components/payTab/NoTab";
import UserHasTab from "../components/payTab/UserHasTab";
import { useFetch } from "../hooks/useFetch";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import ErrorModal from "../components/UIElements/ErrorModal";

const PayTab = props => {

    const [ data, setData ] = useState(null)

    const { isLoading, sendRequest, hasError, clearError } = useFetch()

    useEffect(() => {

        const username = localStorage.getItem('storedUsername')

        if (username) {

            const fetchUserTab = async () => {
                try {
                    const responseData = await sendRequest(
                        `${process.env.REACT_APP_BACKEND_URL}/order/${username}/pullTab`
                    )

                    setData(responseData.response[0])
                    console.log(responseData.response[0])
                } catch (error) {
                    console.log(error)
                }

            }

            fetchUserTab()
        }
        
    }, [])

    let content

    data != null ?
        content = <UserHasTab data = { data } />
        :
        content = <NoTab />

    return (
        <React.Fragment>

            <ErrorModal error = { hasError } onClear = { clearError } />

            { isLoading && <LoadingSpinner />}

            { content }

        </React.Fragment>
    )
}

export default PayTab