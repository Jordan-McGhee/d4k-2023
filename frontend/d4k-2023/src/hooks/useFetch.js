import { useCallback, useRef, useState, useEffect } from "react"

export const useFetch = (props) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ hasError, setHasError ] = useState()

    // keeps track of any requests created with this hook and it's information that won't change upon re-render cycles
    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (url, method = "GET", headers = {},  body = null) => {

        setIsLoading(true)
        
        // next two lines adds this request to our request array above
        // managing with ref because we don't want to update the UI when this happens like with useState()
        const httpAbortController = new AbortController()
        activeHttpRequests.current.push(httpAbortController)

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                // links abortController to this request
                signal: httpAbortController.signal
            })
    
            const responseData = await response.json()
            // console.log(`Response data: ${responseData.users}`)

            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortController
            );

    
            // checks to see if the code associated with the response is 200ish. If not, we need to go to the catch block. Doesn't happen on its own because a 400 or 500ish response code is still considered a response, not an error
            if (!response.ok) {
                throw new Error(responseData.message)
            }

            setIsLoading(false)
            return responseData

        } catch(err) {
            console.log(err)
            setHasError(err.message || "Something went wrong. Please try again!")
            setIsLoading(false)
            throw err
        }
        
    }, [])

    const clearError = () => {
        setHasError(null)
    }

    // this useEffect block is going to be clean-up code. This will run whenever the component mounts
    // we return another function within the useEffect block, so it will do the clean-up before useEffect is called again or when the component unmounts
    // makes sure we never continue with a request with an outbound request if we switch away from the component that triggered the request
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortControl => abortControl.abort())
        }
    }, [])

    return { isLoading, hasError, sendRequest, clearError }
}