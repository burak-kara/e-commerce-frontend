import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Rating } from '@progress/kendo-react-inputs';
import {
    ComponentLoading,
    DiscardModal,
    PageLoading,
    ProductCard,
    ProductCardEmpty,
} from '../../components';
import {
    deleteItem,
    getBrandsByCategory,
    getItemsByCategory,
    getItemsByCategoryBrandSortSearch,
    getItemsBySearch,
    getAd,
} from '../../_requests';
import { openAlert, addToBasket } from '../../_redux/actions';
import { P_M_EDIT_ITEM, PRODUCT_DETAIL } from '../../_constants';

const Products = (params) => {
    const history = useHistory();
    const location = useLocation();
    const { user } = useStore().getState();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chosenId, setId] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [brands, setBrands] = useState([]);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [ordering, setOrdering] = useState('');
    const [search, setSearch] = useState('');
    const [rating, setRating] = useState('');
    const [priceStart, setPriceStart] = useState('');
    const [priceEnd, setPriceEnd] = useState('');
    const [leftAdd, setLeftAdd] = useState();
    const [rightAdd, setRightAdd] = useState();

    const fetchLeftAdd = () => {
        getAd()
            .then((response) => {
                setLeftAdd(
                    <div className="add-container">
                        <img alt="ad" className="image" src={response.data.img} />
                    </div>,
                );
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
                setLoading(false);
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
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting ad.',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchLeftAdd();
        fetchRightAdd();
    }, []);

    const fetchBrands = (cat) => {
        setBrands([]);
        getBrandsByCategory(cat)
            .then((response) => {
                setBrands(response.data);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error while fetching brands!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    const fetchByCategory = (cat) => {
        getItemsByCategory(cat)
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
        fetchBrands(cat);
    };

    const fetchBySearch = (s) => {
        getItemsBySearch(s)
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
        fetchBrands('all');
    };

    useEffect(() => {
        setItems([]);
        if (params && params.category) {
            setLoading(true);
            const cat = params.category.substring(1);
            setCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
            setBrand('');
            setOrdering('');
            setSearch('');
            setRating('');
            setPriceEnd('');
            setPriceStart('');
            fetchByCategory(cat);
        } else if (params && params.location) {
            setLoading(true);
            fetchBySearch(params.location.state.search);
            setSearch(params.location.state.search);
            setCategory('');
            setBrand('');
            setOrdering('');
            setRating('');
            setPriceEnd('');
            setPriceStart('');
        }
    }, [location]);

    const handleFilter = () => {
        const data = {
            category,
            brand,
            ordering,
            search,
            rating_gt: rating,
            price_gt: priceStart,
            price_lt: priceEnd,
        };
        setLoading(true);
        getItemsByCategoryBrandSortSearch(data)
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
                if (category) {
                    fetchByCategory();
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

    const Items = () => {
        const itemsCol = [];
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
        } else {
            itemsCol.push(
                <Col xs={12} md={6} xl={4} className="col" key="recommend">
                    <ProductCardEmpty />
                </Col>,
            );
        }
        return itemsCol;
    };

    const BrandOptions = () => {
        const options = [
            <option key="default" value="">
                Filter by Brand
            </option>,
        ];
        brands.forEach((br) => {
            options.push(<option key={br}>{br}</option>);
        });
        return options;
    };

    return loading ? (
        <PageLoading />
    ) : (
        <>
            <Container fluid className="pm-item-list">
                <Row>
                    <Col md={1} xl={2}>
                        {leftAdd || <ComponentLoading />}
                    </Col>
                    <Col xl={8}>
                        <Row className="filter-row row">
                            <Col xs={6} lg={3} xl={2} className="mb-2 mb-xl-0 filter-col">
                                <Form.Label>Sort Products</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="dropdown"
                                    variant="outline-secondary"
                                    defaultValue="Sort by.."
                                    onChange={(e) => setOrdering(e.target.value)}
                                    value={ordering}
                                >
                                    <option key="default" value="">
                                        Sort by..
                                    </option>
                                    <option key="-price" value="price">
                                        Lowest Price
                                    </option>
                                    <option key="price" value="-price">
                                        Highest Price
                                    </option>
                                    <option key="-name" value="name">
                                        A-Z
                                    </option>
                                    <option key="name" value="-name">
                                        Z-A
                                    </option>
                                </Form.Control>
                            </Col>
                            <Col xs={6} lg={3} xl={2} className="mb-3 mb-xl-0 filter-col">
                                <Form.Label>Brands</Form.Label>
                                <Form.Control
                                    as="select"
                                    className="dropdown"
                                    variant="outline-secondary"
                                    defaultValue="Brands"
                                    onChange={(e) => setBrand(e.target.value)}
                                    value={brand}
                                >
                                    <BrandOptions />
                                </Form.Control>
                            </Col>
                            <Col
                                xs={12}
                                lg={3}
                                xl={3}
                                className="price-col mb-3 mb-xl-0 filter-col"
                            >
                                <Form.Label>Price Range</Form.Label>
                                <Row className="inner-price-row">
                                    <Col xs={6} className="min-col">
                                        <Form.Control
                                            required
                                            className="price"
                                            name="minPrice"
                                            type="number"
                                            placeholder="Min"
                                            value={priceStart}
                                            onChange={(e) => {
                                                setPriceStart(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Col xs={6} className="max-col">
                                        <Form.Control
                                            required
                                            className="price"
                                            name="maxPrice"
                                            type="number"
                                            placeholder="Max"
                                            value={priceEnd}
                                            onChange={(e) => {
                                                setPriceEnd(e.target.value);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                xs={6}
                                lg={3}
                                xl={3}
                                className="rating-col mb-3 mb-xl-0 filter-col"
                            >
                                <Form.Label>Minimum Rating</Form.Label>
                                <Row>
                                    <Col>
                                        <Rating
                                            value={rating}
                                            onChange={(e) => {
                                                setRating(e.value);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={6} lg={12} xl={2} className="btn-col mb-2 mb-xl-0 filter-col">
                                <button
                                    className="btn btn-block"
                                    name="Filter"
                                    type="button"
                                    onClick={handleFilter}
                                >
                                    Filter
                                </button>
                            </Col>
                        </Row>
                        <Row className="row">
                            <Items />
                        </Row>
                    </Col>
                    <Col xl={2}>{rightAdd || <ComponentLoading />}</Col>
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

export default connect(null, { openAlert, addToBasket })(Products);
