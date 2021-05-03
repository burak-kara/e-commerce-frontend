import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Container, ListGroup, Form } from 'react-bootstrap';
import { getAllReviewsByItem, getItemById } from '../../_requests';
import { addToBasket, openAlert } from '../../_redux/actions';
import { PageLoading } from '../../components';
import { BasketIcon } from '../../_utilities/icons';
import StarMaker from '../../components/StarMaker';
import { logo } from '../../_assets';

const ProductDetail = (params) => {
    const history = useHistory();
    const [itemID, setItemID] = useState();
    const [item, setItem] = useState();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (history.location.state) {
            const { id } = history.location.state;
            setItemID(id);
            getItemById(id)
                .then((response) => {
                    setItem(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    params.openAlert({
                        message: 'Error while fetching the item!',
                        severity: 'error',
                    });
                    setLoading(false);
                });
            getAllReviewsByItem(id)
                .then((response) => {
                    setReviews(response.data);
                })
                .catch(() => {
                    params.openAlert({
                        message: 'Error while fetching item reviews!',
                        severity: 'error',
                    });
                    setLoading(false);
                });
        }
    }, []);

    const addBasket = () => {
        params.addToBasket(itemID);
        params.openAlert({
            message: 'Product added to the basket!',
            severity: 'success',
        });
    };

    const Image = () => (
        <img src={item.image || logo} alt="product" className={item.image ? 'image' : 'logo'} />
    );

    const Item = () =>
        !item ? (
            <PageLoading />
        ) : (
            <Row>
                <Col xs={12} xl={6} className="image-col">
                    <Image />
                </Col>
                <Col xs={12} xl={6} className="right-col">
                    <Row className="inner-row">
                        <Col xs={12} xl={12} className="name-col">
                            <div>
                                <span>{item.name}</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={10} className="brand-col">
                            <div>
                                <span>{item.brand}</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={6} className="price-col">
                            <div className="price">
                                <span>{item.price}</span>
                            </div>
                            <div className="ml-2 currency">
                                <span>TL</span>
                            </div>
                        </Col>
                        <Col xs={12} xl={6} className="inner-col">
                            <Row className="upper-row">
                                <Col xs={12} xl={12} className="star-col">
                                    <div className="star-container">
                                        <StarMaker rating={item.mean_rating || 0} size="28px" />
                                    </div>
                                </Col>
                                <Col xs={12} xl={12} className="reviews-col">
                                    <div>
                                        <span>{item.review_count || 0} Reviews</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="bottom-row">
                                <Col xs={12} xl={12} className="basket-col">
                                    <button
                                        className="btn b-btn btn-block"
                                        type="button"
                                        onClick={addBasket}
                                    >
                                        <BasketIcon />
                                        <div className="ml-1">Add to Basket</div>
                                    </button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );

    const Detail = () =>
        !item ? (
            <PageLoading />
        ) : (
            <Row>
                <Col xs={12} xl={12} className="form-col">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        required
                        name="specs"
                        type="text"
                        readOnly
                        defaultValue={item.description}
                        className="comment"
                    />
                </Col>
                <Col xs={12} xl={12} className="form-col">
                    <Form.Label>Specifications</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        required
                        name="specs"
                        type="text"
                        readOnly
                        defaultValue={item.specs}
                        className="comment"
                    />
                </Col>
            </Row>
        );

    const Reviews = () => {
        const list = [];
        reviews.forEach((review) => {
            const { title, comment, date } = review;
            list.push(
                <ListGroup.Item className="list-item" key={review.id}>
                    <Container fluid className="list-item-container">
                        <Row className="list-item-container-row">
                            <Col xs={6} xl={6} className="list-col title mb-3 mb-xl-2">
                                <div>
                                    <span>{title}</span>
                                </div>
                            </Col>
                            <Col xs={6} xl={6} className="list-col star-col mb-xl-2">
                                <StarMaker rating={review.rating || 0} />
                            </Col>
                            <Col xs={12} xl={12} className="list-col comment-col mb-3 mb-xl-2">
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    required
                                    name="specs"
                                    type="text"
                                    readOnly
                                    defaultValue={comment}
                                    className="comment"
                                />
                            </Col>
                            <Col xs={12} xl={12} className="list-col date-col">
                                <div>
                                    <span>{moment(date).format('MMMM Do YYYY, h:mm a')}</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>,
            );
        });
        return list;
    };

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="product-detail">
            <Row>
                <Col
                    className="product-col"
                    xs={{ span: 12, offset: 0 }}
                    md={{ span: 6, offset: 3 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    <Item />
                </Col>
            </Row>
            <Row>
                <Col
                    className="product-detail-col"
                    xs={{ span: 12, offset: 0 }}
                    md={{ span: 6, offset: 3 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    <Detail />
                </Col>
            </Row>
            {reviews.length === 0 ? null : (
                <Row>
                    <Col
                        className="reviews-page-col"
                        xs={{ span: 12, offset: 0 }}
                        md={{ span: 6, offset: 3 }}
                        xl={{ span: 6, offset: 3 }}
                    >
                        <Form.Label>Reviews</Form.Label>
                        <ListGroup variant="flush">
                            <Reviews />
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default connect(null, { openAlert, addToBasket })(ProductDetail);
