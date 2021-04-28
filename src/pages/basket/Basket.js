import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup, Form } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { getItemById, newOrder } from '../../_requests';
import { BasketIcon } from '../../_utilities/icons';
import { BasketProductCard, DiscardModal, PageLoading } from '../../components';
import {
    openAlert,
    addToBasket,
    deleteFromBasket,
    removeFromBasket,
    calculateTotal,
    removeBasket,
} from '../../_redux/actions';

const addressesss = [
    'Özyeğin University Orman Sk. Cekmekoy Istanbul',
    'Boğaziçi Üniversitesi 34342 Bebek/İstanbul Türkiye',
];

const Basket = (props) => {
    const { basket, user } = useStore().getState();
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);

    const fetchItems = () => {
        if (basket && basket.items) {
            setBasketItems([]);
            Object.keys(basket.items).forEach((key) => {
                getItemById(key)
                    .then((response) => {
                        const item = response.data;
                        // eslint-disable-next-line no-shadow
                        setBasketItems((basketItems) => [...basketItems, item]);
                        // TODO get addresses of the user
                        setAddresses(addressesss);
                    })
                    .catch(() => {});
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchItems();
    }, [loading]);

    useEffect(() => {
        props.calculateTotal(basketItems);
    }, [basketItems, basket.firer]);

    const onCheckout = () => {
        if (!(user && user.first_name)) {
            props.openAlert({
                message: 'You have to login to complete checkout',
                severity: 'warning',
            });
        } else if (address === '' || address === 'Choose Delivery Address') {
            props.openAlert({
                message: 'Choose Delivery Address',
                severity: 'warning',
            });
        } else {
            setModal(true);
        }
    };

    const onConfirm = () => {
        const body = { items: basket.items, delivery_address: address };
        props.removeBasket();
        newOrder(body)
            .then(() => {
                props.openAlert({
                    message: 'Order is created',
                    severity: 'success',
                });
                setModal(false);
            })
            .catch(() => {
                setModal(false);
                props.openAlert({
                    message: 'Error during checkout',
                    severity: 'error',
                });
            });
    };

    const onDelete = (count) => {
        if (!count || count === 0) {
            fetchItems();
        }
    };

    const Options = () => {
        const options = [<option key="default">Choose Delivery Address</option>];
        addresses.forEach((add) => {
            options.push(<option key={add}>{add}</option>);
        });
        return options;
    };

    const ListItems = () => {
        const list = [];
        if (basketItems) {
            basketItems.forEach((item) => {
                list.push(
                    <ListGroup.Item className="list-item" key={item.id}>
                        <BasketProductCard item={item} {...props} onDelete={onDelete} />
                    </ListGroup.Item>,
                );
            });
        }
        return list;
    };

    const renderContent = () => {
        if (basket.itemCount === 0) {
            return (
                <ListGroup.Item className="empty" key="empty-basket">
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
                            <div className="text">You don't have anything in your basket</div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        }
        return basket.itemCount !== basketItems.length ? <PageLoading /> : <ListItems />;
    };

    return (
        <>
            <Container fluid className="basket-page">
                <Row noGutters className="w-100">
                    <Col xs={12} md={12} xl={10}>
                        <ListGroup variant="flush">{renderContent()}</ListGroup>
                    </Col>
                    <Col xs={12} md={12} xl={2} className="total">
                        <Row>
                            <Col xl={12} className="mb-1">
                                <div className="title">
                                    <span>TOTAL PRICE</span>
                                </div>
                            </Col>
                            <Col xl={12} className="mb-1">
                                <div className="total-price">
                                    <span>
                                        {basket.total || ''}
                                        <span className="currency ml-1">
                                            {basket.total ? 'TL' : ''}
                                        </span>
                                    </span>
                                </div>
                            </Col>
                            <Col xl={12} className="mb-1">
                                <Form.Control
                                    as="select"
                                    className="dropdown"
                                    variant="outline-secondary"
                                    defaultValue="Choose address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                >
                                    <Options />
                                </Form.Control>
                            </Col>
                            <Col xl={12}>
                                <button
                                    className="btn btn-block"
                                    type="button"
                                    onClick={onCheckout}
                                    disabled={!Object.keys(basket.items).length}
                                >
                                    <div className="ml-1">Check Out</div>
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <DiscardModal
                show={modal}
                onHide={() => setModal(false)}
                onDiscard={onConfirm}
                header="Checkout"
                leftBtnText="Continue Shopping"
                buttonText="Confirm Checkout"
                btnColor="checkout"
                body="Confirm Checkout"
            />
        </>
    );
};

const mapStateToProps = (state) => state.basket;

export default connect(mapStateToProps, {
    openAlert,
    addToBasket,
    deleteFromBasket,
    removeFromBasket,
    calculateTotal,
    removeBasket,
})(Basket);
