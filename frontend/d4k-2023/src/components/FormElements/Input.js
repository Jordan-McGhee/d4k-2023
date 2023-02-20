import React, { useState } from "react";

const Input = props => {

    const [ inputValue, setInputValue ] = useState(props.value ? props.value : "")

    const [ inputTouched, setInputTouched ] = useState(false)

    const inputIsValid = inputValue !== "" && inputValue !== 0 && inputTouched

    const inputHasError = !inputIsValid && inputTouched

    const changeHandler = event => {
        setInputValue(event.target.value)
        // console.log(inputValue)
    }

    const blurHandler = event => {
        setInputTouched(true)
    }

    // const inputClasses = (inputHasError && 'border border-red-600')


    const element = 
        <input
            id= { props.id }
            type = { props.type }
            placeholder = { props.placeholder || ""}
            onChange = { changeHandler }
            onBlur = { blurHandler }
            value = { inputValue }
            className = { 'appearance-none block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2' } 
            // isValid = { inputIsValid }
            // value = { props.value || inputValue } ?? 
        />

    return (
        <div className="">
            <label htmlFor={ props.id } name = { props.id} className = "text-lg font-semibold mr-4 block uppercase tracking-wide">
                { props.label }
            </label>
            
            { element }
            { inputHasError && <p className="text-red-700 text-s italic mt-.5">{ props.errorText }</p> }
        </div>
    )
}

export default Input