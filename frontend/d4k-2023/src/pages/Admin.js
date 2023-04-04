import React, { useState } from "react";
import AdminOrders from "../components/admin/AdminOrders";
import AdminDonations from "../components/admin/AdminDonations";
import Button from "../components/FormElements/Button";

const Admin = () => {

    // PULL FROM LOCAL STORAGE ON WHETHER WE'RE SHOWING DONATIONS or ORDERS?
    // ON PAGE REFRESH - WON'T DEFAULT TO DIFFERENT VIEW
    const showingOrdersString = localStorage.getItem('showingOrders')
    let showingOrdersBoolean
    showingOrdersString === "true" ? showingOrdersBoolean = true : showingOrdersBoolean = false

    const [ showOrders, setShowOrders ] = useState(showingOrdersBoolean)

    return (
        <React.Fragment>
            {/* buttons for switching between orders and donations */}
            <div className="w-[22%] flex justify-between">
                <Button
                    text = "Orders"
                    type = "button"
                    onClick = { !showOrders ? () => setShowOrders(true) : null }
                    className = { showOrders ? "bg-green-100 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-green-700" : "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                />

                <Button
                    text = "Donations"
                    type = "button"
                    onClick = { showOrders ? () => setShowOrders(false) : null }
                    className = { !showOrders ? "bg-green-100 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-green-700" : "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"}
                />
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