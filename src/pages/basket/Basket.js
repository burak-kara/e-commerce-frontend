import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { openAlert, addToBasket, deleteFromBasket, removeFromBasket } from '../../_redux/actions';
import { getItemById } from '../../_requests';
import { BasketProductCard, PageLoading } from '../../components';
import { BasketIcon } from '../../_utilities/icons';

const Basket = (props) => {
    const { basket } = useStore().getState();
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(false);

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
    }, [loading]);

    const handleClick = () => {
        // TODO open product details, change pathname
    };

    const onDelete = (count) => {
        if (!count || count === 0) {
            fetchItems();
        }
    };

    const listItems = () => {
        const list = [];
        if (basketItems) {
            basketItems.forEach((item) => {
                list.push(
                    <ListGroup.Item
                        className="list-item"
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                    >
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
                            xl={{ span: 6, offset: 3}}
                            className="h-50"
                        >
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <div className="text">You don't have anything in your basket</div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        }
        if (basket.itemCount !== basketItems.length) return <PageLoading />;

        return listItems();
    };

    return (
        <>
            <Container fluid className="basket-page">
                <Row noGutters className="w-100">
                    <Col xs={12} md={12} xl={10}>
                        <ListGroup variant="flush">{renderContent()}</ListGroup>
                    </Col>
                    <Col xs={12} md={12} xl={2} className="total bg-danger">
                        <Row>
                            <Col>
                                Total Price
                            </Col>
                            <Col>
                                <button type="button">Check Out</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => state.basket;

export default connect(mapStateToProps, {
    openAlert,
    addToBasket,
    deleteFromBasket,
    removeFromBasket,
})(Basket);
