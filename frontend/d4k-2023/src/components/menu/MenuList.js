import React from "react";
import MenuItem from "./MenuItem";

const MenuList = props => {

    const items = props.drinks.map((drink) => {

        if (drink.is_hidden) {
            return null
        }

        return (
            <MenuItem
                id={drink.drink_id}
                key={drink.drink_id}
                imageFileName={drink.image_file_name}
                name={drink.name}
                description={drink.description}
                ingredients={drink.ingredients}
                cost={drink.cost}
                outOfStock={drink.out_of_stock}
            />
        )

    })


    return (
        <ul>
            {items}
        </ul>
    )
}

export default MenuList