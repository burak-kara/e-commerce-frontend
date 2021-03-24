import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Step1 from './Step1';
import Step2 from './Step2';
import { LANDING, nonError } from '../../_constants';
import logo from '../../_assets';

const Signup = () => {
    const history = useHistory();
    const [currentStep, setCurrentStep] = useState(1);
    const [form, setForm] = useState({});
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

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
        // // Check and see if errors exist, and remove them from the error object:
        // if (errors[field])
        //     setErrors({
        //         ...errors,
        //         [field]: '',
        //     });
    };

    const findStep1Errors = () => {
        const { email, username, password, repassword } = form;
        const newErrors = {
            email: nonError,
            username: nonError,
            password: nonError,
            repassword: nonError,
        };

        // email errors
        if (!email || email === '') newErrors.email = 'cannot be blank!';
        else if (email.length > 30) newErrors.email = 'email is too long!';

        // username errors
        if (!username || username === '') newErrors.username = 'select a username!';
        else if (username.length > 30) newErrors.username = 'username is too long!';

        // password errors
        if (!password || password === '') newErrors.password = 'cannot be blank!';
        else if (password.length > 30) newErrors.password = 'password is too long!';

        // repassword errors
        if (!repassword || repassword === '') newErrors.repassword = 'cannot be blank!';
        else if (repassword.length > 30) newErrors.repassword = 'repassword is too long!';

        return newErrors;
    };

    const findStep2Errors = () => {
        const { name, surname, phone, birthday } = form;
        const newErrors = {
            name: nonError,
            surname: nonError,
            phone: nonError,
            birthday: nonError,
        };

        // name errors
        if (!name || name === '') newErrors.name = 'cannot be blank!';
        else if (name.length > 30) newErrors.name = 'name is too long!';

        // surname errors
        if (!surname || surname === '') newErrors.surname = 'cannot be blank!';
        else if (surname.length > 30) newErrors.surname = 'surname is too long!';

        // phone errors
        if (!phone || phone === '') newErrors.phone = 'cannot be blank!';
        else if (phone.length > 30) newErrors.phone = 'phone is too long!';

        // birthday errors
        if (!birthday || birthday === '') newErrors.birthday = 'cannot be blank!';
        else if (birthday.length > 30) newErrors.birthday = 'birthday is too long!';

        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = findStep2Errors();
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
        } else {
            // No errors! Put any logic here for the form submission!
            const { email, username, password, name, surname, phone, birthday } = form;
            alert(`Your registration detail: \n
                Email: ${email} \n
                Username: ${username} \n
                Password: ${password} \n
                Name: ${name} \n
                Surname: ${surname} \n
                Birthday: ${birthday} \n
                Phone: ${phone} \n`);
        }

        history.push({
            pathname: LANDING,
        });
    };

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const next = (event) => {
        event.preventDefault();
        const step1Errors = findStep1Errors();
        if (Object.keys(step1Errors).length > 0) {
            // We got errors!
            setErrors(step1Errors);
        } else {
            // No errors!
            setCurrentStep(currentStep + 1);
        }
    };

    const back = () => {
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
    };

    const renderNextButton = () =>
        currentStep < 2 ? (
            <button className="btn btn-primary" type="button" onClick={next}>
                Next
            </button>
        ) : null;

    const renderBackButton = () => (
        <button
            className="btn btn-secondary mr-5"
            type="button"
            hidden={currentStep === 1}
            onClick={back}
        >
            Back
        </button>
    );

    const renderSubmitButton = () =>
        currentStep === 2 ? (
            <button className="btn btn-success" type="submit">
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
                <div className="form-row input-field-container">
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
