import React from "react";
import Button from "../FormElements/Button";

const PayFooter = () => {

    return (
        <div className="flex justify-around mt-4 shrink border-top-2 w-4/5 m-auto">
            <Button
                text = "CA"
                type = "text"
                // onClick = { () => setConfirmClose(true)}
            />

            <Button
                text = "PP"
                type = "text"
                // onClick = { () => setConfirmClose(true)}
            />

            <Button
                text = "V"
                type = "text"
                // onClick = { () => setConfirmClose(true)}
            />
        </div>
    )
}

export default PayFooter