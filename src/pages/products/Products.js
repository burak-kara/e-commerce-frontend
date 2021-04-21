import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { DiscardModal, PageLoading, ProductCard } from '../../components';
import { deleteItem, getItemsByCategory } from '../../_requests';
import { openAlert, addToBasket } from '../../_redux/actions';
import { P_M_EDIT_ITEM } from '../../_constants';

const Products = (params) => {
    const history = useHistory();
    const location = useLocation();
    const { user } = useStore().getState();
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [chosenId, setId] = useState('');
    const [category, setCategory] = useState();
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        setCategory(params.category.substring(1));
    }, [location]);

    const fetchItems = () => {
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
            });
    };

    useEffect(() => {
        setLoading(true);
        if (category) {
            fetchItems();
        }
    }, [category]);

    const handleAddFav = (id) => {
        setId(id);
        setId(chosenId);
        // TODO  add to fav
    };

    const handleAddBasket = (id) => {
        setId(id);
        params.addToBasket(id);
        params.openAlert({
            message: 'Product added to the basket!',
            severity: 'success',
        });
    };

    const handleCard = (id) => {
        setId(id);
        // TODO open product details
    };

    const onDelete = () => {
        setConfirmModal(false);
        deleteItem(deleteId)
            .then(() => {
                params.openAlert({
                    message: 'Product is deleted successfully!',
                    severity: 'success',
                });
                if (category) {
                    fetchItems();
                }
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error while deleting the product!',
                    severity: 'error',
                });
            });
    };

    const handleDelete = (id) => {
        setConfirmModal(true);
        setDeleteId(id);
    };

    const handleEdit = (id) => {
        history.push({
            pathname: P_M_EDIT_ITEM,
            state: { id },
        });
    };

    let handleUpper = null;
    if (user.is_product_manager) {
        handleUpper = handleDelete;
    }
    if (!user.is_product_manager && !user.is_sales_manager) {
        handleUpper = handleAddFav;
    }

    let handleBottom = null;
    if (user.is_product_manager) {
        handleBottom = handleEdit;
    }
    if (!user.is_product_manager && !user.is_sales_manager) {
        handleBottom = handleAddBasket;
    }

    const renderItems = () => {
        const itemsCol = [];
        if (items.length !== 0) {
            items.forEach((item) => {
                itemsCol.push(
                    <Col xs={12} md={6} xl={4} className="col" key={item.id}>
                        <ProductCard
                            handleUpper={handleUpper}
                            handleBottom={handleBottom}
                            handleCard={handleCard}
                            {...item}
                        />
                    </Col>,
                );
            });
        }
        return itemsCol;
    };

    return loading ? (
        <PageLoading />
    ) : (
        <>
            <Container fluid="lg" className="pm-item-list">
                <Row className="row">{items ? renderItems() : null}</Row>
            </Container>
            <DiscardModal
                show={confirmModal}
                onHide={() => setConfirmModal(false)}
                onDiscard={onDelete}
                header="Delete the Product?"
                body="If you delete this product now, you will lose it permanently."
                buttonText="Delete"
            />
        </>
    );
};

export default connect(null, { openAlert, addToBasket })(Products);
