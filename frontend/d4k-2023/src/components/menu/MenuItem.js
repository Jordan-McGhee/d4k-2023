import React from "react";
import Button from "../../components/FormElements/Button";
import Card from "../../components/UIElements/Card";

const MenuItem = props => {

    return (
        <li className="max-height-48 flex">
            <Card
                className = "flex px-4 py-2 justify-between rounded-lg border border-gray-2 bg-white w-full overflow-hidden shadow-lg mt-5"
            >
                <img src = { props.image } className = "border border-black h-5/6 w-1/3 my-auto" />

                {/* div for full list item */}
                <div className="w-7/12 flex flex-col justify-center">

                    {/* div for title/description/ingredients */}
                    <div className="">
                        <p className="uppercase text-green-600 font-bold text-sm">{ props.name}</p>
                        <p className="text-xs">{ props.description}</p>
                        <p className="uppercase font-light text-[10px] my-2">{ props.ingredients.join(" * ")}</p>
                    </div>

                    {/* div for order button and price */}
                    <div className="flex items-center justify-between">
                        <Button
                            text = "ORDER"
                            className = "bg-green-600 button rounded-md shadow hover:cursor-pointer hover:scale-105 font-bold uppercase text-white"
                        />

                        <p>{ props.price }</p>
                    </div>

                </div>
            </Card>
        </li>
    )
}

export default MenuItem