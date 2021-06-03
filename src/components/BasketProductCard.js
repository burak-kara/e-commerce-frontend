import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { logo } from '../_assets';
import { Minus, Plus, Delete } from '../_utilities/icons';
import { addToBasket, openAlert, deleteFromBasket, removeFromBasket } from '../_redux/actions';

const BasketProductCard = (props) => {
    const { item, items, onDelete } = props;
    const { image, name, brand, price, id } = item;

    return (
        <Container fluid className="list-item-container">
            <Row className="list-item-container-row">
                <Col xs={4} md={4} xl={2} className="image-container">
                    <img src={image || logo} alt="product" className="image" />
                </Col>
                <Col xs={8} md={8} xl={8} className="info-container">
                    <Row xs={12} md={8} xl={10}>
                        <Col xs={9} md={8} xl={12}>
                            <div className="name">{name || 'Name'}</div>
                        </Col>
                        <Col xs={12} md={6} xl={12}>
                            <div className="brand">{brand || 'Brand'}</div>
                        </Col>
                        <Col xs={12} md={6} xl={12}>
                            <div className="price">
                                <span>{price || 'Price'} ₺</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12} xl={{ span: 1, offset: 1 }} className="action-container">
                    <Row className="h-100">
                        <Col xs={4} md={4} xl={12} className="icon">
                            <button
                                className="btn"
                                name="Add to Basket"
                                type="button"
                                onClick={() => {
                                    props.addToBasket(id);
                                    props.openAlert({
                                        message: 'Product is added successfully!',
                                        severity: 'success',
                                    });
                                }}
                            >
                                <Plus size="2em" />
                            </button>
                        </Col>
                        <Col xs={4} md={4} xl={12} className="icon">
                            <div className="count">{items[id]}</div>
                        </Col>
                        <Col xs={4} md={4} xl={12} className="icon">
                            <button
                                className="btn"
                                name="Delete from Basket"
                                type="button"
                                onClick={() => {
                                    props.deleteFromBasket(id);
                                    onDelete(items[id]);
                                    props.openAlert({
                                        message: 'Product is deleted successfully!',
                                        severity: 'warning',
                                    });
                                }}
                            >
                                {items[id] === 1 ? <Delete size="2em" /> : <Minus size="2em" />}
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, {
    openAlert,
    addToBasket,
    deleteFromBasket,
    removeFromBasket,
})(BasketProductCard);
