import React from 'react';
import { Modal, Form, Col } from 'react-bootstrap';

const ReviewModal = (props) => {
    const { show, onHide, onReview, onChange } = props;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="review-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Product Review</Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} xs={6} xl={6} controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                name="title"
                                type="text"
                                placeholder="Title"
                                onChange={(e) => onChange('title', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={6} xl={6} controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                className="dropdown"
                                variant="outline-secondary"
                                defaultValue="5"
                                onChange={(e) => onChange('rating', e.target.value)}
                            >
                                <option key="1">1</option>
                                <option key="2">2</option>
                                <option key="3">3</option>
                                <option key="4">4</option>
                                <option key="default">5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} xl={12} controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                name="comment"
                                type="text"
                                placeholder="Comment.."
                                onChange={(e) => onChange('comment', e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-outline-secondary mr-2"
                    name="Discard"
                    type="button"
                    onClick={onHide}
                >
                    Discard
                </button>
                <button
                    className="btn mr-2 review-btn"
                    name="Review"
                    type="button"
                    onClick={onReview}
                >
                    Review
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewModal;
