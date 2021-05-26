import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Row, Col, /* Form */ } from 'react-bootstrap';
import { DiscardModal, PageLoading, ProductCard } from '../../components';
import { deleteItem, getItems, getAd } from '../../_requests';
import { openAlert, addToBasket } from '../../_redux/actions';
import { P_M_EDIT_ITEM, PRODUCT_DETAIL } from '../../_constants';

const Home = (params) => {
    const history = useHistory();
    const { user } = useStore().getState();
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(false);
    const [chosenId, setId] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [ads, setAds] = useState([]);

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

    useEffect(() => {
        setLoading(true);
        fetchItems();
    }, []);

    const getLeftAd = (adList) => {
        getAd()
            .then((response) => {
                adList.push(
                    <div className="image-container">
                        <img
                            alt="ad"
                            className="image"
                            src={response.data.img}
                        />
                    </div>
                );
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
            });
    };

    const getRightAd = (adList) => {
        getAd()
            .then((response) => {
                adList.push(
                    <div className="image-container">
                        <img
                            alt="ad"
                            className="image"
                            src={response.data.img}
                        />
                    </div>
                );
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
            });
    };

    const fetchAds = () => {
        const adList = [];
        getLeftAd(adList);
        getRightAd(adList);
        setAds(adList);
    };

    useEffect(() => {
        setLoading(true);
        fetchAds();
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

    const getLeftBannerAd = () => {
        let leftBannerAd = '';
        ads.forEach((ad, index) => {
            if (index === 0) {
                leftBannerAd = (ad);
            }
        });
        return leftBannerAd;
    }

    const getRightBannerAd = () => {
        let rightBannerAd = '';
        ads.forEach((ad, index) => {
            if (index === 1) {
                rightBannerAd = (ad);
            }
        });
        return rightBannerAd;
    }

    return loading ? (
        <PageLoading />
    ) : (
        <>
            <div className="home-page">
                <Col className="banner-ad-left">
                    {getLeftBannerAd()}
                </Col>
                <Container fluid="md" className="pm-item-list">
                    <Row className="row">
                        {items ? renderItems() : null}
                    </Row>
                </Container>
                <Col className="banner-ad-right">
                    {getRightBannerAd()}
                </Col>
            </div>
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
