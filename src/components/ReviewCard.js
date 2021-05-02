import React from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';
import moment from 'moment';
import StarMaker from './StarMaker';

const ReviewCard = (props) => {
    const { item, handleReject, handleApprove, isEvaluated } = props;
    const { id, title, comment, rating, date } = item;

    return (
        <Container fluid className="list-item-container">
            <Row className="list-item-container-row">
                <Col xs={6} xl={6} className="list-col title mb-3 mb-xl-2">
                    <div>
                        <span>{title}</span>
                    </div>
                </Col>
                <Col xs={6} xl={6} className="list-col star-col mb-xl-2">
                    <StarMaker rating={rating || 0} />
                </Col>
                <Col xs={12} xl={12} className="list-col comment-col mb-3 mb-xl-2">
                    <Form.Control
                        as="textarea"
                        rows={4}
                        required
                        name="specs"
                        type="text"
                        readOnly
                        defaultValue={comment}
                        className="comment"
                    />
                </Col>
                <Col
                    xs={{ span: 4, offset: 0 }}
                    xl={{ span: 2, offset: 0 }}
                    className="list-col date-col"
                >
                    <div>
                        <span>{moment(date).format('MMMM Do YYYY, h:mm a')}</span>
                    </div>
                </Col>
                <Col
                    xs={{ span: 3, offset: 1 }}
                    xl={{ span: 2, offset: 6 }}
                    className="list-col btn-col mr-3 mr-xl-0"
                >
                    <button
                        type="button"
                        className="btn btn-block reject"
                        onClick={() => handleReject(id)}
                        disabled={isEvaluated}
                    >
                        Reject
                    </button>
                </Col>
                <Col
                    xs={{ span: 3, offset: 0 }}
                    xl={{ span: 2, offset: 0 }}
                    className="list-col btn-col"
                >
                    <button
                        type="button"
                        className="btn btn-block approve"
                        onClick={() => handleApprove(id)}
                        disabled={isEvaluated}
                    >
                        Approve
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewCard;
