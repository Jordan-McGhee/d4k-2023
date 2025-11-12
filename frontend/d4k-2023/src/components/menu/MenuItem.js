import React, { useCallback, useMemo } from "react";
import { Button } from "@nextui-org/react";
import Card from "../../components/UIElements/Card";
import { useNavigate, createSearchParams } from "react-router-dom";

const MenuItem = ({ 
    id, 
    imageFileName, 
    name, 
    description, 
    ingredients = [], 
    cost, 
    outOfStock = false,
    className 
}) => {
    const navigate = useNavigate();

    // Memoize the order button handler to prevent unnecessary re-renders
    const orderButtonPressed = useCallback(() => {
        navigate({
            pathname: '/order', 
            search: createSearchParams({ drinkId: id }).toString()
        });
    }, [navigate, id]);

    // Memoize computed styles
    const textColorClass = useMemo(() => 
        outOfStock ? 'text-slate-500' : 'text-emerald-600', 
        [outOfStock]
    );

    const ingredientsText = useMemo(() => 
        ingredients.join(" • "), 
        [ingredients]
    );

    return (
        <Card className={`flex px-4 py-3 justify-between border border-b-1 border-slate-500 first:rounded-t-3xl last:rounded-b-3xl bg-white/80 backdrop-blur-lg w-full overflow-hidden shadow-lg ${className || ''}`}>
            <img 
                src={`/images/drinks/${imageFileName}`} 
                alt={`${name} cocktail`} 
                className="border border-slate-500 shadow-lg h-40 w-1/3 rounded-xl object-cover"
                loading="lazy"
            />

            {/* Content Section */}
            <div className="w-7/12 flex flex-col justify-evenly">
                {/* Title/Description/Ingredients */}
                <div>
                    <h3 className={`uppercase font-bold text-md ${textColorClass}`}>
                        {name}
                    </h3>
                    <p className="text-xs italic text-gray-600 mt-1">
                        {description}
                    </p>
                    {ingredients.length > 0 && (
                        <p className="uppercase font-light text-[11px] my-2 text-gray-500">
                            {ingredientsText}
                        </p>
                    )}
                </div>

                {/* Order Button and Price */}
                <div className="flex items-center justify-between">
                    {outOfStock ? (
                        <Button
                            isDisabled
                            radius="full"
                            className="text-xs italic bg-gradient-to-r from-slate-700 to-slate-500 shadow-lg font-bold text-slate-200 border-2 border-slate-700"
                            aria-label={`${name} is out of stock`}
                        >
                            Out of Stock
                        </Button>
                    ) : (
                        <Button
                            radius="full"
                            onPress={orderButtonPressed}
                            className="font-fugaz tracking-widest bg-gradient-to-r from-emerald-800 to-emerald-400 shadow-lg hover:scale-105 transition-transform font-bold text-slate-200 border-2 border-emerald-700"
                            aria-label={`Order ${name} for $${cost}`}
                        >
                            Order
                        </Button>
                    )}

                    <span className={`${textColorClass} font-bungee text-xl`} aria-label={`Price: $${cost}`}>
                        ${cost}
                    </span>
                </div>
            </div>
        </Card>
    );
}

export default MenuItem