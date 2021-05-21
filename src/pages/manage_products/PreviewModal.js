import React from 'react';
import { Modal } from 'react-bootstrap';
import { ProductCard } from '../../components';

const PreviewModal = (props) => {
    const { show, onHide, onConfirm, form } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            dialogClassName="preview-modal"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Confirm New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <ProductCard {...form} isPreview />
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-success mr-2"
                    name="Confirm Product"
                    type="button"
                    onClick={onConfirm}
                >
                    Confirm Product
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default PreviewModal;
