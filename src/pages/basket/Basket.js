import React from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';

const Basket = () => {
    console.log('basket');

    return (
        <>
            <Container fluid className="basket-page">
                <Row>
                    <Col xs={12} md={12} xl={10}>
                        <ListGroup>
                            <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={12} xl={2} className="bg-dark">
                        Total vs
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Basket;
