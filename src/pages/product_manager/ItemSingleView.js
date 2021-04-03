import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Col, InputGroup } from 'react-bootstrap';
import PreviewModal from './PreviewModal';
import { DiscardModal } from '../../components';
import { noneError, P_M_ITEMS } from '../../_constants';
import { getCategories, postNewItem } from '../../_requests';

// TODO delete after BE implementation
const camps = [
    '24 saatte kargoda',
    "Süpermarket Alışverişine Solo Tuvalet Kağıdı 32'li %20 indirimli",
];

const ItemSingleView = () => {
    const history = useHistory();
    const [previewModal, setPreviewModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ seller: '2' });
    const [errors, setErrors] = useState({
        image: '',
        name: '',
        brand: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        specs: '',
        campaign: '',
    });

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(() => {
                // TODO handle error
                setLoading(false);
                setLoading(!loading); // TODO delete
            });
    }, []);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const findErrors = () => {
        const { image, name, brand, category, price, stock, description, specs } = form;
        const newErrors = {
            image: noneError,
            name: noneError,
            brand: noneError,
            category: noneError,
            price: noneError,
            stock: noneError,
            description: noneError,
            specs: noneError,
            campaign: noneError,
        };

        // image errors
        if (!image || image === '') newErrors.image = 'Please provide a valid image url!';

        // name errors
        if (!name || name === '') newErrors.name = 'Please provide a valid product name!';
        else if (name.length > 30) newErrors.name = 'Product name should be at max 30 characters!';

        // brand errors
        if (!brand || brand === '') newErrors.brand = 'Please provide a valid brand!';
        else if (brand.length > 30)
            newErrors.brand = 'Product brand should be at max 30 characters!';

        // category errors
        if (!category || category === '') newErrors.category = 'Please provide a valid category!';
        else if (category.length > 30)
            newErrors.category = 'Product category should be at max 30 characters!';

        // price errors
        if (!price || price === '') newErrors.price = 'Please provide a valid price!';

        // stock errors
        if (!stock || stock === '') newErrors.stock = 'Please provide a valid stock!';

        // description errors
        if (!description || description === '')
            newErrors.description = 'Please provide a valid description!';
        else if (description.length < 20)
            newErrors.description = 'Product description should be minimum 20 characters!';
        else if (description.length > 100)
            newErrors.description = 'Product description should be at max 100 characters!';

        // specs errors
        if (!specs || specs === '') newErrors.specs = 'Please provide a valid specs!';

        return newErrors;
    };

    const checkAnyError = (tempErrors) => {
        let isError = false;
        Object.values(tempErrors).forEach((value) => {
            if (value !== noneError) {
                isError = true;
            }
        });
        return isError;
    };

    const onDiscard = () => {
        history.push({
            pathname: P_M_ITEMS,
        });
    };

    const onPreview = (event) => {
        event.preventDefault();
        const tempErrors = findErrors();
        setErrors(tempErrors);
        if (!checkAnyError(tempErrors)) {
            setPreviewModal(true);
        }
    };

    const onConfirm = () => {
        // TODO push to backend
        postNewItem(form)
            .then(() => {
                // TODO successful message
            })
            .catch(() => {
                // TODO error handler
            });
        history.push({
            pathname: P_M_ITEMS,
        });
    };

    const renderCategories = () => {
        const cats = [<option key="default">Choose category</option>];
        categories.forEach((item) => {
            cats.push(<option key={item.name}>{item.name}</option>);
        });
        return cats;
    };

    const renderCampaigns = () => {
        const campaigns = [<option key="default">Choose campaign</option>];
        camps.forEach((camp) => {
            campaigns.push(<option key={camp}>{camp}</option>);
        });
        return campaigns;
    };

    return (
        <>
            <div className="new-item-page">
                <Form className="form-container col-lg-8 col-md-10 col-sm-12" noValidate>
                    <Form.Row>
                        <Form.Group as={Col} xl="4" lg="4" md="12" sm="6" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                required
                                name="image"
                                type="url"
                                placeholder="Image link"
                                onChange={(e) => setField('image', e.target.value)}
                                isInvalid={!!errors.image && errors.image !== noneError}
                                isValid={errors.image === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.image}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="name">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                required
                                name="name"
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setField('name', e.target.value)}
                                isInvalid={!!errors.name && errors.name !== noneError}
                                isValid={errors.name === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="brand">
                            <Form.Label>Product brand</Form.Label>
                            <Form.Control
                                required
                                name="brand"
                                type="text"
                                placeholder="Brand"
                                onChange={(e) => setField('brand', e.target.value)}
                                isInvalid={!!errors.brand && errors.brand !== noneError}
                                isValid={errors.brand === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.brand}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xl="3" lg="4" md="6" sm="6" controlId="category">
                            <Form.Label>Product category</Form.Label>
                            <Form.Control
                                as="select"
                                className="dropdown"
                                variant="outline-secondary"
                                defaultValue="Choose category"
                                onChange={(e) => setField('category', e.target.value)}
                                isInvalid={!!errors.category && errors.category !== noneError}
                                isValid={errors.category === noneError}
                            >
                                {categories ? renderCategories() : null}
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="3" lg="4" md="6" sm="6" controlId="price">
                            <Form.Label>Product price</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    required
                                    name="price"
                                    type="number"
                                    placeholder="Product price"
                                    onChange={(e) => setField('price', e.target.value)}
                                    isInvalid={!!errors.price && errors.price !== noneError}
                                    isValid={errors.price === noneError}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>₺</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {errors.price}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} xl="3" lg="4" md="6" sm="3" controlId="stock">
                            <Form.Label>Stock count</Form.Label>
                            <Form.Control
                                required
                                name="stock"
                                type="number"
                                placeholder="Stock count"
                                onChange={(e) => setField('stock', e.target.value)}
                                isInvalid={!!errors.stock && errors.stock !== noneError}
                                isValid={errors.stock === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.stock}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="3" lg="6" md="6" sm="6" controlId="campaign">
                            <Form.Label>Product campaign</Form.Label>
                            <Form.Control
                                as="select"
                                className="dropdown"
                                variant="outline-secondary"
                                defaultValue="Choose campaign"
                                onChange={(e) => setField('campaign', e.target.value)}
                                isInvalid={!!errors.campaign && errors.campaign !== noneError}
                                isValid={errors.campaign === noneError}
                            >
                                {renderCampaigns()}
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} lg="6" md="12" sm="12" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                name="description"
                                type="text"
                                placeholder="Product description.."
                                onChange={(e) => setField('description', e.target.value)}
                                isInvalid={!!errors.description && errors.description !== noneError}
                                isValid={errors.description === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} lg="6" md="12" sm="12" controlId="specs">
                            <Form.Label>Specifications</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                required
                                name="specs"
                                type="text"
                                placeholder="Product specifications.."
                                onChange={(e) => setField('specs', e.target.value)}
                                isInvalid={!!errors.specs && errors.specs !== noneError}
                                isValid={errors.specs === noneError}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.specs}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm="12" controlId="buttons" className="btn-col">
                            <button
                                className="btn btn-outline-secondary mr-2"
                                type="button"
                                onClick={() => setConfirmModal(true)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-success" type="button" onClick={onPreview}>
                                Preview
                            </button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
            <PreviewModal
                show={previewModal}
                form={form}
                onHide={() => setPreviewModal(false)}
                onConfirm={onConfirm}
            />
            <DiscardModal
                show={confirmModal}
                onHide={() => setConfirmModal(false)}
                onDiscard={onDiscard}
                header="Discard New Product?"
            />
        </>
    );
};

export default ItemSingleView;