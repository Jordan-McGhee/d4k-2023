import React from "react";
import Card from "../components/UIElements/Card"
import Input from "../components/FormElements/Input"
import Button from "../components/FormElements/Button"

import cocktails from "../assets/drinks.json"

const Order = () => {

    let drinkList = cocktails

    let options = drinkList.map((drink) => (
        <option>{ drink.name }</option>
    ))

    const cardFooter = (
        <Button
            type = "button"
            text = "Grab a Drink"
        />
    )

    const submitHandler = e => {
        e.preventDefault()

    }



    return (
        <form onSubmit={ submitHandler }>

            <Card header = { "What'll Ya Have?"} footer = { cardFooter }>
                <Input
                    id = "name"
                    type = "text"
                    placeholder = "Buddy the Elf?"
                    label = "Your Name"
                />

                <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">Drink Order</label>
                <select id = "drinkChoice" name = "drinkChoice" className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2">
                <option disabled selected>Pick a Drink</option>
                    { options }
                </select>

                <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">How Many?</label>
                <select id = "drinkQuantity" name = "drinkQuantity" className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                
                <label className="text-lg font-semibold mr-4 block uppercase tracking-wide">Additional Comments</label>
                <textarea name = "comments" rows = "3" placeholder="Write us love letters"  className="block w-full max-w-2xl bg-white text-black border rounded p-3 my-3 leading-tight focus:outline-none focus:bg-white border-gray-2"/>
            </Card>

        </form>
    )
}

export default Order