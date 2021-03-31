import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
// import { P_M_ITEMS } from '../../_constants';
import PreviewModal from './PreviewModal';
import ConfirmModal from '../../components/ConfirmModal';

const cats = ['Electronics', 'Fashion', 'Home', 'Books', 'Automotive', 'Sports', 'Games', 'Health'];
const camps = [
    '24 saatte kargoda',
    "Süpermarket Alışverişine Solo Tuvalet Kağıdı 32'li %20 indirimli",
];

const NewItem = () => {
    // const history = useHistory();
    const [previewModal, setPreviewModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [form, setForm] = useState({
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

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const onPreview = () => {
        setPreviewModal(true);
    };

    const handleConfirm = () => {
        console.log(form);
    };

    const handleCancel = () => {
        setConfirmModal(true);
        // history.push({
        //     pathname: P_M_ITEMS,
        // });
    };

    const renderCategories = () => {
        const categories = [<option key="default">Choose category</option>];
        cats.forEach((cat) => {
            categories.push(<option key={cat}>{cat}</option>);
        });
        return categories;
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
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="name">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control
                                required
                                name="name"
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setField('name', e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="brand">
                            <Form.Label>Product brand</Form.Label>
                            <Form.Control
                                required
                                name="brand"
                                type="text"
                                placeholder="Brand"
                                onChange={(e) => setField('brand', e.target.value)}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
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
                            >
                                {renderCategories()}
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
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
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>₺</InputGroup.Text>
                                </InputGroup.Append>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
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
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xl="3" lg="6" md="6" sm="6" controlId="campaign">
                            <Form.Label>Product campaign</Form.Label>
                            <Form.Control
                                as="select"
                                className="dropdown"
                                variant="outline-secondary"
                                defaultValue="Choose campaign"
                                onChange={(e) => setField('campaign', e.target.value)}
                            >
                                {renderCampaigns()}
                            </Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
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
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
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
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} sm="12" controlId="buttons" className="btn-col">
                            <button
                                className="btn btn-outline-secondary mr-2"
                                type="button"
                                onClick={handleCancel}
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
                onConfirm={handleConfirm}
            />
            <ConfirmModal
                show={confirmModal}
                form={form}
                onHide={() => setConfirmModal(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default NewItem;
