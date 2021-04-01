import React from 'react';
import { Modal } from 'react-bootstrap';

const DiscardModal = (props) => {
    const { show, onHide, onDiscard, header, body } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {header || 'Discard Changes?'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <p>{body || 'If you go back now, you will lose any changes you have made.'}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary mr-2" type="button" onClick={onHide}>
                    Cancel
                </button>
                <button className="btn btn-danger mr-2" type="button" onClick={onDiscard}>
                    Discard
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DiscardModal;
