import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import { Badge } from '@material-ui/core';
import { PageLoading } from '../../components';
import { BasketIcon } from '../../_utilities/icons';
import { getAllReviews, updateReview } from '../../_requests';
import ReviewCard from '../../components/ReviewCard';
import { openAlert } from '../../_redux/actions';

const Reviews = (props) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = () => {
        setLoading(true);
        setReviews([]);
        getAllReviews()
            .then((response) => {
                setReviews(response.data);
                setLoading(false);
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while getting reviews!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleReject = (id) => {
        const data = {
            id,
            is_approved: false,
        };
        updateReview(data).then(() => {
            props.openAlert({
                message: 'Review Rejected!',
                severity: 'warn',
            });
            fetchItems();
        });
    };

    const handleApprove = (id) => {
        const data = {
            id,
            is_approved: true,
        };
        updateReview(data).then(() => {
            props.openAlert({
                message: 'Review approved!',
                severity: 'success',
            });
            fetchItems();
        });
    };

    const ListItems = () => {
        if (loading) {
            return <PageLoading />;
        }
        if (reviews.length === 0) {
            return (
                <ListGroup.Item className="list-item empty" key="empty-basket">
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
                            <div className="text">You don't have any reviews</div>
                        </Col>
                    </Row>
                </ListGroup.Item>
            );
        }
        const list = [];
        reviews.forEach((item) => {
            if (!item.is_approved) {
                list.push(
                    <Badge color="primary" variant="dot" className="badge" key={item.id}>
                        <ListGroup.Item className="list-item">
                            <ReviewCard
                                item={item}
                                handleReject={handleReject}
                                handleApprove={handleApprove}
                            />
                        </ListGroup.Item>
                    </Badge>,
                );
            }
        });
        reviews.forEach((item) => {
            if (item.is_approved) {
                list.push(
                    <div className="badge" key={item.id}>
                        <ListGroup.Item className="list-item">
                            <ReviewCard
                                item={item}
                                handleReject={handleReject}
                                handleApprove={handleApprove}
                            />
                        </ListGroup.Item>
                    </div>,
                );
            }
        });
        return list;
    };

    return (
        <Container fluid className="reviews-page">
            <Row>
                <Col
                    className="reviews-page-col"
                    xs={{ span: 12, offset: 0 }}
                    md={{ span: 6, offset: 3 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    <ListGroup variant="flush">
                        <ListItems />
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};
export default connect(null, { openAlert })(Reviews);
