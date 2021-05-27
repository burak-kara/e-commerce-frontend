import React from 'react';
import { Row, Col, Container, Form } from 'react-bootstrap';

const UserCard = (params) => {
    const { user, sm, pm, onChange } = params;

    return (
        <Container fluid>
            <Row>
                <Col xs={3} xl={6}>
                    <Row xl={12}>
                        <Col xs={12} xl={3}>
                            <div>
                                <span>{user.pk}</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={3}>
                            <div>
                                <span>{user.username}</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={3}>
                            <div>
                                <span>{user.first_name}</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={3}>
                            <div>
                                <span>{user.last_name}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3} xl={2} className="radio-cols">
                    <Form.Check
                        type="radio"
                        name={`radio-${user.pk}`}
                        id="cm"
                        defaultChecked={!(sm && pm)}
                        onChange={() => onChange(user.pk, 'cm')}
                    />
                </Col>
                <Col xs={3} xl={2} className="radio-cols">
                    <Form.Check
                        type="radio"
                        name={`radio-${user.pk}`}
                        id="sm"
                        defaultChecked={sm}
                        onChange={() => onChange(user.pk, 'sm')}
                    />
                </Col>
                <Col xs={3} xl={2} className="radio-cols">
                    <Form.Check
                        type="radio"
                        name={`radio-${user.pk}`}
                        id="pm"
                        defaultChecked={pm}
                        onChange={() => onChange(user.pk, 'pm')}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default UserCard;
