import React from "react";
import CardListItem from "../components/UIElements/CardListItem";

import Card from "../components/UIElements/Card"

const FAQ = () => {

    return (
        <Card
            header = "FAQs"
        >
            <ul>
                <CardListItem
                    question = "What Charity?"
                    response = "The Nicholas house! It's a nonprofit agency that operates an emergency shelter, as well as scattered apartment sites for homeless families. They help homeless families make the transition from homelessness to self-sufficiency in a structured, but home-like environment."
                    link = "https://nicholashouse.org/"
                    linkText = "Visit their site to read more!"
                />
                <CardListItem
                    question = "What Should I Bring?"
                    response = "Your friends, your mom, your friend's mom, and a heart of gold (or cash/card)"
                />
                <CardListItem
                    question = "What's the Dress Code'?"
                    response = "Bring that holiday spirit. Tacky sweaters, xmas pajamas, santa tuxedoes, elf shit"
                />
                <CardListItem
                    question = "Can I BYOB?"
                    response = "Keep it to a minimum. We encourage you to swing by the bar to get served something worthy of your (multiple) donations"
                />
                <CardListItem
                    question = "Can I Order Off-Menu?"
                    response = "Absolutely! You can put a custom drink order in on the order page. Just make sure to leave a comment telling us what you'd like!"
                />
                
            </ul>

        </Card>
    )
}

export default FAQ