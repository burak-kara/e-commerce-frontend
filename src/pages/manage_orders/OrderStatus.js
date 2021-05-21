import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup, Form } from 'react-bootstrap';
import { PDFExport } from '@progress/kendo-react-pdf';
import moment from 'moment';
import firebase from 'firebase';
import { PageLoading } from '../../components';
import { logo } from '../../_assets';
import { getAddressesByUserID, getItemById, getOrderDetail, updateOrder } from '../../_requests';
import { openAlert } from '../../_redux/actions';
import { ORDER_STATUS, S_M_ORDERS, TIME_OUT } from '../../_constants';

const initialForm = {};

const OrderStatus = (props) => {
    const history = useHistory();
    const pdfExportComponent = useRef(null);
    const contentArea = useRef(null);
    const [order, setOrder] = useState();
    const [orderID, setOrderID] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [itemCounts, setItemCounts] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fireBaseConfig = {
        apiKey: 'AIzaSyCsVmQ0R8nX7QTZFJxgZNemFT4urDBW7J0',
        authDomain: 'e-commerce-ozu.firebaseapp.com',
        databaseURL: 'https://e-commerce-ozu-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'e-commerce-ozu',
        storageBucket: 'e-commerce-ozu.appspot.com',
        messagingSenderId: '115048619599',
        appId: '1:115048619599:web:609b04692351d188f7943a',
        measurementId: 'G-JTW10KDD0C',
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(fireBaseConfig);
    } else {
        firebase.app();
    }

    useEffect(() => {
        setLoading(true);
        if (history.location.state) {
            const { id } = history.location.state;
            setOrderItems([]);
            setOrderID(id);
            getOrderDetail(id)
                .then((response) => {
                    const { data } = response;
                    setOrder(data);
                    const { items, item_counts, buyer } = data;
                    setItemCounts(item_counts.split(','));
                    items.forEach((item_id) => {
                        getItemById(item_id).then((r) => {
                            setOrderItems((basketItems) => [...basketItems, r.data]);
                            setLoading(false);
                        });
                    });
                    getAddressesByUserID(buyer).then((r) => {
                        setAddresses(r.data.replaceAll("'", '').split(','));
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
        if (field === 'status') {
            setForm({
                ...form,
                [field]: Object.keys(ORDER_STATUS).find((key) => ORDER_STATUS[key] === value),
            });
        } else {
            setForm({
                ...form,
                [field]: value,
            });
        }
    };

    const sendPushNotification = (orderUpdateData) => {
        let prevOrderStatus = null;
        let prevOrderAddress = null;
        let newOrderStatus = null;
        let newOrderAddress = null;
        const database = firebase
            .database()
            .ref()
            .child(`/notifications/${order.buyer}/${orderID}`);
        // Doesn't correctly get the prev data from firebase, may need a fix.
        // This is just for keeping data consistent on firebase realtime db.
        database.once('value', (data) => {
            prevOrderStatus = data.val().order_status;
            prevOrderAddress = data.val().delivery_address;
        });
        if (orderUpdateData.status) {
            newOrderStatus = parseInt(orderUpdateData.status, 10);
        }
        if (orderUpdateData.delivery_address) {
            newOrderAddress = orderUpdateData.delivery_address;
        }
        database.set({
            order_id: orderID,
            order_status: newOrderStatus !== null ? newOrderStatus : prevOrderStatus,
            order_address: newOrderAddress !== '' ? newOrderAddress : prevOrderAddress,
        });
    };

    const onConfirm = () => {
        const data = {
            id: orderID,
            ...form,
        };
        sendPushNotification(data);
        updateOrder(data)
            .then(() => {
                props.openAlert({
                    message: 'Order is updated!',
                    severity: 'success',
                });
                setTimeout(() => {
                    history.push({
                        pathname: S_M_ORDERS,
                    });
                }, TIME_OUT);
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while updating order!',
                    severity: 'error',
                });
            });
        setForm(initialForm);
    };

    const onExport = () => {
        pdfExportComponent.current.save();
    };

    const AddressOptions = () => {
        const options = [
            <option key="default">{order ? order.delivery_address : 'Address'}</option>,
        ];
        addresses.forEach((add) => {
            options.push(<option key={add}>{add}</option>);
        });
        return options;
    };

    const StatusOptions = () => {
        const options = [<option key="default">{ORDER_STATUS[order ? order.status : 0]}</option>];
        Object.keys(ORDER_STATUS).forEach((key) => {
            options.push(<option key={key}>{ORDER_STATUS[key]}</option>);
        });
        return options;
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
                                <Col xs={12} xl={4} className="list-col count-col">
                                    <div className="mr-1">
                                        <span>Count:</span>
                                    </div>
                                    <div>
                                        <span>{itemCounts[index] || 'Count'}</span>
                                    </div>
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
                                                xs={{ span: 12, order: 1 }}
                                                xl={{ span: 4, order: 1 }}
                                                className="list-col address-col mb-3 mb-xl-0"
                                            >
                                                <div className="title">
                                                    <span>Delivery Address</span>
                                                </div>
                                                <div className="address">
                                                    <Form.Control
                                                        as="select"
                                                        className="dropdown"
                                                        variant="outline-secondary"
                                                        defaultValue="Choose Address"
                                                        onChange={(e) =>
                                                            onChange(
                                                                'delivery_address',
                                                                e.target.value,
                                                            )
                                                        }
                                                        value={form.delivery_address}
                                                    >
                                                        <AddressOptions />
                                                    </Form.Control>
                                                </div>
                                            </Col>
                                            <Col
                                                xs={{ span: 6, order: 2 }}
                                                xl={2}
                                                className="list-col date-col mb-3 mb-xl-0"
                                            >
                                                <div className="title">
                                                    <span>Date</span>
                                                </div>
                                                <div className="date">
                                                    <span>
                                                        {order
                                                            ? moment(order.date).format(
                                                                  'MMMM Do YYYY',
                                                              )
                                                            : 'Date'}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col
                                                xs={{ span: 12, order: 1 }}
                                                xl={{ span: 4, order: 1 }}
                                                className="list-col status-col"
                                            >
                                                <div className="title">
                                                    <span>Status</span>
                                                </div>
                                                <div className="status">
                                                    <Form.Control
                                                        as="select"
                                                        className="dropdown"
                                                        variant="outline-secondary"
                                                        defaultValue="Choose Status"
                                                        onChange={(e) =>
                                                            onChange('status', e.target.value)
                                                        }
                                                        value={ORDER_STATUS[form.status]}
                                                    >
                                                        <StatusOptions />
                                                    </Form.Control>
                                                </div>
                                            </Col>
                                            <Col
                                                xs={{ span: 6, order: 2 }}
                                                xl={2}
                                                className="list-col"
                                            >
                                                <div className="title">
                                                    <span>Total Price</span>
                                                </div>
                                                <div className="total-col">
                                                    <div className="total">
                                                        <span>
                                                            {order ? order.total_price : 'Status'}
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
                            className="detail-col mt-2"
                            xs={{ span: 12, offset: 0 }}
                            md={{ span: 6, offset: 3 }}
                            xl={{ span: 2, offset: 7 }}
                        >
                            <ListGroup variant="flush">
                                <button
                                    type="button"
                                    className="btn btn-primary noExport"
                                    onClick={onConfirm}
                                >
                                    Save
                                </button>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="detail-col mt-2"
                            xs={{ span: 12, offset: 0 }}
                            md={{ span: 6, offset: 3 }}
                            xl={{ span: 2, offset: 7 }}
                        >
                            <ListGroup variant="flush">
                                <button
                                    type="button"
                                    className="btn export-btn btn-block noExport"
                                    name="Export PDF"
                                    onClick={onExport}
                                >
                                    Export as PDF
                                </button>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            </Container>
        </PDFExport>
    );
};

export default connect(null, { openAlert })(OrderStatus);
