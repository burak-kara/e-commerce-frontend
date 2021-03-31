import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { P_M_ITEMS } from '../../_constants';

const cats = ['Electronics', 'Fashion', 'Home', 'Books', 'Automotive', 'Sports', 'Games', 'Health'];

const NewItem = () => {
    const history = useHistory();
    const [category, setCategory] = useState('');

    const handleCategoryClick = () => {
        console.log(category);
        setCategory('cat');
    };

    const handleCancel = () => {
        history.push({
            pathname: P_M_ITEMS,
        });
    };

    const renderCategories = () => {
        const categories = [<option key="default">Choose category</option>];
        cats.forEach((cat) => {
            categories.push(<option key={cat}>{cat}</option>);
        });
        return categories;
    };

    return (
        <div className="new-item-page">
            <Form className="form-container col-lg-8 col-md-10 col-sm-12" noValidate>
                <Form.Row>
                    <Form.Group as={Col} xl="4" lg="4" md="12" sm="6" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control required name="image" type="url" placeholder="Image link" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="name">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control required name="name" type="text" placeholder="Name" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} xl="4" lg="4" md="6" sm="6" controlId="brand">
                        <Form.Label>Product brand</Form.Label>
                        <Form.Control required name="brand" type="text" placeholder="Brand" />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" sm="6" controlId="category">
                        <Form.Label>Product category</Form.Label>
                        <Form.Control
                            as="select"
                            className="dropdown"
                            variant="outline-secondary"
                            defaultValue="Choose category"
                            onClick={handleCategoryClick}
                            // value={category}
                        >
                            {renderCategories()}
                        </Form.Control>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" sm="6" controlId="price">
                        <Form.Label>Product price</Form.Label>
                        <InputGroup>
                            <Form.Control
                                required
                                name="price"
                                type="number"
                                placeholder="Product price"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text>₺</InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" sm="3" controlId="stock">
                        <Form.Label>Stock count</Form.Label>
                        <Form.Control
                            required
                            name="stock"
                            type="number"
                            placeholder="Stock count"
                        />
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
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Error</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} sm="12" controlId="buttons" className="btn-col">
                        <button
                            className="btn btn-danger mr-2"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="button" onClick={() => {}}>
                            Preview
                        </button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
    );
};

export default NewItem;
