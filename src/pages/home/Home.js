import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Row, Col /* Form */ } from 'react-bootstrap';
import { ComponentLoading, DiscardModal, PageLoading, ProductCard } from '../../components';
import { deleteItem, getItems, getAd, getRecommendedProducts, getItemById } from '../../_requests';
import { openAlert, addToBasket } from '../../_redux/actions';
import { P_M_EDIT_ITEM, PRODUCT_DETAIL } from '../../_constants';

const Home = (params) => {
    const history = useHistory();
    const { user } = useStore().getState();
    const [items, setItems] = useState();
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recLoading, setRecLoading] = useState(false);
    const [leftAddLoad, setLeftAddLoad] = useState(false);
    const [rightAddLoad, setRightAddLoad] = useState(false);
    const [chosenId, setId] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [leftAdd, setLeftAdd] = useState();
    const [rightAdd, setRightAdd] = useState();

    const fetchItems = () => {
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

    const fetchRecommendedItems = async (productCount) => {
        setRecLoading(true);
        const productList = [];
        const response = await getRecommendedProducts(productCount);
        response.data.recommended_product_ids.forEach((id) => {
            getItemById(id)
                .then(async (prodResponse) => {
                    productList.push(prodResponse.data);
                })
                .catch(() => {
                    params.openAlert({
                        message: 'Error while fetching recommended products!',
                        severity: 'error',
                    });
                    setRecLoading(false);
                });
        });
        setRecommendedProducts(productList);
        setRecLoading(false);
    };

    useEffect(async () => {
        if (
            user.username !== '' &&
            !user.is_product_manager &&
            !user.is_sales_manager &&
            !user.is_admin
        ) {
            setRecLoading(true);
            await fetchRecommendedItems(3);
        }
        setLoading(true);
        fetchItems();
    }, []);

    const fetchLeftAdd = () => {
        getAd()
            .then((response) => {
                setLeftAdd(
                    <div className="add-container">
                        <img alt="ad" className="image" src={response.data.img} />
                    </div>,
                );
                setLeftAddLoad(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
                setLeftAddLoad(false);
            });
    };

    const fetchRightAdd = () => {
        getAd()
            .then((response) => {
                setRightAdd(
                    <div className="add-container">
                        <img alt="ad" className="image" src={response.data.img} />
                    </div>,
                );
                setRightAddLoad(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
                setRightAddLoad(false);
            });
    };

    useEffect(() => {
        setLeftAddLoad(true);
        setRightAddLoad(true);
        fetchLeftAdd();
        fetchRightAdd();
    }, []);

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
        history.push({
            pathname: PRODUCT_DETAIL,
            state: { id },
        });
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

    const RecommendedItems = () => {
        const recommendedItemsCol = [];
        if (
            user.username !== '' &&
            !user.is_admin &&
            !user.is_product_manager &&
            !user.is_sales_manager
        ) {
            recommendedItemsCol.push(
                <Col xl={12} className="title-row">
                    <h3 className="recommended-title">Recommended Products</h3>
                </Col>,
            );
            if (recommendedProducts.length !== 0) {
                recommendedProducts.forEach((item) => {
                    recommendedItemsCol.push(
                        <Col xs={12} md={6} lg={6} xl={4} className="col card-col" key={item.id}>
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
        }
        return recommendedItemsCol;
    };

    const Items = () => {
        const itemsCol = [];
        if (
            user.username !== '' &&
            !user.is_admin &&
            !user.is_product_manager &&
            !user.is_sales_manager
        ) {
            itemsCol.push(
                <Col xl={12} className="title-row">
                    <h3 className="recommended-title">All Products</h3>
                </Col>,
            );
        }
        if (items.length !== 0) {
            items.forEach((item) => {
                itemsCol.push(
                    <Col xs={12} md={6} lg={6} xl={4} className="col card-col" key={item.id}>
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

    return (
        <>
            <Container fluid className="pm-item-list">
                <Row>
                    <Col xl={2}>{leftAddLoad ? <ComponentLoading /> : leftAdd}</Col>
                    <Col xl={8}>
                        {recLoading ? (
                            <PageLoading />
                        ) : (
                            <Row className="row">
                                {recommendedProducts ? <RecommendedItems /> : null}
                            </Row>
                        )}
                        {loading ? (
                            <PageLoading />
                        ) : (
                            <Row className="row">{items ? <Items /> : null}</Row>
                        )}
                    </Col>
                    <Col xl={2}>{rightAddLoad ? <ComponentLoading /> : rightAdd}</Col>
                </Row>
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

export default connect(null, { openAlert, addToBasket })(Home);
