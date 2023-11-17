import React from "react";
import MenuItem from "./MenuItem";

const MenuList = props => {

    const items = props.drinks.map((drink) => (
        <MenuItem
            id = { drink.id }
            key = { drink.id }
            image = { drink.imageUrl }
            name = { drink.name }
            description = { drink.description }
            ingredients = { drink.ingredients }
            price = { drink.price }
        />
    ))

    return (
        <ul>
            { items }
        </ul>
    )
}

export default MenuList