import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { PageLoading, OrderCard } from '../../components';
import { ORDER_DETAIL } from '../../_constants';

// TODO delete
const orderss = [
    {
        status: -1,
        id: '876598',
        total_price: '99,95',
        date: '25 Mart Per, 11:16',
        items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
    },
    {
        status: 0,
        id: '123456',
        total_price: '7849,99',
        date: '25 Mart Per, 11:16',
        items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
    },
    {
        status: 1,
        id: '456789',
        total_price: '1025,95',
        date: '25 Mart Per, 11:16',
        items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
    },
    {
        status: 2,
        id: '123789',
        total_price: '78,41',
        date: '25 Mart Per, 11:16',
        items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
    },
    {
        status: 3,
        id: '741963',
        total_price: '10,45',
        date: '25 Mart Per, 11:16',
        items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
    },
];

const Orders = () => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(orders); // TODO delete

    useEffect(() => {
        setOrders([]);
        setLoading(false);
    }, []);

    const handleClick = (id) => {
        console.log('detailsss');
        // TODO open order details model/page
        history.push({
            pathname: ORDER_DETAIL,
            state: { id },
        });
    };

    const listItems = () => {
        const list = [];
        if (orderss.length !== 0) {
            orderss.forEach((item) => {
                list.push(
                    <ListGroup.Item className="list-item" key={item.id}>
                        <OrderCard order={item} onClick={handleClick} />
                    </ListGroup.Item>,
                );
            });
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
                    <ListGroup variant="flush">{loading ? <PageLoading /> : listItems()}</ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Orders;
