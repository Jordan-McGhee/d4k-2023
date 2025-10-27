import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import {
    Button, Select, SelectItem, SelectSection, Textarea, Input, Card, CardHeader, CardBody, CardFooter,
    Spinner, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Link,
    Checkbox
} from "@nextui-org/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCheck, faMinus, faPlus, faChampagneGlasses, faEdit, faX } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import shots from "../../assets/shots.json"

// api imports
import { DrinkApi } from '../../api/drinkApi';

const DrinkSelectSection = () => {

    // api destructuring
    const { getDrinks, isLoadingDrinksApi } = DrinkApi();

    // states
    const [allDrinks, setAllDrinks] = useState([])
    const [drinkName, setDrinkName] = useState(null)
    const [selectedDrinkDescription, setSelectedDrinkDescription] = useState('')
    const [selectedDrinkId, setSelectedDrinkId] = useState(-1)
    const [selectValue, setSelectValue] = useState(new Set([]));
    const [drinkCost, setDrinkCost] = useState(0)
    const [drinkQuantity, setDrinkQuantity] = useState(1)

    // custom drink logic
    const [customDrinkDescription, setCustomDrinkDescription] = useState('')
    const [customDrinkDescriptionFocused, setCustomDrinkDescriptionFocused] = useState(false)
    const onCustomDrinkDescriptionFocus = () => setCustomDrinkDescriptionFocused(true)
    const onCustomDrinkDescriptionBlur = () => setCustomDrinkDescriptionFocused(false)

    const customDrinkDescriptionRef = useRef(null);


    // drink selection functionality
    const updateDrinkState = (drinkId) => {
        if (drinkId === null) return

        if (drinkId < 0) {
            setDrinkName('')
            setDrinkCost(0)
            setDrinkQuantity(1)
            setSelectedDrinkId(-1)
            return
        }
        let selectedDrink = allDrinks.find(x => x.drink_id === drinkId)
        console.log(allDrinks)
        setSelectValue(new Set([drinkId.toString()]))
        setSelectedDrinkId(drinkId)
        setDrinkName(selectedDrink?.name ?? "custom")
        setSelectedDrinkDescription(selectedDrink?.description ?? '')
        setDrinkCost(parseInt(selectedDrink?.cost || 12))
    }

    const drinkDropdownChanged = (e) => {
        let currentDrinkId = parseInt(e.target.value)
        updateDrinkState(currentDrinkId)
    }

    const incrementDrinkQuantity = () => setDrinkQuantity(drinkQuantity + 1)
    const decrementDrinkQuantity = () => setDrinkQuantity(drinkQuantity - 1)


    // use effect for getting drink from search params

    const customDrinkId = 999
    const isCustomDrinkSelected = useMemo(() => {
        return selectedDrinkId === customDrinkId
    }, [selectedDrinkId])

    const isShot = useMemo(() => {
        return shots.some(d => d.id === selectedDrinkId)
    }, [selectedDrinkId])

    const isInvalidCustomDrinkDescription = useMemo(() => {
        return (!customDrinkDescription || customDrinkDescription.trim().length < 3) && isCustomDrinkSelected
    }, [isCustomDrinkSelected, customDrinkDescription]);

    const orderTotal = useMemo(() => {
        return (drinkCost * drinkQuantity) + donationAmount
    }, [drinkCost, drinkQuantity, donationAmount]);


    useEffect(() => {
        const getDrinksCall = async () => {
            try {
                const response = await getDrinks()

                setAllDrinks(response)

                const groupedMap = response.reduce(function (rv, x) {
                    (rv[x.type] = rv[x.type] || []).push(x);
                    return rv;
                }, {});

            } catch (err) {
                console.log(err)
            }
        }
        getDrinksCall()
    }, [])

    useEffect(() => {
        if (allDrinks) {
            let drinkIdParam = searchParams.get("drinkId")
            if (drinkIdParam) {
                updateDrinkState(parseInt(drinkIdParam))
            }
        }
    }, [allDrinks])

    return (
        <>
        </>
    )
}

export default DrinkSelectSection;