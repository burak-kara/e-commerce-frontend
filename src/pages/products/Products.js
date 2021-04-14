import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Alert, ProductCard } from '../../components';
import { getItemsByCategory } from '../../_requests';

const Products = (params) => {
    const location = useLocation();
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [chosenId, setId] = useState('');
    const [category, setCategory] = useState();
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        setCategory(params.category.substring(1));
    }, [location]);

    useEffect(() => {
        setLoading(true);
        if (category) {
            getItemsByCategory(category)
                .then((response) => {
                    setItems(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    setMessage('Error while fetching items!');
                    setSeverity('error');
                    setAlertsOpen(true);
                    setLoading(false);
                    setLoading(false);
                    setLoading(!loading); // TODO delete
                });
        }
    }, [category]);

    const handleAddFav = (id) => {
        setId(id);
        setId(chosenId);
        // TODO  add to fav
    };

    const handleAddBasket = (id) => {
        setId(id);
        // TODO add to basket
    };

    const handleCard = (id) => {
        setId(id);
        // TODO open product details
    };

    const renderItems = () => {
        const itemsCol = [];
        items.forEach((item) => {
            itemsCol.push(
                <Col xs={12} md={6} xl={4} className="col" key={item.id}>
                    <ProductCard
                        handleUpper={handleAddFav}
                        handleBottom={handleAddBasket}
                        handleCard={handleCard}
                        {...item}
                    />
                </Col>,
            );
        });
        return itemsCol;
    };

    return (
        <>
            <Container fluid="lg" className="pm-item-list">
                <Row className="row">{items ? renderItems() : null}</Row>
            </Container>

            <Alert
                open={alertOpen}
                handleClose={() => setAlertsOpen(false)}
                message={message}
                severity={severity}
            />
        </>
    );
};

export default Products;
