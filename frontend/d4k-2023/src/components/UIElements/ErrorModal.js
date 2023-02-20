import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header="An Error Occurred!"
            show={!!props.error}
            footer={
                <Button
                    type = "button"
                    text = "Okay"
                    onClick={ props.onClear }
                />
            }
        >
            <p>{props.error}</p>
        </Modal>
    );
};

export default ErrorModal;