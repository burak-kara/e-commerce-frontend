import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { noneError } from '../../_constants';
import { Show, Hide } from '../../_utilities/icons';

const Step1 = (props) => {
    const { currentStep, setField, errors, form } = props;
    const { email, username, password, repassword } = form;
    const [showPassword, setPasswordShow] = useState(false);
    const [showRepassword, setRepasswordShow] = useState(false);

    if (currentStep !== 1) {
        return null;
    }

    const handlePasswordClick = () => {
        setPasswordShow(!showPassword);
    };

    const handleRepasswordClick = () => {
        setRepasswordShow(!showRepassword);
    };

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setField('email', e.target.value)}
                        isInvalid={!!errors.email && errors.email !== noneError}
                        isValid={errors.email === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
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
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="repassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            required
                            name="repassword"
                            type={showRepassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={repassword}
                            onChange={(e) => setField('repassword', e.target.value)}
                            isInvalid={!!errors.repassword && errors.repassword !== noneError}
                            isValid={errors.repassword === noneError}
                        />
                        <InputGroup.Append>
                            <button
                                className="btn password_btn"
                                type="button"
                                onClick={handleRepasswordClick}
                            >
                                {showRepassword ? <Hide color="white" /> : <Show color="white" />}
                            </button>
                        </InputGroup.Append>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                            {errors.repassword}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default Step1;
