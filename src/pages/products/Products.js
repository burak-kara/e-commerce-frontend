import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../../components';
import { getItemsByCategory } from '../../_requests';
import { openAlert } from '../../_redux/actions';

const Products = (params) => {
    const location = useLocation();
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [chosenId, setId] = useState('');
    const [category, setCategory] = useState();

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
                    params.openAlert({
                        message: 'Error while fetching items!',
                        severity: 'error',
                    });
                    setLoading(false);
                    setLoading(!loading); // TODO delete
                    // TODO loading
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
        <Container fluid="lg" className="pm-item-list">
            <Row className="row">{items ? renderItems() : null}</Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Products);
