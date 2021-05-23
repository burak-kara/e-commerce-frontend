import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { getAllOrders } from '../../_requests';
import { SM_ORDER_STATUS } from '../../_constants';
import { OrderCard, PageLoading } from '../../components';
import { BasketIcon } from '../../_utilities/icons';
import { openAlert } from '../../_redux/actions';

const ManageOrders = (props) => {
    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllOrders()
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while getting orders!',
                    severity: 'error',
                });
                setLoading(false);
            });
    }, []);

    const handleClick = (id) => {
        history.push({
            pathname: SM_ORDER_STATUS,
            state: { id },
        });
    };

    const ListItems = () => {
        if (loading) {
            return <PageLoading />;
        }
        if (orders.length === 0) {
            return (
                <ListGroup.Item className="list-item empty" key="empty-basket">
                    <Row noGutters className="h-100 w-100">
                        <Col
                            xs={{ span: 12, offset: 0 }}
                            md={{ span: 6, offset: 6 }}
                            xl={{ span: 4, offset: 4 }}
                            className="h-50"
                        >
                            <div className="icon">
                                <BasketIcon />
                            </div>
                        </Col>
                        <Col
                            xs={{ span: 12, offset: 0 }}
                            md={{ span: 6, offset: 6 }}
                            xl={{ span: 6, offset: 3 }}
                            className="h-50"
                        >
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <div className="text">You don't have any previous order</div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        }
        const list = [];
        orders.forEach((item) => {
            list.push(
                <ListGroup.Item className="list-item" key={item.id}>
                    <OrderCard order={item} onClick={handleClick} />
                </ListGroup.Item>,
            );
        });
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
                        <ListItems />
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(ManageOrders);
