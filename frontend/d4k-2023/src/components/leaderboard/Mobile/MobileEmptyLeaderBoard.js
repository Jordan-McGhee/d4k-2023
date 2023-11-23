import React from "react";
import Button from "../../FormElements/Button";
import Card from "../../UIElements/Card";
import MobileProgressBar from "./MobileProgressBar";

const MobileEmptyLeaderBoard = (props) => {

    const cardFooter = (
        <div className="flex justify-between mt-3 w-full">
            <Button
                text = "View Menu"
                type = "button"
                link = "/menu"
            />

            <Button
                text = "PLACE ORDER"
                type = "button"
                link = "/order"
            />
        </div>
    )
    
    return (
        <div className="my-4">

            <MobileProgressBar total = { 0 } />

            <Card header = { "No Leader Yet!" } headerClass = "text-center font-bold text-3xl border-b-2 mb-4 py-2" footer = { cardFooter } footerClass = "" >

                <p className="text-2xl my-2 text-center">Looks like nobody has placed an order yet!</p>

                <p className="text-2xl my-2 text-center">Check out the links below and claim the top spot for yourself!</p>

            </Card>
        </div>
    )
}

export default MobileEmptyLeaderBoard