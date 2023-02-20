import React from "react";
import { Link } from "react-router-dom";

import "./Button.css"

const Button = props => {

    if (props.link) {
        return (
            <Link to= { props.link } className = { props.linkClass }>
                <button className={ props.className || "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" } type = { props.type }>
                    { props.text }
                </button>
            </Link>
        )
    } else {
        return (
            <button className= { props.className || "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white" } type = { props.type } onClick = { props.onClick }>
                { props.text }
            </button>
        )
    }

}

export default Button