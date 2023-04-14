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
            <div className="w-64 flex justify-between">
                <Button
                    text = "Orders"
                    type = "button"
                    onClick = { !showOrders ? () => setShowOrders(true) : null }
                    buttonSelected = { showOrders ? true : null}
                />

                <Button
                    text = "Donations"
                    type = "button"
                    onClick = { showOrders ? () => setShowOrders(false) : null }
                    buttonSelected = { !showOrders ? true : null}
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