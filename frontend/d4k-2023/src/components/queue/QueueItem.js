import React, { useState } from "react";
import DeleteModal from "../admin/DeleteModal";
import Button from "../FormElements/Button";
import Card from "../UIElements/Card";

const QueueItem = (props) => {

    const [ showDeleteModal, setShowDeleteModal ] = useState(false)

    let drink

    if (props.drink.includes('CUSTOM')) {
        drink = props.drink.split(':')[1].trim()
        console.log(`Split and Trimmed Drink name: ${drink}`)
    } else {
        drink = props.drink
    }

    const closeDeleteModalHandler = () => {
        setShowDeleteModal(false)
    }

    const storedUsername = localStorage.getItem('storedUsername')

    const matchClassName = "shadow-green-700 shadow-xl"
    
    return (
        <React.Fragment>

            {
                showDeleteModal && 
                <DeleteModal
                    order_id = { props.id }
                    show = { showDeleteModal }
                    onCancel = { closeDeleteModalHandler }
                />
            }
            <li className={ props.username === storedUsername ? matchClassName : null}>
                <Card className = "flex flex-col p-6 rounded-lg border border-gray-2 bg-white w-full my-5">

                    {/* container div for whole card */}
                    <div>

                        {/* div for section of card that's always shown */}
                        <div className="flex">

                            <p className="self-center text-4xl">{ props.spotInQueue }</p>

                            {/* div for name, # of drinks, and dropdown arrow */}
                            <div className="flex justify-between w-full">

                                <div className="ml-6">
                                    <p className="text-2xl font-semibold truncate w-48">{ props.username }</p>
                                    <p className="text-lg truncate w-48 capitalize">{ props.quantity > 1 ? `${ props.quantity } ${ drink }s` : `1 ${ drink }`  }</p>
                                </div>

                                {
                                    props.username === storedUsername && props.spotInQueue > 2 && 
                                    <p
                                        className="self-center font-semibold text-lg text-red-600"
                                        onClick = { () => setShowDeleteModal(true) }
                                    >
                                        DELETE
                                    </p>
                                }

                            </div>

                        </div>

                    </div>

                </Card>
            </li>
        </React.Fragment>
    )
}

export default QueueItem