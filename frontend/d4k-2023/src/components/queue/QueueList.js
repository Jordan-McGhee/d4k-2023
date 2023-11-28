import React, { useEffect, useState } from "react";
import {
    Button, Card, CardBody, Chip, CardFooter, CardHeader, Divider,
    Modal, ModalBody, ModalContent, ModalHeader, ModalFooter
} from "@nextui-org/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from "react-router-dom";
import { OrderApi } from "../../api/orderApi"
import { useNavigate } from "react-router-dom";

const QueueList = (props) => {
    const [searchParams] = useSearchParams();
    const [storedUserId, setStoredUserId] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState({})
    const { deleteOrder } = OrderApi()
    const navigate = useNavigate()

    useEffect(() => {
        let paramOrderId = searchParams.get("orderId")
        if (paramOrderId && props.queue.length > 0 && props.queue.find(o => o.order_id === paramOrderId)) {
            document.getElementById(paramOrderId).scrollIntoView({ behavior: 'smooth' })
        }

        let storedUserId = localStorage.getItem('userId')
        if (storedUserId) {
            setStoredUserId(parseInt(storedUserId))
        }
    }, [])

    const handlePressDeleteModal = (order) => {
        setShowDeleteModal(true)
        setSelectedOrder(order)
    }

    const handleDelete = async () => {
        let data = await deleteOrder(selectedOrder.order_id)
        console.log(data)
        setShowDeleteModal(false)
        await props.deleteCallbackFunction()
        navigate({ pathname: '/order' })
    }

    // ${props.orderId === order.order_id ? 'animate-pulse-custom testhere' : ''}

    let items = props.queue.map((order, i) => (
        <Card id={order.order_id} key={order.order_id} isFooterBlurred radius="none"
            className={`first:rounded-t-3xl last:rounded-b-3xl bg-white/80 backdrop-blur-lg border-b-3 border-slate-500 shadow-lg 
            ${ storedUserId === order.user_id ? 'animate-pulse-custom testhere' : ''}`}>
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
                                            base: "bg-gradient-to-br from-indigo-800/50 to-rose-500/50 border-small border-white/50 ",
                                            content: "drop-shadow shadow-black text-white",
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

                    <CardFooter className="bottom-0 border-t-1 border-zinc-100/50 justify-between w-full py-2">
                        <div className="italic text-gray-700">{order.comments}</div>
                    </CardFooter>
                </div>
            }
            {
                order.user_id === storedUserId && i > 2 &&
                <Button className="absolute right-5 top-5" color="danger" radius="md" size="sm" isIconOnly onPress={() => handlePressDeleteModal(order)}>
                    <FontAwesomeIcon className="text-lg" icon={faClose} />
                </Button>
            }
        </Card>
    ))

    return (
        <>
            <p className="text-2xl font-bold font-fugaz text-center text-green-600 pb-2">Working On It</p>
            <div>
                {items.slice(0, 1)}
            </div>
            <p className="text-2xl font-bold font-fugaz text-center text-green-600 pb-2 pt-5">Up Next</p>
            <div>
                {items.slice(1)}
            </div>
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
                            <ModalFooter>
                                <Button color="danger" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default QueueList