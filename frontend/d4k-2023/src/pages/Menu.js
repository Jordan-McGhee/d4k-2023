import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button, Spinner } from "@nextui-org/react";
import MenuList from "../components/menu/MenuList";
import MenuItem from "../components/menu/MenuItem";
import { useMetaTags } from "../hooks/useMetaTags";

import { DrinkApi } from "../api/drinkApi";

// Menu categories configuration for better maintainability
const MENU_CATEGORIES = [
    { id: 'cocktails', name: 'Cocktails', type: 'cocktail' },
    { id: 'batched', name: 'Batched', type: 'batched' },
    { id: 'shots', name: 'Shots', type: 'shot' },
    { id: 'mocktails', name: 'Mocktails', type: 'mocktail' }
];

// Custom drink configuration
const CUSTOM_DRINK_CONFIG = {
    id: 999,
    key: 999,
    imageFileName: "custom.png",
    name: "Custom Drink",
    description: "Welcome to the Build-A-Drink Workshop",
    ingredients: [],
    cost: 12
};

const Menu = () => {
    const { getDrinksAdmin } = DrinkApi();

    const [allDrinks, setAllDrinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set meta tags for menu page link preview
    useMetaTags({
        title: 'D4K - Christmas Charity Bar Menu',
        description: 'Browse our craft cocktails, mocktails, shots, and build your own drink for our Christmas charity event.',
        image: './images/d4klogo2025.jpg',
        url: window.location.href
    });

    // Memoized categorized drinks to avoid re-filtering on every render
    const categorizedDrinks = useMemo(() => {
        if (!allDrinks.length) return {};
        
        return MENU_CATEGORIES.reduce((acc, category) => {
            acc[category.type] = allDrinks.filter(drink => drink.type === category.type);
            return acc;
        }, {});
    }, [allDrinks]);

    // Scroll handler with useCallback to prevent unnecessary re-renders
    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const getMenu = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const drinks = await getDrinksAdmin();
                setAllDrinks(drinks);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setError('Failed to load menu. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };
        
        getMenu();
    }, []);
    // Common button styles for navigation
    const navButtonStyles = "bg-emerald-600 text-slate-100 focus:text-emerald-600 focus:bg-gray-300 hover:text-emerald-600 text-lg font-fugaz transition-colors duration-200";

    if (error) {
        return (
            <div className="max-w-md m-auto mt-20 p-4">
                <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg">
                    <p className="font-semibold">Error Loading Menu</p>
                    <p className="text-sm mt-2">{error}</p>
                    <Button 
                        className="mt-4 bg-emerald-600 text-white"
                        onPress={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md m-auto">
            {/* Navigation Header */}
            <nav 
                className="flex m-auto justify-between text-white fixed top-0 inset-x-0 px-1 py-4 w-full text-sm z-10 backdrop-blur-md bg-slate-500/80 max-w-md border-b-2 border-emerald-500"
                role="navigation"
                aria-label="Menu categories"
            >
                {MENU_CATEGORIES.map((category, index) => (
                    <Button
                        key={category.id}
                        className={`${navButtonStyles} ${
                            index === 0 ? 'rounded-l-3xl rounded-r-none' :
                            index === MENU_CATEGORIES.length - 1 ? 'rounded-r-3xl rounded-l-none' :
                            'rounded-none'
                        } ${index < MENU_CATEGORIES.length - 1 ? 'border-r-0' : ''}`}
                        variant="ghost"
                        onPress={() => scrollToSection(category.id)}
                        aria-label={`Scroll to ${category.name} section`}
                    >
                        {category.name}
                    </Button>
                ))}
            </nav>

            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <Spinner 
                        color="success"
                        classNames={{
                            wrapper: "w-20 h-20",
                            circle1: "border-5",
                            circle2: "border-5"
                        }}
                        aria-label="Loading menu"
                    />
                </div>
            ) : (
                <main className="mt-10 pt-10">
                    <div className="text-lg font-fugaz text-emerald-600 text-center">UNDER CONSTRUCTION</div>
                    {/* Dynamic Menu Sections */}
                    {MENU_CATEGORIES.map((category) => (
                        <section 
                            key={category.id}
                            id={category.id} 
                            className="scroll-mt-24"
                            aria-labelledby={`${category.id}-heading`}
                        >
                            <h2 
                                id={`${category.id}-heading`}
                                className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz"
                            >
                                {category.name}
                            </h2>
                            <MenuList
                                drinks={categorizedDrinks[category.type] || []}
                            />
                        </section>
                    ))}

                    {/* Custom Drink Section */}
                    <section className="mb-20" aria-labelledby="custom-heading">
                        <h2 
                            id="custom-heading"
                            className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz"
                        >
                            Build Your Own
                        </h2>
                        <div>
                            <MenuItem
                                className="rounded-full"
                                id={CUSTOM_DRINK_CONFIG.id}
                                key={CUSTOM_DRINK_CONFIG.key}
                                imageFileName={CUSTOM_DRINK_CONFIG.imageFileName}
                                name={CUSTOM_DRINK_CONFIG.name}
                                description={CUSTOM_DRINK_CONFIG.description}
                                ingredients={CUSTOM_DRINK_CONFIG.ingredients}
                                cost={CUSTOM_DRINK_CONFIG.cost}
                            />
                        </div>
                    </section>
                </main>
            )}
        </div>
    )
}

export default Menu