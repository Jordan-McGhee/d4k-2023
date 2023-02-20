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
                    response = "Nicholas House"
                    responseClass = "text-2xl"
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
                    response = "Absolutely. We went all out. Put a custom drink on the order page with special requests in the comments."
                    responseClass = "text-md text-red-900"
                />
                
            </ul>

        </Card>
    )
}

export default FAQ