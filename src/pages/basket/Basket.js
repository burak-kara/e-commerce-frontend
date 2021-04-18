import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { openAlert, addToBasket, deleteFromBasket, removeFromBasket } from '../../_redux/actions';
import { getItemById } from '../../_requests';
import { BasketProductCard, PageLoading } from '../../components';

const Basket = (props) => {
    const { basket } = useStore().getState();
    const [basketItems, setBasketItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = () => {
        if (basket && basket.items) {
            setLoading(true);
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
        fetchItems();
    }, [loading]);

    const handleClick = () => {
        // TODO open product details, change pathname
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
                        <BasketProductCard item={item} {...props} />
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
                        <ListGroup variant="flush">
                            {loading ? <PageLoading /> : listItems()}
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={12} xl={2} className="">
                        Total vs
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
