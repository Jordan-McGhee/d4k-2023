import React from "react";
import { Link } from "react-router-dom";

import "./Button.css"

const Button = props => {

    let buttonClass = "bg-green-600 button rounded-md shadow font-bold uppercase text-white"

    if (props.buttonSelected) {
        buttonClass = "bg-green-100 button rounded-md shadow font-bold uppercase text-green-700"
    }

    if (props.link) {
        return (
            <Link to= { props.link } className = { props.linkClass }>
                <button className={ props.className || buttonClass } type = { props.type } disabled = { props.disabled }>
                    { props.text }
                </button>
            </Link>
        )
    } else {
        return (
            <button className= { props.className || buttonClass } type = { props.type } onClick = { props.onClick } disabled = { props.disabled }>
                { props.text }
            </button>
        )
    }

}

export default Button