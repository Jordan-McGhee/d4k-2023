import React from "react";
import cashapp from "../../images/payment/cashapp.png"
import paypal from "../../images/payment/paypal.jpeg"
import venmo from "../../images/payment/venmo.png"
import { Link, useNavigate } from "react-router-dom";

const PayFooter = () => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-around items-center w-4/5 m-auto">
            <Link
                to = "https://cash.app/$wakejebber"
                target = "_blank"
                className="w-24 h-fit object-cover"
            >
                <img
                    src={ cashapp }
                    alt = "cashapp-icon"
                />
            </Link>
            
            <Link
                className="w-12 h-fit object-cover"
                to = "https://paypal.me/jacobwwebber"
                target = "_blank"
            >
                <img
                    src={ paypal }
                    alt = "paypal-icon"
                    // className="w-24 h-12 object-cover"
                    
                />
            </Link>
            
            <Link
                to = "https://venmo.com/jacobwebber?txn=pay&note=drink4dakids"
                target = "_blank"
                className="w-24 h-fit object-cover"
            >
                <img
                    src={ venmo }
                    alt = "venmo-icon"
                    className="w-24 h-12 object-cover"
                />
            </Link>
            
        </div>
    )
}

export default PayFooter