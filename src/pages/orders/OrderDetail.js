import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { PageLoading } from '../../components';
import { logo } from '../../_assets';

const orderItemss = [
    {
        id: '1',
        image: 'https://cutt.ly/Mx6A2pw',
        name: 'Model 3',
        brand: 'Tesla',
        price: '99,95',
        count: 2,
    },
    {
        id: '2',
        image: 'https://cutt.ly/sx6Ah6A',
        name: 'IPhone 11',
        brand: 'Apple',
        price: '789,95',
        count: 3,
    },
];

const orderr = {
    status: -1,
    id: '876598',
    total_price: '99,95',
    date: '25 Mart Per, 11:16',
    items: { 1: 1, 2: 1, 3: 3, 4: 3, 6: 3, 7: 3 },
};

const OrderDetail = () => {
    const history = useHistory();
    const [orderId, setOrderId] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(false);

    console.log('detail');
    console.log(orderId);
    console.log(order);

    useEffect(() => {
        if (history.location.state) {
            const { id } = history.location.state;
            setOrderId(id);
            setLoading(false);
            setOrderItems(orderItemss); // TODO change
            setOrder(orderr); // TODO change
            // TODO getOrder
        }
    }, []);

    const onClick = () => {
        // TODO open modal for review
    };

    const ListItems = () => {
        const list = [];
        if (orderItems !== 0) {
            orderItems.forEach((item) => {
                list.push(
                    <ListGroup.Item className="list-item" key={item.id}>
                        <Container fluid className="list-item-container">
                            <Row className="list-item-container-row">
                                <Col xs={4} xl={2} className="list-col images-col mb-3 mb-xl-0">
                                    <img src={item.image || logo} alt="product" className="image" />
                                </Col>
                                <Col xs={8} xl={6} className="list-col mb-3 mb-xl-0">
                                    <Row className="h-100">
                                        <Col xl={12} className="name-col pl-1 h-25">
                                            <div>
                                                <span>{item.name || 'Name'}</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} className="brand-col pl-1 h-25">
                                            <div>
                                                <span>{item.brand || 'Brand'}</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} className="price-col pl-1 h-50">
                                            <div className="mr-1">
                                                <span>Total Price: </span>
                                            </div>
                                            <div className="mr-1">
                                                <span>{parseInt(item.price, 10) * item.count}</span>
                                            </div>
                                            <div className="currency">
                                                <span>TL</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={6} xl={2} className="list-col count-col">
                                    <div className="mr-1">
                                        <span>Count:</span>
                                    </div>
                                    <div>
                                        <span>{item.count || 'Count'}</span>
                                    </div>
                                </Col>
                                <Col xs={6} xl={2} className="list-col btn-col">
                                    <button
                                        type="button"
                                        className="btn btn-block"
                                        onClick={onClick}
                                    >
                                        Review
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>,
                );
            });
        }
        return list;
    };

    const Content = () => (loading ? <PageLoading /> : <ListItems />);

    return (
        <Container fluid className="order-details">
            <Row>
                <Col
                    className="detail-col"
                    xs={{ span: 12, offset: 0 }}
                    md={{ span: 6, offset: 3 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    <ListGroup variant="flush">
                        <Content />
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetail;
