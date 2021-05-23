import React from 'react';
import { Modal, Form, Col } from 'react-bootstrap';

const AuthModal = (props) => {
    const { show, onHide, onChange, isInvalid } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="code-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">2FA Code</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} xl={12} controlId="code">
                            <Form.Label>Google Authenticator Code</Form.Label>
                            <Form.Control
                                required
                                name="code"
                                type="number"
                                placeholder="Google Auth Code"
                                onChange={onChange}
                                isInvalid={isInvalid}
                                isValid={!isInvalid}
                            />
                            <Form.Control.Feedback type="invalid">
                                Wrong Authentication Code
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;
