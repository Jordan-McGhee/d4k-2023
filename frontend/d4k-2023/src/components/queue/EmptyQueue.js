import React from "react";
import {
    Button, Card, CardBody, CardHeader, Link, 
} from "@nextui-org/react"
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
            <Card>
                <CardHeader className="flex justify-around font-fugaz text-2xl text-gray-800 text-center pl-4 py-2 pb-4">
                   No Orders Yet
                </CardHeader>
                <CardBody className="text-center text-md pl-4 pt-0 pb-2 font-bungee">
                  Be The first
                  <span className="pt-4">
                  <Button size="md" winterize className="ml-1 bg-emerald-600 text-sm py-3 border rounded-full font-bungee text-white">
                            <Link className="text-xl font-bold text-white-700" href="/menu">
                            Menu
                            </Link>
                    </Button>
                    <Button size="md" winterize className="ml-1 bg-emerald-600 text-sm py-3 border rounded-full font-bungee text-white">
                            <Link className="text-xl font-bold text-white-700" href="/order">
                            Order                           
                            </Link>
                    </Button>
                    </span>
                </CardBody>
            </Card>
        </div>
    )
}

export default EmptyQueue