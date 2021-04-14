import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Add } from '../../_utilities/icons';
import { getItems, deleteItem } from '../../_requests';
import { Alert, DiscardModal, ProductCard } from '../../components';
import { P_M_NEW_ITEM, PM, P_M_EDIT_ITEM } from '../../_constants';

const Items = () => {
    const history = useHistory();
    const [items, setItems] = useState();
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alertOpen, setAlertsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');

    // TODO get this from storage
    const role = PM;

    const fetchItems = () => {
        setLoading(true);
        getItems()
            .then((response) => {
                setItems(response.data);
                setLoading(false);
                // TODO loading
            })
            .catch(() => {
                setMessage('Error while fetching items!');
                setSeverity('error');
                setAlertsOpen(true);
                setLoading(false);
                setLoading(!loading); // TODO delete
                // TODO loading
            });
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = (id) => {
        setConfirmModal(true);
        setDeleteId(id);
    };

    const onDelete = () => {
        setConfirmModal(false);
        deleteItem(deleteId)
            .then(() => {
                setMessage('Product is deleted successfully!');
                setSeverity('success');
                setAlertsOpen(true);
                fetchItems();
            })
            .catch(() => {
                setMessage('Error while deleting the product!');
                setSeverity('error');
                setAlertsOpen(true);
            });
    };

    const handleEdit = (id) => {
        history.push({
            pathname: P_M_EDIT_ITEM,
            state: { id },
        });
    };

    const handleCard = () => {
        // TODO open product details
    };

    const handleAdd = () => {
        history.push({
            pathname: P_M_NEW_ITEM,
        });
    };

    const handleUpper = role === PM ? handleDelete : null;
    const handleBottom = role === PM ? handleEdit : null;

    const renderItems = () => {
        const itemsCol = [];
        items.forEach((item) => {
            itemsCol.push(
                <Col xs={12} md={6} xl={4} className="col" key={item.id}>
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
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
                <Row className="add-row">
                    <Col
                        className="add-col"
                        xs={{ span: 12, offset: 0 }}
                        md={{ span: 6, offset: 6 }}
                        xl={{ span: 4, offset: 8 }}
                    >
                        <button className="btn" type="button" onClick={handleAdd}>
                            <Add />
                            <div className="ml-1">New Product</div>
                        </button>
                    </Col>
                </Row>
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
            <Alert
                open={alertOpen}
                handleClose={() => setAlertsOpen(false)}
                message={message}
                severity={severity}
            />
        </>
    );
};

export default Items;
