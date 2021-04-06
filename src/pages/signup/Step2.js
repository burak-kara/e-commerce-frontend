import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { noneError } from '../../_constants';

const Step2 = (props) => {
    const { currentStep, setField, errors, form } = props;
    const { first_name, last_name, phone_number, birthday } = form;

    if (currentStep !== 2) {
        return null;
    }

    return (
        <>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="first_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        name="first_name"
                        type="text"
                        placeholder="Name"
                        value={first_name}
                        onChange={(e) => setField('first_name', e.target.value)}
                        isInvalid={!!errors.first_name && errors.first_name !== noneError}
                        isValid={errors.first_name === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="last_name">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        required
                        name="last_name"
                        type="text"
                        placeholder="Surname"
                        value={last_name}
                        onChange={(e) => setField('last_name', e.target.value)}
                        isInvalid={!!errors.last_name && errors.last_name !== noneError}
                        isValid={errors.last_name === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="phone_number">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        required
                        name="phone_number"
                        type="phone"
                        placeholder="500-555-00-11"
                        value={phone_number}
                        onChange={(e) =>
                            setField('phone_number', e.target.value, e.nativeEvent.inputType)
                        }
                        isInvalid={!!errors.phone_number && errors.phone_number !== noneError}
                        isValid={errors.phone_number === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        {errors.phone_number}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="12" controlId="birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        required
                        name="birthday"
                        type="date"
                        placeholder="Birthday"
                        value={birthday}
                        onChange={(e) => setField('birthday', e.target.value)}
                        isInvalid={!!errors.birthday && errors.birthday !== noneError}
                        isValid={errors.birthday === noneError}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{errors.birthday}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
        </>
    );
};

export default Step2;
