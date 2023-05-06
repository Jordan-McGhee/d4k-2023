import React, { useState } from "react";
import Card from "../UIElements/Card";
import Button from "../FormElements/Button";
import { useNavigate } from "react-router-dom";
import PayFooter from "./PayFooter";

const NoTab = () => {

    const navigate = useNavigate()

    const [ showPay, setShowPay ] = useState(false)

    const cardFooter = (
        <Button
            text = "Close My Tab"
            type = "text"
            onClick = { () => setShowPay(true)}
        />
    )

    let content = (
        <Card header = {"Leaving so soon?"} footer = { cardFooter }>
            <p className="text-2xl font-medium">Thanks for coming to the 4th annual D4K!</p>

            <p className="text-xl my-4">Doesn't look like we have anything on your tab yet! If this is a mistake, you can still pay with the <span className="italic uppercase font-bold text-green-700">CLOSE MY TAB</span> button below!</p>

            <p className="text-xl my-4">If it isn't a mistake, why don't you <span className="italic border-b-2 text-green-700" onClick = { () => navigate('/menu')}>visit our menu</span> or <span className="italic border-b-2 text-green-700" onClick = { () => navigate('/order')}>order yourself a drink!</span></p>
        </Card>
    )

    if (showPay) {
        content = (
            <Card header = { `Send Us Money!`} headerClass = "font-bold text-3xl border-b-2 mb-4 py-2 text-center" footer = { <PayFooter /> }>
                <p className="text-2xl text-center">Choose your preferred payment method below!</p>

                <p className="text-center mt-4">Don't want to pay yet?</p>
                
                <p className="text-center my-4">Why don't you <span className="italic border-b-2 text-green-700" onClick = { () => navigate('/menu')}>visit our menu</span> or <span className="italic border-b-2 text-green-700" onClick = { () => navigate('/order')}>order yourself a drink!</span></p>
            </Card>
        )
    }

    return (
        <div>
            { content }
        </div>
    )
}

export default NoTab