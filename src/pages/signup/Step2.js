import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { nonError } from '../../_constants';

const Step2 = (props) => {
    const { currentStep, setField, errors, form } = props;
    const { name, surname, phone, birthday } = form;

    if (currentStep !== 2) {
        return null;
    }

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setField('name', e.target.value)}
                        isInvalid={!!errors.name && errors.name !== nonError}
                        isValid={errors.name === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        required
                        name="surname"
                        type="text"
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setField('surname', e.target.value)}
                        isInvalid={!!errors.surname && errors.surname !== nonError}
                        isValid={errors.surname === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="phone">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        isInvalid={!!errors.phone && errors.phone !== nonError}
                        isValid={errors.phone === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        required
                        name="birthday"
                        type="text"
                        placeholder="Birthday"
                        value={birthday}
                        onChange={(e) => setField('birthday', e.target.value)}
                        isInvalid={!!errors.birthday && errors.birthday !== nonError}
                        isValid={errors.birthday === nonError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default Step2;
