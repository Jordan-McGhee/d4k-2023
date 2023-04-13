import React from "react";
import Button from "../components/FormElements/Button";
import MenuList from "../components/menu/MenuList";

import cocktails from "../assets/drinks.json"
import batched from "../assets/other.json"
import shots from "../assets/shots.json"


const Menu = () => {

    return (
        <div className="">

            {/* div for buttons */}
            <div className="flex m-auto justify-between text-white my-6 fixed top-12 inset-x-0 p-6 w-full text-sm bg-red-900">
                <Button
                    text = "cocktails"
                    onClick = { () => document.getElementById('cocktails').scrollIntoView({ behavior: 'smooth' })}
                />

                <Button
                    text = "batched"
                    onClick = { () => document.getElementById('batched').scrollIntoView({ behavior: 'smooth' })}
                />

                <Button
                    text = "shots"
                    onClick = { () => document.getElementById('shots').scrollIntoView({ behavior: 'smooth' })}
                />
            </div>
            
            <div className="mt-12">
                <p className="text-white text-center text-2xl">Want something different? <br></br> Ask what we can whip up for you!</p>

                {/* cocktails div */}
                <div id = "cocktails">
                    <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Cocktails</p>
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
        </div>
    )
}

export default Menu