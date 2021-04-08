import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { noneError } from '../../_constants';
import { Show, Hide } from '../../_utilities/icons';

const Step1 = (props) => {
    const { currentStep, setField, errors, form } = props;
    const { username, password } = form;
    const [showPassword, setPasswordShow] = useState(false);

    if (currentStep !== 0) {
        return null;
    }

    const handlePasswordClick = () => {
        setPasswordShow(!showPassword);
    };

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setField('username', e.target.value)}
                        isInvalid={!!errors.username && errors.username !== noneError}
                        isValid={errors.username === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            required
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setField('password', e.target.value)}
                            isInvalid={!!errors.password && errors.password !== noneError}
                            isValid={errors.password === noneError}
                        />
                        <InputGroup.Append>
                            <button
                                className="btn password_btn"
                                type="button"
                                onClick={handlePasswordClick}
                            >
                                {showPassword ? <Hide color="white" /> : <Show color="white" />}
                            </button>
                        </InputGroup.Append>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default Step1;
