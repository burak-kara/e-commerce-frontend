import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup, Form, NavDropdown } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { getItemById, getTotalPrice, newOrder } from '../../_requests';
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

const Basket = (props) => {
    const { basket, user } = useStore().getState();
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [applied, setApplied] = useState(false);
    const [total, setTotal] = useState();
    const [appliedCampaigns, setAppliedCampaigns] = useState();

    const fetchItems = () => {
        if (basket && basket.items) {
            setBasketItems([]);
            Object.keys(basket.items).forEach((key) => {
                getItemById(key)
                    .then((response) => {
                        const item = response.data;
                        // eslint-disable-next-line no-shadow
                        setBasketItems((basketItems) => [...basketItems, item]);
                    })
                    .catch(() => {});
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchItems();
        setAddresses(user.addresses ? user.addresses.replace(/'/g, '').split(',') : []);
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

    const applyCampaign = () => {
        const body = { items: basket.items };
        getTotalPrice(body)
            .then((response) => {
                setTotal(response.data.total_price);
                setAppliedCampaigns(response.data.applied_campaigns);
                setApplied(true);
                props.openAlert({
                    message: 'Campaigns are applied!',
                    severity: 'success',
                });
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while applying campaigns!',
                    severity: 'error',
                });
            });
    };

    const onConfirm = () => {
        const body = { items: basket.items, delivery_address: address };
        setPaymentLoading(true);
        newOrder(body)
            .then(() => {
                props.removeBasket();
                props.openAlert({
                    message: 'Order is successfully created!',
                    severity: 'success',
                });
                setModal(false);
                setPaymentLoading(false);
            })
            .catch((error) => {
                setPaymentLoading(false);
                setModal(false);
                if (
                    error.response.status === 400 &&
                    error.response.data.total_price > error.response.data.wallet_balance
                ) {
                    props.openAlert({
                        message: 'Insufficient funds in your wallet! Unable to place the order!',
                        severity: 'error',
                    });
                } else {
                    props.openAlert({
                        message: 'Error during checkout!',
                        severity: 'error',
                    });
                }
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
                        <BasketProductCard
                            item={item}
                            {...props}
                            onDelete={onDelete}
                            setApplied={setApplied}
                        />
                    </ListGroup.Item>,
                );
            });
        }
        return list;
    };

    const Content = () => {
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

    const Campaigns = () => {
        if (!applied || basketItems.length === 0) {
            return null;
        }
        const campaigns = [
            <div className="applied">
                <span>Campaigns on this basket</span>
            </div>,
        ];
        Object.keys(appliedCampaigns).forEach((key) => {
            const item = basketItems.filter((obj) => obj.id === parseInt(key, 10));
            campaigns.push(
                item.length !== 0 ? (
                    <>
                        <NavDropdown.Divider />
                        <div className="name">
                            <span>{item[0].name}</span>
                        </div>
                        <div className="campaign">
                            <span>{appliedCampaigns[key].name}</span>
                        </div>
                    </>
                ) : null,
            );
        });

        return campaigns;
    };

    return (
        <>
            <Container fluid className="basket-page">
                <Row noGutters className="w-100">
                    <Col xs={12} sm={8} md={8} lg={9} xl={9}>
                        <ListGroup variant="flush">
                            <Content />
                        </ListGroup>
                    </Col>
                    <Col xs={12} sm={4} md={4} lg={3} xl={3} className="total">
                        <Row>
                            <Col xl={12} className="mb-1">
                                <div className="title">
                                    <span>TOTAL PRICE</span>
                                </div>
                            </Col>
                            <Col xl={12} className="mb-1">
                                <div className="total-price">
                                    <span>
                                        {applied ? total : basket.total || ''}
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
                                    defaultValue="Choose address"
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
                                >
                                    <Options />
                                </Form.Control>
                            </Col>
                            <Col xl={12} className="mb-1">
                                <button
                                    className="btn btn-block"
                                    name="Checkout"
                                    type="button"
                                    onClick={applied ? onCheckout : applyCampaign}
                                    disabled={!Object.keys(basket.items).length}
                                >
                                    <div className="ml-1">
                                        {applied ? 'Check Out' : 'Apply Campaigns'}
                                    </div>
                                </button>
                            </Col>
                            <Col xl={12}>
                                <Campaigns />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <DiscardModal
                show={modal}
                onHide={() => setModal(false)}
                onDiscard={onConfirm}
                paymentLoading={paymentLoading}
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
