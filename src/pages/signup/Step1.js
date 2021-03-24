import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { nonError } from '../../_constants';

const Step1 = (props) => {
    const { currentStep, setField, errors, form } = props;
    const { email, username, password, repassword } = form;

    if (currentStep !== 1) {
        return null;
    }

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setField('email', e.target.value)}
                        isInvalid={!!errors.email && errors.email !== nonError}
                        isValid={errors.email === nonError}
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
                        isInvalid={!!errors.username && errors.username !== nonError}
                        isValid={errors.username === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        name="password"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setField('password', e.target.value)}
                        isInvalid={!!errors.password && errors.password !== nonError}
                        isValid={errors.password === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="repassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        name="repassword"
                        type="text"
                        placeholder="Confirm password"
                        value={repassword}
                        onChange={(e) => setField('repassword', e.target.value)}
                        isInvalid={!!errors.repassword && errors.repassword !== nonError}
                        isValid={errors.repassword === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {errors.repassword}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default Step1;
