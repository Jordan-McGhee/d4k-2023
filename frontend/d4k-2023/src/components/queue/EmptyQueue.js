import React from "react";
import Button from "../FormElements/Button";
import Card from "../UIElements/Card";

const EmptyQueue = () => {

    const cardFooter = (
        <div className="flex justify-between mt-3 w-full">
            <Button
                text = "View Menu"
                type = "button"
                link = "/menu"
                className = "bg-gradient-to-r from-green-800 to-emerald-400 shadow-lg hover:scale-105 font-bold uppercase text-white rounded-full px-4 py-2"
            />

            <Button
                text = "PLACE ORDER"
                type = "button"
                link = "/order"
                className = "bg-gradient-to-r from-green-800 to-emerald-400 shadow-lg hover:scale-105 font-bold uppercase text-white rounded-full px-4 py-2"
            />
        </div>
    )
    
    return (
        <div className="my-4">
            <Card header = { "No Orders Yet!" } headerClass = "text-center font-bold text-3xl border-b-2 mb-4 py-2"  footer = { cardFooter } footerClass = "" >

                <p className="text-2xl text-center my-2">Looks like the queue is empty!</p>

                <p className="text-2xl text-center my-2">Why don't you be the first person to submit an order!</p>

            </Card>
        </div>
    )
}

export default EmptyQueue