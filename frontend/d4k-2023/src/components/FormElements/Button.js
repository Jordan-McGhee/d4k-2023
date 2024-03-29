import React from "react";
import { Link } from "react-router-dom";

const Button = props => {

    let buttonClass = "bg-green-600 button rounded-md shadow font-bold text-white " + props.className

    if (props.buttonSelected) {
        buttonClass = "bg-green-100 button rounded-md shadow font-bold text-green-700 " + props.className
    }
    if (props.winterize) {
        buttonClass += " uk-button"
    }

    if (props.link) {
        return (
            <Link to= { props.link } className = { props.linkClass } target= {props.target}>
                <button className={ buttonClass } type = { props.type } disabled = { props.disabled }>
                    { props.text }
                    { props.children}
                </button>
            </Link>
        )
    } else {
        return (
            <button className= { buttonClass } type = { props.type } onClick = { props.onClick } disabled = { props.disabled }>
                { props.text }
                { props.children}
            </button>
        )
    }

}

export default Button