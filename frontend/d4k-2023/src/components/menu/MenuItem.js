import React from "react";
import { Button } from "@nextui-org/react";
import Card from "../../components/UIElements/Card";
import { useNavigate, createSearchParams } from "react-router-dom";

const MenuItem = props => {

    const navigate = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault()

        const chosenDrink = event.target[0].value
        console.log(chosenDrink)

        navigate({
            pathname: '/order', 
            search: createSearchParams({drinkId: props.id}).toString()
        })
    }

    return (
        <li className="max-height-48 flex">
            <form onSubmit={ submitHandler }>

                <Card className = "flex px-4 py-2 justify-between rounded-lg border border-gray-2 bg-white w-full overflow-hidden shadow-lg mt-5">
                    <img src = { props.image } alt = { `${props.name}` } className = "border border-black h-5/6 w-1/3 my-auto" />

                    {/* div for full list item */}
                    <div className="w-7/12 flex flex-col justify-center">

                        {/* title/description/ingredients */}
                        <div className="">
                            <p className="uppercase text-green-600 font-bold text-sm">{ props.name}</p>
                            <p className="text-xs">{ props.description}</p>
                            <p className="uppercase font-light text-[10px] my-2">{ props.ingredients.join(" * ")}</p>
                        </div>

                        {/* HIDDEN INPUT TO PASS THROUGH TO ORDER PAGE */}
                        <input
                            hidden
                            readOnly
                            value = { [ props.name, props.price] }
                        />

                        {/* div for order button and price */}
                        <div className="flex items-center justify-between">
                            <Button
                                text = "Order"
                                type = "SUBMIT"
                                radius="full"
                                className = "bg-gradient-to-tr from-green-600 to-lime-400 text-white shadow-lg hover:scale-105 font-bold uppercase text-white">Order</Button>

                            <p>${ props.price }</p>
                        </div>

                    </div>
                </Card>

            </form>
        </li>
    )
}

export default MenuItem