import React, { useEffect, useState } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { PageLoading, OrderCard } from '../../components';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOrders([]);
        setLoading(false);
    }, []);

    const handleClick = () => {
        // TODO open order details model/page
    };

    const listItems = () => {
        const list = [];
        if (orders.length !== 0) {
            orders.forEach((item) => {
                list.push(
                    <ListGroup.Item
                        className="list-item"
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                    >
                        <OrderCard item={item} />
                    </ListGroup.Item>,
                );
            });
        } else {
            const item = {};
            return (
                <ListGroup.Item
                    className="list-item"
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                >
                    <OrderCard item={item} />
                </ListGroup.Item>
            );
        }
        return list;
    };

    return (
        <Container fluid className="orders-page">
            <Row>
                <Col
                    className="orders-page-col"
                    xs={{ span: 12, offset: 0 }}
                    md={{ span: 6, offset: 3 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    <ListGroup variant="flush">
                        {loading ? <PageLoading /> : listItems()}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Orders;
