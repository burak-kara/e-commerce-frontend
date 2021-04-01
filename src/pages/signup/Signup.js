import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import { LANDING, noneError, emailRegex, passwordRegex } from '../../_constants';
import { logo } from '../../_assets';
import { Loading } from '../../components';

const Signup = () => {
    const history = useHistory();
    const [isNext, setIsNext] = useState(false);
    const [form, setForm] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({
        email: '',
        username: '',
        password: '',
        repassword: '',
        name: '',
        surname: '',
        phone: '',
        birthday: '',
    });

    const setField = (field, value, type) => {
        if (field === 'phone') {
            if (value.startsWith('0') || value.startsWith('9')) {
                setForm({
                    ...form,
                    phone: value.substring(1, value.length),
                });
            } else if (value.length === 3 || value.length === 7 || value.length === 10) {
                const newValue = type === 'deleteContentBackward' ? value : `${value}-`;
                setForm({
                    ...form,
                    phone: newValue,
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
        const { email, username, password, repassword } = form;
        const newErrors = {
            email: noneError,
            username: noneError,
            password: noneError,
            repassword: noneError,
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
        else if (!passwordRegex.test(password))
            newErrors.password =
                'Password should contain at least one number and one special character!';

        // repassword errors
        if (!repassword || repassword !== password)
            newErrors.repassword = 'Please confirm your password!';
        else if (!password || password === '')
            newErrors.repassword = 'Please provide a valid password!';
        else if (!passwordRegex.test(repassword))
            newErrors.repassword =
                'Password should contain at least one number and one special character!';

        return newErrors;
    };

    const findStep2Errors = () => {
        const { name, surname, phone, birthday } = form;
        const newErrors = {
            name: noneError,
            surname: noneError,
            phone: noneError,
            birthday: noneError,
        };

        // name errors
        if (!name || name === '') newErrors.name = 'Please provide a valid name!';
        else if (name.length < 2) newErrors.name = 'Name is too short!';
        else if (name.length > 16) newErrors.name = 'Name is too long!';

        // surname errors
        if (!surname || surname === '') newErrors.surname = 'Please provide a valid surname!';
        else if (surname.length < 2) newErrors.surname = 'Surname is too short!';
        else if (surname.length > 16) newErrors.surname = 'Surname is too long!';

        // phone errors
        if (!phone || phone === '' || phone.length !== 13)
            newErrors.phone = 'Please provide a valid phone number!';

        // birthday errors
        if (!birthday || birthday === '') newErrors.birthday = 'cannot be blank!';
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const stepError = findStep2Errors();
        setErrors(stepError);
        if (!checkAnyError(stepError)) {
            history.push({
                pathname: LANDING,
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
            }, 500);
        }
    };

    const back = () => {
        setIsNext(!isNext);
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
    };

    const renderNextButton = () =>
        currentStep < 2 ? (
            <button className="btn font-weight-bold next-signup-btn" type="button" onClick={next}>
                {isNext ? <Loading /> : 'Next'}
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

export default Signup;
