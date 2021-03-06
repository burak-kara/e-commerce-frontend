import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { PDFExport } from '@progress/kendo-react-pdf';
import { PageLoading } from '../../components';
import { logo } from '../../_assets';
import { getItemById, getOrderDetail, newReview, retrieveRating } from '../../_requests';
import { openAlert } from '../../_redux/actions';
import ReviewModal from './ReviewModal';
import { ORDER_STATUS } from '../../_constants';

const initialForm = {
    title: '',
    rating: '5',
    comment: '',
    item: '',
};

const OrderDetail = (props) => {
    const history = useHistory();
    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);
    const { user } = useStore().getState();
    const [orderItems, setOrderItems] = useState([]);
    const [order, setOrder] = useState();
    const [loading, setLoading] = useState(false);
    const [retrieveLoading, setRetrieveLoading] = useState(false);
    const [itemCounts, setItemCounts] = useState(false);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [rating, setRating] = useState(5);

    useEffect(() => {
        if (history.location.state) {
            const { id } = history.location.state;
            setOrderItems([]);
            getOrderDetail(id)
                .then((response) => {
                    const { data } = response;
                    setOrder(data);
                    const { items, item_counts } = data;
                    setItemCounts(item_counts.split(','));
                    items.forEach((item_id) => {
                        getItemById(item_id).then((r) => {
                            setOrderItems((basketItems) => [...basketItems, r.data]);
                            setLoading(false);
                        });
                    });
                })
                .catch(() => {
                    props.openAlert({
                        message: 'Error while getting order detail!',
                        severity: 'error',
                    });
                    setLoading(false);
                });
        }
    }, []);

    const onChange = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
        if (field === 'rating') {
            setRating(value);
        }
    };

    const onRetrieveRating = () => {
        const { comment } = form;
        setRetrieveLoading(true);
        retrieveRating({ comment })
            .then((response) => {
                setForm({
                    ...form,
                    rating: response.data.retrieved_rating,
                });
                setRating(response.data.retrieved_rating);
                setRetrieveLoading(false);
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while retrieving rating!',
                    severity: 'error',
                });
                setRetrieveLoading(false);
            });
    };

    const onConfirm = () => {
        const data = {
            user: user.pk,
            ...form,
        };
        newReview(data)
            .then(() => {
                props.openAlert({
                    message: 'Review is sent for approval!',
                    severity: 'success',
                });
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while adding new review!',
                    severity: 'error',
                });
            });
        setModal(false);
        setForm(initialForm);
    };

    const onExport = () => {
        pdfExportComponent.current.save();
    };

    const Content = () => {
        const list = [];
        if (orderItems.length !== 0) {
            orderItems.forEach((item, index) => {
                list.push(
                    <ListGroup.Item className="list-item" key={item.id}>
                        <Container fluid className="list-item-container">
                            <Row className="list-item-container-row">
                                <Col xs={4} xl={2} className="list-col images-col mb-3 mb-xl-0">
                                    <img src={item.image || logo} alt="product" className="image" />
                                </Col>
                                <Col xs={8} xl={6} className="list-col mb-3 mb-xl-0">
                                    <Row>
                                        <Col xl={12} className="name-col pl-1">
                                            <div>
                                                <span>{item.name || 'Name'}</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} className="brand-col pl-1">
                                            <div>
                                                <span>{item.brand || 'Brand'}</span>
                                            </div>
                                        </Col>
                                        <Col xl={12} className="price-col pl-1">
                                            <div className="mr-1">
                                                <span>Total Price: </span>
                                            </div>
                                            <div className="mr-1">
                                                <span>
                                                    {parseInt(item.price, 10) * itemCounts[index]}
                                                </span>
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
                                        <span>{itemCounts[index] || 'Count'}</span>
                                    </div>
                                </Col>
                                <Col xs={6} xl={2} className="list-col btn-col">
                                    <button
                                        className="btn btn-block noExport"
                                        name="Review"
                                        type="button"
                                        onClick={() => {
                                            onChange('item', item.id);
                                            setModal(true);
                                        }}
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

    return loading ? (
        <PageLoading />
    ) : (
        <>
            <PDFExport
                ref={pdfExportComponent}
                paperSize="A0"
                fileName={`order_${order ? order.date : ''}.pdf`}
                creator="OzU Store"
            >
                <Container fluid className="order-details">
                    <div ref={contentArea}>
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
                        <Row>
                            <Col
                                className="detail-col"
                                xs={{ span: 12, offset: 0 }}
                                md={{ span: 6, offset: 3 }}
                                xl={{ span: 6, offset: 3 }}
                            >
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="info-list-item">
                                        <Container>
                                            <Row>
                                                <Col
                                                    xs={6}
                                                    xl={3}
                                                    className="list-col address-col mb-3 mb-xl-0"
                                                >
                                                    <div className="title">
                                                        <span>Delivery Address</span>
                                                    </div>
                                                    <div className="address">
                                                        <span>
                                                            {order
                                                                ? order.delivery_address
                                                                : 'Address'}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col
                                                    xs={6}
                                                    xl={3}
                                                    className="list-col date-col mb-3 mb-xl-0"
                                                >
                                                    <div className="title">
                                                        <span>Date</span>
                                                    </div>
                                                    <div className="date">
                                                        <span>{order ? order.date : 'Date'}</span>
                                                    </div>
                                                </Col>
                                                <Col xs={6} xl={3} className="list-col status-col">
                                                    <div className="title">
                                                        <span>Status</span>
                                                    </div>
                                                    <div className="status">
                                                        <span>
                                                            {order
                                                                ? ORDER_STATUS[order.status]
                                                                : 'Status'}
                                                        </span>
                                                    </div>
                                                </Col>
                                                <Col xs={6} xl={3} className="list-col">
                                                    <div className="title">
                                                        <span>Total Price</span>
                                                    </div>
                                                    <div className="total-col">
                                                        <div className="total">
                                                            <span>
                                                                {order ? order.total_price : '0'}
                                                            </span>
                                                        </div>
                                                        <div className="currency ml-1">
                                                            <span>TL</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                className="detail-col"
                                xs={{ span: 12, offset: 0 }}
                                md={{ span: 2, offset: 7 }}
                                xl={{ span: 2, offset: 7 }}
                            >
                                <button
                                    type="button"
                                    className="btn export-btn btn-block noExport"
                                    name="Export PDF"
                                    onClick={onExport}
                                >
                                    Export as PDF
                                </button>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </PDFExport>
            <ReviewModal
                show={modal}
                rating={rating}
                onHide={() => setModal(false)}
                onReview={onConfirm}
                onChange={onChange}
                retrieveRating={onRetrieveRating}
                loading={retrieveLoading}
            />
        </>
    );
};

export default connect(null, { openAlert })(OrderDetail);
