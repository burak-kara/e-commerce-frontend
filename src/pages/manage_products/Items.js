import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect, useStore } from 'react-redux';
import { Add } from '../../_utilities/icons';
import { getItems, deleteItem } from '../../_requests';
import { DiscardModal, PageLoading, ProductCard } from '../../components';
import { P_M_NEW_ITEM, P_M_EDIT_ITEM } from '../../_constants';
import { openAlert } from '../../_redux/actions';

const Items = (params) => {
    const history = useHistory();
    const { user } = useStore().getState();
    const [items, setItems] = useState();
    const [deleteId, setDeleteId] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const fetchItems = () => {
        setLoading(true);
        getItems()
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
                params.openAlert({
                    message: 'Product is deleted successfully!',
                    severity: 'success',
                });
                fetchItems();
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error while deleting the product!',
                    severity: 'error',
                });
            });
    };

    const handleEdit = (id) => {
        history.push({
            pathname: P_M_EDIT_ITEM,
            state: { id },
        });
    };

    const handleAdd = () => {
        history.push({
            pathname: P_M_NEW_ITEM,
        });
    };

    const handleUpper = user.is_product_manager ? handleDelete : null;
    const handleBottom = user.is_product_manager ? handleEdit : null;

    const renderItems = () => {
        const itemsCol = [];
        items.forEach((item) => {
            itemsCol.push(
                <Col xs={12} md={6} xl={4} className="col" key={item.id}>
                    <ProductCard handleUpper={handleUpper} handleBottom={handleBottom} {...item} />
                </Col>,
            );
        });
        return itemsCol;
    };

    return loading ? (
        <PageLoading />
    ) : (
        <>
            <Container fluid="lg" className="pm-item-list">
                <Row className="add-row">
                    <Col
                        className="add-col"
                        xs={{ span: 12, offset: 0 }}
                        md={{ span: 6, offset: 6 }}
                        xl={{ span: 4, offset: 8 }}
                    >
                        <button
                            className="btn"
                            name="New Product"
                            type="button"
                            onClick={handleAdd}
                        >
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
        </>
    );
};

export default connect(null, { openAlert })(Items);
