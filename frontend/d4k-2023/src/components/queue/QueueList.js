import React, { useEffect, useState } from "react";
import {
    Button, Card, CardBody, Chip, CardFooter, CardHeader, Divider,
    Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Spinner
} from "@nextui-org/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faChampagneGlasses, faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import { OrderApi } from "../../api/orderApi"
import { useNavigate } from "react-router-dom";

const QueueList = (props) => {
    const [searchParams] = useSearchParams();
    const [storedUserId, setStoredUserId] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showOrderReadyModal, setShowOrderReadyModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const [paramOrder, setParamOrder] = useState({})
    const { deleteOrder, getOrder, isLoadingOrderApi } = OrderApi()
    const navigate = useNavigate()


    useEffect(() => {
        const fetchOrder = async (orderId) => {
            try {
                const responseData = await getOrder(orderId)
                if (!responseData) return

                setParamOrder(responseData.response)
                setShowOrderReadyModal(true)
            } catch (error) {
                console.log(error)
            }
        }

        // see if user has placed order and has id saved in local storage
        let userIdInStorage = localStorage.getItem('userId')

        // if so, update storedUserId state
        if (userIdInStorage) {
            setStoredUserId(+userIdInStorage)
        }

        // variable for orderId in parameter user gets from placing order and being navigated to queue page 
        let orderIdParam = searchParams.get("orderId")

        // if no orderId param, exit the useEffect
        if (!orderIdParam) return

        // else, convert orderIdParam to a number
        let orderId = Number(orderIdParam)

        // use orderId to scroll to user's spot in queue
        if (props.queue.length > 0 && props.queue.find(o => o.order_id === orderId)) {
            document.getElementById(orderId).scrollIntoView({ behavior: 'smooth' })
        }

        // Order marked done, display order ready modal
        if (!props.queue.find(o => o.order_id === orderId)) {
            fetchOrder(orderId)
        }




    }, [props.queue])

    const handlePressDeleteModal = (order) => {
        setShowDeleteModal(true)
        setSelectedOrder(order)
    }

    const handleDelete = async () => {
        let data = await deleteOrder(selectedOrder.order_id)
        // console.log(data)
        setShowDeleteModal(false)
        await props.deleteCallbackFunction()
        navigate({ pathname: '/order' })
    }

    let items = props.queue.map((order, i) => (
        <Card id={order.order_id} key={order.order_id} isFooterBlurred radius="none"
            className={`first:rounded-t-3xl last:rounded-b-3xl bg-white/80 backdrop-blur-lg border-b-3 border-slate-500 shadow-lg 
            ${storedUserId === order.user_id ? 'animate-pulse-custom' : ''}`}>
            <CardHeader className="flex pl-4 py-2 pb-0">
                <p className="text-xl text-grey-800 font-bold">{order.username}</p>
            </CardHeader>
            <CardBody className="text-md pl-4 pt-0 pb-2">
                <span className="flex justify-between">
                    <span className="flex justify-between">
                        <span className="flex flex-none max-w-xs">
                            {order.drink}
                        </span>
                        <span className="flex justify-end">
                            {order.quantity > 1 &&
                                <span className="flex">
                                    <Chip className="font-bold text-md ml-3 justify-right" variant="shadow"
                                        classNames={{
                                            base: "bg-gradient-to-br from-indigo-800/30 to-rose-500/30 border-small border-white/50 ",
                                            content: "drop-shadow shadow-black text-black",
                                        }}>x{order.quantity}
                                    </Chip>
                                </span>
                            }
                        </span>
                    </span>
                </span>
            </CardBody>
            {order.comments &&
                <div>
                    <Divider />

                    <CardFooter className="bottom-0 border-t-1 border-zinc-100/50 justify-between w-full pt-2 pb-3">
                        <div className="italic text-gray-700">{order.comments}</div>
                    </CardFooter>
                </div>
            }
            {
                order.user_id === storedUserId && i > 2 && order.bartender_id === null &&
                <Button className="absolute z-10 right-5 top-5 bg-rose-600" color="danger" radius="md" size="sm" isIconOnly onPress={() => handlePressDeleteModal(order)}>
                    <FontAwesomeIcon className="text-lg" icon={faClose} />
                </Button>
            }
            {
                order.bartender_id !== null &&
                <div className="absolute font-fugaz z-10 right-5 top-5 text-right">
                    Working <br></br>on it
                    <FontAwesomeIcon className="pl-2" size="lg" icon={faMartiniGlassCitrus}></FontAwesomeIcon>
                </div>
            }

        </Card>
    ))

    return (
        <>
            <div>
                {items}
            </div>

            {/* show delete modal */}
            <Modal placement="center" isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-fugaz text-2xl justify-center text-emerald-600">Delete Order</ModalHeader>
                            <ModalBody className="justify-center">
                                <div className="text-center text-xl">
                                    Remove the order for <div className="font-bold">{selectedOrder.quantity} {selectedOrder.drink}</div> from the queue?
                                    <br /> This cannot be undone
                                </div>
                            </ModalBody>
                            <ModalFooter className="text-center justify-center" >
                                <Button className="min-w-[200px]" radius="full" color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* order is ready modal */}
            <Modal className="m-5" placement="center" isOpen={showOrderReadyModal} onClose={() => setShowOrderReadyModal(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="font-fugaz text-2xl justify-center text-emerald-600">Order Is Ready</ModalHeader>
                            <ModalBody className="justify-center pb-5">
                                {isLoadingOrderApi &&
                                    <Spinner
                                        color="success"
                                        style={{ zIndex: 100 }}
                                        classNames={{
                                            wrapper: "w-10 h-10",
                                            circle1: "border-5",
                                            circle2: "border-5"
                                        }} />
                                }
                                {!isLoadingOrderApi &&
                                    <div className="text-center text-gray-800 font-fugaz text-xl">
                                        Come grab your
                                        <div className="text-emerald-600">{paramOrder.drink}
                                            {paramOrder.quantity === 1 &&
                                                <span> x{paramOrder.quantity}</span>}
                                        </div>
                                        at the bar
                                    </div>

                                }
                                <FontAwesomeIcon className="text-gray-800" size="2x" icon={faChampagneGlasses}></FontAwesomeIcon>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default QueueList