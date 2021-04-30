import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import { logo } from '../../_assets';
import { register } from '../../_requests';
import { ComponentLoading } from '../../components';
import { openAlert } from '../../_redux/actions';
import {
    LANDING,
    noneError,
    emailRegex,
    passwordRegex,
    TOKEN,
    TIME_OUT,
    SIGN_IN,
} from '../../_constants';

const Signup = (params) => {
    const history = useHistory();
    const [isNext, setIsNext] = useState(false);
    const [form, setForm] = useState({ is_sales_manager: false, is_product_manager: false });
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        password_validation: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        birthday: '',
    });

    const setField = (field, value, type) => {
        if (field === 'phone_number') {
            if (value.startsWith('0') || value.startsWith('9')) {
                setForm({
                    ...form,
                    phone_number: value.substring(1, value.length),
                });
            } else if (value.length === 3 || value.length === 7 || value.length === 10) {
                const newValue = type === 'deleteContentBackward' ? value : `${value}-`;
                setForm({
                    ...form,
                    phone_number: newValue,
                });
            } else if (value.length !== 14) {
                setForm({
                    ...form,
                    [field]: value,
                });
            }
        } else {
            setForm({
                ...form,
                [field]: value,
            });
        }
    };

    const findStep1Errors = () => {
        const { email, username, password, password_validation } = form;
        const newErrors = {
            email: noneError,
            username: noneError,
            password: noneError,
            password_validation: noneError,
        };

        // email errors
        if (!email || email === '') newErrors.email = 'Please provide a valid email address!';
        else if (email.length > 30) newErrors.email = 'Email is too long!';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email!';

        // username errors
        if (!username) newErrors.username = 'Please provide a valid username!';
        else if (username === '' || username.length < 5)
            newErrors.username = 'Username should be at least 5 characters';
        else if (username.length > 12)
            newErrors.username = 'Username should be at max 12 characters!';

        // password errors
        if (!password || password === '') newErrors.password = 'Please provide a valid password!';
        else if (password.length < 6 || password.length > 10)
            newErrors.password = 'Password should be min 6 and max 10 characters!';
        else if (!passwordRegex.test(password))
            newErrors.password =
                'Password should contain at least one number and one special character!';

        // password_validation errors
        if (!password_validation || password_validation !== password)
            newErrors.password_validation = 'Please confirm your password!';
        else if (!password || password === '')
            newErrors.password_validation = 'Please provide a valid password!';
        else if (password.length < 6 || password.length > 10)
            newErrors.password = 'Password should be min 6 and max 10 characters!';
        else if (!passwordRegex.test(password))
            newErrors.password =
                'Password should contain at least one number and one special character!';

        return newErrors;
    };

    const findStep2Errors = () => {
        const { first_name, last_name, phone_number, birthday } = form;
        const newErrors = {
            first_name: noneError,
            last_name: noneError,
            phone_number: noneError,
            birthday: noneError,
        };

        // first_name errors
        if (!first_name || first_name === '') newErrors.first_name = 'Please provide a valid name!';
        else if (first_name.length < 2) newErrors.first_name = 'Name is too short!';
        else if (first_name.length > 16) newErrors.first_name = 'Name is too long!';

        // last_name errors
        if (!last_name || last_name === '') newErrors.last_name = 'Please provide a valid surname!';
        else if (last_name.length < 2) newErrors.last_name = 'Surname is too short!';
        else if (last_name.length > 16) newErrors.last_name = 'Surname is too long!';

        // phone_number errors
        if (!phone_number || phone_number === '' || phone_number.length !== 13)
            newErrors.phone_number = 'Please provide a valid phone number!';

        // birthday errors
        if (!birthday || birthday === '') newErrors.birthday = 'Please provide a valid birthday!';
        else if (birthday.length > 30) newErrors.birthday = 'birthday is too long!';

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

    const setServerSideResponse = (serverErrors) => {
        const newErrors = {
            email: noneError,
            username: noneError,
            password: noneError,
            password_validation: noneError,
            first_name: noneError,
            last_name: noneError,
            phone_number: noneError,
            birthday: noneError,
        };

        Object.keys(serverErrors).forEach((key) => {
            // eslint-disable-next-line prefer-destructuring
            newErrors[key] = serverErrors[key][0];
        });
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const stepError = findStep2Errors();
        setErrors(stepError);
        if (!checkAnyError(stepError)) {
            register(form)
                .then((response) => {
                    params.openAlert({
                        message: 'Logged in successfully.',
                        severity: 'success',
                    });
                    localStorage.setItem(TOKEN, response.data.key);
                    setTimeout(() => {
                        history.push({
                            pathname: SIGN_IN,
                        });
                    }, TIME_OUT);
                })
                .catch((error) => {
                    params.openAlert({
                        message: 'Wrong credentials while signing up!',
                        severity: 'error',
                    });
                    const serverErrors = setServerSideResponse(error.response.data);
                    setErrors(serverErrors);
                });
        }
    };

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const next = (event) => {
        event.preventDefault();
        const stepError = findStep1Errors();
        setErrors(stepError);
        if (!checkAnyError(stepError)) {
            setIsNext(!isNext);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, TIME_OUT);
        }
    };

    const back = () => {
        setIsNext(!isNext);
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
    };

    const renderNextButton = () =>
        currentStep < 2 ? (
            <button className="btn font-weight-bold next-signup-btn" type="button" onClick={next}>
                {isNext ? <ComponentLoading /> : 'Next'}
            </button>
        ) : null;

    const renderBackButton = () => (
        <button
            className="btn font-weight-bold back-btn"
            type="button"
            hidden={currentStep === 1}
            onClick={back}
        >
            Back
        </button>
    );

    const renderSubmitButton = () =>
        currentStep === 2 ? (
            <button className="btn font-weight-bold next-signup-btn" type="submit">
                Sign up
            </button>
        ) : null;

    return (
        <div className="signup">
            <Form
                className="form-container col-lg-3 col-md-6 col-sm-10 col-12"
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
                <Step1 currentStep={currentStep} setField={setField} errors={errors} form={form} />
                <Step2 currentStep={currentStep} setField={setField} errors={errors} form={form} />
                <div className="form-row btn-container">
                    {renderBackButton()}
                    {renderNextButton()}
                    {renderSubmitButton()}
                </div>
            </Form>
        </div>
    );
};

export default connect(null, { openAlert })(Signup);
