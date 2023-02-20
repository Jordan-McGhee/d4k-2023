let DRINKS = [
    {
        name: "100% That Grinch",
        type: "Cocktail",
        price: 10,
        description: "Just took a DNA test, turns out it's mostly alcohol",
        ingredients: "Gin, Basil, Lemon"
    },

    {
        name: "Whiskey Blitzen",
        type: "Cocktail",
        price: 10,
        description: "A crowd favorite. Reindeer Fuel Baby",
        ingredients: "Bourbon, Egg, White, Maple, Lemon, Angostura"
    },

    {
        name: "Mulled Cider",
        type: "Batched",
        price: 7,
        description: "Hot or Cold, Yes or No, In or Out",
        ingredients: "Rum/Whiskey, Mulled Cider, Winter Spices"
    },

    {
        name: "Naughty Shot",
        type: "Shot",
        price: 4,
        description: "One for the heathens. Full proof and burns like hell — you're getting coal for Christmas",
        ingredients: "Rum/Whiskey, Mulled Cider, Winter Spices"
    }

]

let CUSTOMERS = [
    {
        name: "Jordan McGhee",
    },
    {
        name: "Jake Webber"
    },
    {
        name: "Aria Mathis"
    },
    {
        name: "Steph Light"
    }
]

let ORDERS =  [
    {
        id: 1,
        name: CUSTOMERS[0].name,
        drinks: [ DRINKS[0], DRINKS[0], DRINKS[3]],
        total: DRINKS[0].price + DRINKS[0].price + DRINKS[3].price,
        hasPaid: true,
        deliveredToCustomer: false
    },
    {   
        id: 2,
        name: CUSTOMERS[1].name,
        drinks: [ DRINKS[2]],
        total: DRINKS[2].price,
        hasPaid: true,
        deliveredToCustomer: false
    },
    {
        id: 3,
        name: CUSTOMERS[2].name,
        drinks: [ DRINKS[1], DRINKS[2], DRINKS[3]],
        total: DRINKS[1].price + DRINKS[2].price + DRINKS[3].price,
        hasPaid: false,
        deliveredToCustomer: false
    },
    {
        id: 4,
        name: CUSTOMERS[3].name,
        drinks: [ DRINKS[3], DRINKS[3], DRINKS[3]  ],
        total: DRINKS[3].price + DRINKS[3].price + DRINKS[3].price,
        hasPaid: false,
        deliveredToCustomer: false
    },
    {   
        id: 5,
        name: CUSTOMERS[1].name,
        drinks: [ DRINKS[2]],
        total: DRINKS[2].price,
        hasPaid: true,
        deliveredToCustomer: true
    },
    {
        id: 6,
        name: CUSTOMERS[2].name,
        drinks: [ DRINKS[1], DRINKS[2], DRINKS[3]],
        total: DRINKS[1].price + DRINKS[2].price + DRINKS[3].price,
        hasPaid: false,
        deliveredToCustomer: true
    },
    {
        id: 7,
        name: CUSTOMERS[3].name,
        drinks: [ DRINKS[3], DRINKS[3], DRINKS[3]  ],
        total: DRINKS[3].price + DRINKS[3].price + DRINKS[3].price,
        hasPaid: false,
        deliveredToCustomer: true
    }
]

export default { DRINKS, CUSTOMERS, ORDERS }