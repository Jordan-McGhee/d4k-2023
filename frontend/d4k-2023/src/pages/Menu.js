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
            <div className="flex m-auto justify-around text-white my-4">
                <Button
                    text = "cocktails"
                    link = ""
                />

                <Button
                    text = "batched"
                    link = ""
                />

                <Button
                    text = "shots"
                    link = ""
                />
            </div>
            
            <p className="text-white text-center text-2xl">Want something different? <br></br> Ask what we can whip up for you!</p>

            {/* cocktails div */}
            <div>
                <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Cocktails</p>
                <MenuList
                    drinks = { cocktails }
                />
            </div>

            {/* batched div */}
            <div>
                <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Batched</p>
                <MenuList
                    drinks = { batched }
                />
            </div>

            {/* cocktails div */}
            <div>
                <p className="text-center text-6xl mt-4 text-green-500 font-extrabold uppercase">Shots</p>
                <MenuList
                    drinks = { shots }
                />
            </div>

        </div>
    )
}

export default Menu