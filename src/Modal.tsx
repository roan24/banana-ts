import React, { ReactNode } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalType } from './types/ModalType';
import UserForm from './UserForm';
import DeleteConfirmation from './DeleteConfirmation';

const ModalComponent = ({showModal, onCloseHandler, formData, formChangeHandler, yesHandler, title="", modalBody}: ModalType) => {
    return (
        <Modal show={showModal} onClose={onCloseHandler}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {modalBody === 'form' && <UserForm formData={formData} formChangeHandler={formChangeHandler}/>}
                {modalBody === 'delete-confirmation' && <DeleteConfirmation yesHandler={yesHandler} onCloseHandler={onCloseHandler}/>}
            </Modal.Body>
            {modalBody === 'form' && (
                <Modal.Footer>
                    <Button onClick={yesHandler} color="blue" disabled={!formData?.isChecked}>Submit</Button>
                    <Button color="gray" onClick={onCloseHandler}>
                        Cancel
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    )
};

export default ModalComponent;