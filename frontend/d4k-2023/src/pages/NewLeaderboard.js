import React, { useState, useEffect } from "react"

// api import
import { OrderApi } from "../api/orderApi"

// ui imports
import ErrorModal from "../components/UIElements/ErrorModal"
import { Spinner } from "@nextui-org/react"

// component imports
import Jumbotron from "../components/leaderboard/New/Large/Jumbotron"


// mobile component imports

const NewLeaderboard = () => {

    // order API
    const { isLoadingOrderApi, hasError, clearError, getNewLeaderboard } = OrderApi()

    // states for top ten users, overallTotal for d4k, drinkCount, ingredientCount, shotCount, and total drinks/shots ordered
    const [topTen, setTopTen] = useState([])
    const [total, setTotal] = useState(0)
    const [drinkCount, setDrinkCount] = useState({})
    const [ingredientCount, setIngredientCount] = useState({})
    const [shotCount, setShotCount] = useState({})
    const [drinkTotals, setDrinkTotals] = useState([])

    // fetch data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getNewLeaderboard()
                setTopTen(data.topTen)
                setTotal(data.sumTotal)
                setDrinkCount(data.drinkCount)
                setShotCount(data.shots)
                setIngredientCount(data.ingredientCount)
                setDrinkTotals([data.drinkQuantity, data.shotQuantity])
            } catch (error) {
                console.log(error)
            }
        }

        fetchLeaderboard()

        // console.log(topTen, total, drinkCount, ingredientCount, shotCount)
    }, [])

    // leaderboard refresh
    // useEffect(() => {
    //     const id = setInterval(async () => {
    //         fetchLeaderboard()
    //     }, 300000)

    //     return () => clearInterval(id)
    // }, [])

    return (
        <>
            {/* error modal and loading spinner */}
            <ErrorModal error={hasError} onClear={clearError} />

            {
                isLoadingOrderApi ?
                    <Spinner
                        color="success"
                        className="fixed top-1/4"
                        style={{ left: 'calc(50% - 40px)', zIndex: 100 }}
                        classNames={{
                            wrapper: "w-20 h-20",
                            circle1: "border-5",
                            circle2: "border-5"
                        }}
                    />

                    :
                    <>
                        <Jumbotron topTen={topTen} total={total} drinkCount={drinkCount} ingredientCount={ingredientCount} shotCount={shotCount} drinkTotals={drinkTotals} />
                    </>
            }


        </>
    )
}

export default NewLeaderboard