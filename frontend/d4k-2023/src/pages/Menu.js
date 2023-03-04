import React from "react";
import Button from "../components/FormElements/Button";
import MenuList from "../components/menu/MenuList";

import cocktails from "../assets/drinks.json"
import batched from "../assets/other.json"
import shots from "../assets/shots.json"


const Menu = () => {

    return (
        <div>

            {/* div for buttons */}
            <div className="flex m-auto justify-around text-white my-4 sticky top-24 bg-red-900 w-full p-2 text-sm">
                <Button
                    text = "cocktails"
                    onClick = { () => document.getElementById('cocktails').scrollIntoView()}
                />

                <Button
                    text = "batched"
                    onClick = { () => document.getElementById('batched').scrollIntoView()}
                />

                <Button
                    text = "shots"
                    onClick = { () => document.getElementById('shots').scrollIntoView()}
                />
            </div>
            
            <p className="text-white text-center text-2xl">Want something different? <br></br> Ask what we can whip up for you!</p>

            {/* cocktails div */}
            <div id = "cocktails">
                <p
                className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Cocktails</p>
                <MenuList
                    drinks = { cocktails }
                />
            </div>

            {/* batched div */}
            <div id = "batched">
                <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Batched</p>
                <MenuList
                    drinks = { batched }
                />
            </div>

            {/* shots div */}
            <div id = "shots">
                <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Shots</p>
                <MenuList
                    drinks = { shots }
                />
            </div>

        </div>
    )
}

export default Menu