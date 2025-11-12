import React, { useMemo } from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ drinks = [] }) => {
    // Memoize filtered items to prevent unnecessary recalculations
    const visibleDrinks = useMemo(() => {
        return drinks.filter(drink => !drink.is_hidden);
    }, [drinks]);

    // Early return if no drinks available
    if (!visibleDrinks.length) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 italic">No items available in this category</p>
            </div>
        );
    }

    return (
        <ul className="space-y-0">
            {visibleDrinks.map((drink) => (
                <li key={drink.drink_id}>
                    <MenuItem
                        id={drink.drink_id}
                        imageFileName={drink.image_file_name}
                        name={drink.name}
                        description={drink.description}
                        ingredients={drink.ingredients}
                        cost={drink.cost}
                        outOfStock={drink.out_of_stock}
                    />
                </li>
            ))}
        </ul>
    );
};

export default MenuList;