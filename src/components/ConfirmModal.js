import React from 'react';
import { Modal } from 'react-bootstrap';

const ConfirmModal = (props) => {
    const { show, onHide, onConfirm } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            dialogClassName="confirm-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Discard New Product?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <p>If you go back now, you will lose any changes you have made.</p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-outline-secondary mr-2"
                    type="button"
                    onClick={onConfirm}
                >
                    Cancel
                </button>
                <button className="btn btn-danger mr-2" type="button" onClick={onConfirm}>
                    Discard
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
