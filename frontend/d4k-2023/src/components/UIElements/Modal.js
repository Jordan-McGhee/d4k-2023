import React from 'react'
import ReactDOM from 'react-dom'

import { CSSTransition } from "react-transition-group"
import "./Modal.css"

import Backdrop from "./Backdrop"
import Card from './Card'

// render a component inside of the main component, but only return the main component
// use a portal to have this modal display over the actual app. Added a reference point in the index.html file
// wrapped content in a form so we can submit data via the modal if necessary. Otherwise the onSubmit function is set with a default so it won't matter if the form isn't needed


// STATE FUNCTIONS TO MANAGE MODAL
// COPY/PASTE INTO COMPONENTS THAT NEED A MODAL
// REMEMBER REACT.FRAGMENT and props (show, onCancel, header (text), contentClass, footer, footerClass)
// Have content between the <Modal> </Modal> tags for props.children

// const [ showModal, setShowModal ] = useState(false)

// const openModalHandler = () => setShowModal(true)

// const closeModalHandler = () => setShowModal(false)




const ModalOverlay = props => {

    let header, footer

    header = props.header

    footer =  props.footer

    const content = (
        <Card
            className= { `modal ${props.modalClassName} flex flex-col p-6 rounded-lg my-2 border border-gray-2 bg-white scale-90 m-auto max-w-lg` }
            // className = 'flex flex-col p-6 rounded-lg my-2 border border-gray-2'
            // style={ props.style }
            header = { header }
            footer = { footer }
        >

            {/* <form onSubmit={ props.onSubmit ? props.onSubmit : event => event.preventDefault() }>

                {/* form content passed in via props */}
                {/* <div className={ `modal__content ${ props.contentClass}`}>
                    { props.children}
                </div> */}

                

            {/* </form> */} 

            { props.children}
            
        </Card>
    )
    
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}


const Modal = props => {
    return (
        <React.Fragment>
            { props.show && <Backdrop onClick = { props.onCancel } /> }
            <CSSTransition
                in = { props.show }
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay { ...props } />
            </CSSTransition>
        </React.Fragment>
    )
}

export default Modal