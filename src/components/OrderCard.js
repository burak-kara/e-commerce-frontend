import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import {
    Approved,
    Arrived,
    SingleCheck,
    DoubleCheck,
    Path,
    Rejected,
    Waiting,
} from '../_utilities/icons';
import { getItemById } from '../_requests';
import { getOrderStatus } from '../_utilities/functions';

const OrderCard = (props) => {
    const { order, onClick } = props;
    const { status, id, total_price, date, items } = order;
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages([]);
        items.forEach((key) => {
            getItemById(key).then((response) => {
                // eslint-disable-next-line no-shadow
                setImages((images) => [...images, response.data.image]);
            });
        });
    }, []);

    const Images = () => {
        const imgs = [];
        images.forEach((image, index) => {
            if (index < 5) {
                imgs.push(
                    <img
                        src={image}
                        alt="product"
                        className="image"
                        key={image}
                        style={{ left: `${index * 20}px` }}
                    />,
                );
            }
        });
        return imgs;
    };

    const Status = () => {
        const content = [];
        switch (status) {
            case 0:
                content.push(<Waiting className="icon wait" />);
                break;
            case 1:
                content.push(<SingleCheck className="icon approve" />);
                break;
            case 2:
                content.push(<DoubleCheck className="icon approve" />);
                break;
            case 3:
                content.push(<Approved className="icon approve" />);
                break;
            case 4:
                content.push(<Path className="icon ship" />);
                break;
            case 5:
                content.push(<Arrived className="icon arrived" />);
                break;
            case 6:
                content.push(<Rejected className="icon reject" />);
                break;
            default:
                content.push(<Waiting className="icon wait" />);
                break;
        }
        content.push(<span>{getOrderStatus(status)}</span>);
        return content;
    };

    return (
        <Container fluid className="list-item-container">
            <Row className="list-item-container-row">
                <Col xs={4} xl={2} className="list-col images-col mb-3 mb-xl-0">
                    <Images />
                </Col>
                <Col xs={4} xl={3} className="list-col mb-3 mb-xl-0">
                    <Row>
                        <Col xl={12} className="id-col ml-1">
                            <div className="mr-1">
                                <span>Order ID:</span>
                            </div>
                            <div className="currency">
                                <span>{id}</span>
                            </div>
                        </Col>
                        <Col xl={12} className="date-col ml-1">
                            <div className="mr-1">
                                <span>{date}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} xl={3} className="list-col status-col mb-3 mb-xl-0">
                    <Status />
                </Col>
                <Col xs={6} xl={2} className="list-col price-col">
                    <div className="mr-1">
                        <span>{total_price}</span>
                    </div>
                    <div className="currency">
                        <span>TL</span>
                    </div>
                </Col>
                <Col xs={6} xl={2} className="list-col btn-col">
                    <button type="button" className="btn btn-block" onClick={() => onClick(id)}>
                        Details
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderCard;
