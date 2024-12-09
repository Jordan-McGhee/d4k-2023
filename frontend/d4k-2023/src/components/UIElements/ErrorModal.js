import React from 'react';

import {Button, Modal, ModalHeader, ModalFooter, ModalBody, ModalContent} from "@nextui-org/react";

const ErrorModal = props => {
    return (
        <Modal placement="center"
            className="items-center"
            onCancel={props.onClear}
            isOpen={!!props.error}
        >
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1 font-bungee">Son of a Nutcracker!</ModalHeader>
                    <ModalBody>
                        {props.error}
                    </ModalBody>
                    <ModalFooter>
                        <Button className='font-fugaz text-white bg-emerald-600' onPress={ props.onClear }
                        >Close</Button>
                    </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;