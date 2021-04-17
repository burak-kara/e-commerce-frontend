import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { logo } from '../_assets';
import { Minus, Plus } from '../_utilities/icons';

const BasketProductCard = (params) => {
    const { item, count } = params;
    const { image, name, brand, price } = item;

    return (
        <Container fluid className="list-item-container">
            <Row className="list-item-container-row">
                <Col xs={4} md={4} xl={2} className="image-container">
                    <img src={image || logo} alt="product" className="image" />
                </Col>
                <Col xs={8} md={8} xl={9} className="">
                    <Row xs={9} md={8} xl={10}>
                        <Col xs={9} md={8} xl={10}>
                            {name  || "Name"}
                        </Col>
                        <Col xs={3} md={4} xl={2}>
                            Fav
                        </Col>
                    </Row>
                    <Row xs={9} md={8} xl={10}>
                        <Col xs={6} md={6} xl={12}>
                            {brand || "Brand"}
                        </Col>
                        <Col xs={6} md={6} xl={12}>
                            {price || "Price"}
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={12} xl={1} className="action-container">
                    <Row className="h-100">
                        <Col xs={4} md={6} xl={12} className="icon">
                            <button className="btn" type="button">
                                <Plus size="2em" />
                            </button>
                        </Col>
                        <Col xs={4} md={6} xl={12} className="icon">
                            <div className="count">{count || '0'}</div>
                        </Col>
                        <Col xs={4} md={6} xl={12} className="icon">
                            <button className="btn" type="button">
                                <Minus size="2em" />
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default BasketProductCard;
