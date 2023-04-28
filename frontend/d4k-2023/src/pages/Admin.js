import React, { useState } from "react";
import AdminOrders from "../components/admin/AdminOrders";
import AdminDonations from "../components/admin/AdminDonations";
import Button from "../components/FormElements/Button";
import refresh from "../images/icons/refresh.png"
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const navigate = useNavigate()

    // PULL FROM LOCAL STORAGE ON WHETHER WE'RE SHOWING DONATIONS or ORDERS?
    // ON PAGE REFRESH - WON'T DEFAULT TO DIFFERENT VIEW
    const showingOrdersString = localStorage.getItem('showingOrders')
    let showingOrdersBoolean
    showingOrdersString === "true" ? showingOrdersBoolean = true : showingOrdersBoolean = false

    const [ showOrders, setShowOrders ] = useState(showingOrdersBoolean)

    return (
        <React.Fragment>

            <div className="flex items-center w-full justify-between px-1">

                {/* buttons for switching between orders and donations */}
                <div className="flex justify-between">
                    <Button
                        text = "Orders"
                        type = "button"
                        onClick = { !showOrders ? () => setShowOrders(true) : null }
                        buttonSelected = { showOrders ? true : null}
                        className = "bg-green-600 button rounded-md shadow font-bold uppercase text-white mr-4"
                    />

                    <Button
                        text = "Donations"
                        type = "button"
                        onClick = { showOrders ? () => setShowOrders(false) : null }
                        buttonSelected = { !showOrders ? true : null}
                    />
                </div>

                <div className="flex items-center" onClick = { () => navigate(0) }>
                    <img src={ refresh } alt="refresh icon" className="w-6 mr-3"/>
                    <p className="text-white text-lg">REFRESH</p>
                </div>

            </div>

            {
                showOrders ?
                <AdminOrders />
                    :
                <AdminDonations />
            }

        </React.Fragment>
    )
}

export default Admin