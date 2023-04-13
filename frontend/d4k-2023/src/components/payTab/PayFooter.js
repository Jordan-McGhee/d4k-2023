import React from "react";
import cashapp from "../../images/payment/cashapp.png"
import paypal from "../../images/payment/paypal.jpeg"
import venmo from "../../images/payment/venmo.png"
import { useNavigate } from "react-router-dom";

const PayFooter = () => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-around items-center w-4/5 m-auto">
            <img
                src={ cashapp }
                alt = "cashapp-icon"
                className="w-24 h-fit object-cover"
                // onClick = { () => navigate('cashapp')}
            />
            
            <img
                src={ paypal }
                alt = "paypal-icon"
                className="w-24 h-12 object-cover"
                // onClick = { () => navigate('cashapp')}
            />
            
            <img
                src={ venmo }
                alt = "venmo-icon"
                className="w-24 h-12 object-cover"
                // onClick = { () => navigate('cashapp')}
            />
            
        </div>
    )
}

export default PayFooter