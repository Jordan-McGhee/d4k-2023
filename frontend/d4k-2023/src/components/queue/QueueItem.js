import React, { useState } from "react";
import DeleteModal from "../admin/DeleteModal";
import Card from "../UIElements/Card";
import trash from "../../images/icons/delete.png"

const QueueItem = (props) => {

    const [ showDeleteModal, setShowDeleteModal ] = useState(false)

    let drink

    if (props.drink.includes('CUSTOM')) {
        drink = props.drink.split(':')[1].trim()
    } else {
        drink = props.drink
    }

    const closeDeleteModalHandler = () => {
        setShowDeleteModal(false)
    }

    const storedUsername = localStorage.getItem('storedUsername')
    
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
            <li>
                <Card className = { props.username === storedUsername ? "flex flex-col p-6 rounded-lg bg-white w-full my-5 border-[5px] border-green-700": "flex flex-col p-6 rounded-lg border border-gray-2 bg-white w-full my-5"}>

                    {/* container div for whole card */}
                    <div>

                        {/* div for section of card that's always shown */}
                        <div className="flex">

                            <p className="self-center text-4xl">{ props.spotInQueue }</p>

                            {/* div for name, # of drinks, and DELETE */}
                            <div className="flex justify-between w-full">

                                <div className="ml-4">
                                    <p className="text-2xl font-semibold truncate w-56">{ props.username }</p>
                                    <p className="text-lg truncate capitalize w-56">{ props.quantity > 1 ? `${ props.quantity } ${ drink }s` : `1 ${ drink }`  }</p>
                                </div>

                                {
                                    props.username === storedUsername && props.spotInQueue > 2 && 
                                    <div className="self-center bg-red-600 p-2 rounded-md">
                                        <img
                                            className="w-5 h-fit"
                                            onClick = { () => setShowDeleteModal(true) }
                                            src = {trash}
                                            alt = "trash icon"
                                        />
                                    </div>
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