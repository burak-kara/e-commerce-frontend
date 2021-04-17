import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { openAlert, addToBasket, deleteFromBasket, removeFromBasket } from '../../_redux/actions';
import { getItemById } from '../../_requests';
import { BasketProductCard, PageLoading } from '../../components';

const Basket = () => {
    const { basket } = useStore().getState();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (basket && basket.items) {
            setLoading(true);
            Object.keys(basket.items).forEach((key) => {
                getItemById(key)
                    .then((response) => {
                        const item = response.data;
                        // eslint-disable-next-line no-shadow
                        setItems((items) => [...items, item]);
                    })
                    .catch(() => {});
            });
        }
        setLoading(false);
    }, []);

    const listItems = () => {
        const list = [];
        if (items) {
            items.forEach((item) => {
                list.push(
                    <ListGroup.Item className="list-item">
                        <BasketProductCard item={item} count={basket.items[item.id]} />
                    </ListGroup.Item>,
                );
            });
        }
        return list;
    };

    return (
        <>
            <Container fluid className="basket-page">
                <Row>
                    <Col xs={12} md={12} xl={10}>
                        <ListGroup>{loading ? <PageLoading /> : listItems()}</ListGroup>
                    </Col>
                    <Col xs={12} md={12} xl={2} className="">
                        Total vs
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default connect(null, {
    openAlert,
    addToBasket,
    deleteFromBasket,
    removeFromBasket,
})(Basket);
