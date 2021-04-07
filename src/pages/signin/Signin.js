import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { setSessionCookie } from '../../components/sessions/sessions.ts';
import Step1 from './Step1';
import { LANDING, noneError } from '../../_constants';
import { logo } from '../../_assets';
import { login } from '../../_requests';

const Signin = () => {
    const history = useHistory();
    const [form, setForm] = useState({ is_sales_manager: false, is_product_manager: false });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    if (loading) {
        return <h4>Logging in...</h4>;
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const findStep1Errors = () => {
        const { username, password } = form;
        const newErrors = {
            username: noneError,
            password: noneError,
        };

        // username errors
        if (!username) newErrors.username = 'Please provide a valid username!';
        else if (username === '')
            newErrors.username = 'Username should not be empty';

        // password errors
        if (!password || password === '') newErrors.password = 'Please provide a valid password!';

        return newErrors;
    };

    const checkAnyError = (stepErrors) => {
        let isError = false;
        Object.values(stepErrors).forEach((value) => {
            if (value !== noneError) {
                isError = true;
            }
        });
        return isError;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const stepError = findStep1Errors();
        setErrors(stepError);
        if (!checkAnyError(stepError)) {
            setSessionCookie({ form });
            setLoading(true);
            login(form)
                .then(() => {
                    // TODO add success message
                    setTimeout(() => {
                        history.push({
                            pathname: LANDING,
                        });
                    }, 500);
                })
                .catch(() => {
                    // TODO handle errors
                    // e.g. user exist message
                });
        }
    };

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const renderSubmitButton = () => (
        <button className="btn font-weight-bold next-signup-btn" type="submit">
            Sign in
        </button>
    );

    return (
        <div className="signup">
            <Form
                className="form-container col-lg-3 col-md-2 col-sm-10 col-12"
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="form-row logo-container">
                    <div className="form-group">
                        <button
                            className="header-brand"
                            type="button"
                            onClick={() => handleLogoClick()}
                        >
                            <img className="logo" src={logo} alt="logo" />
                        </button>
                    </div>
                </div>
                <Step1 currentStep={0} setField={setField} errors={errors} form={form} />
                <div className="form-row btn-container">
                    {renderSubmitButton()}
                </div>
            </Form>
        </div>
    );
};

export default Signin;
