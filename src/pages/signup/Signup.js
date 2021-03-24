import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import { LANDING } from '../../_constants';
import logo from '../../_assets';

const Signup = () => {
    const [state, setState] = useState({
        email: '',
        currentStep: 1,
        username: '',
        password: '',
        repassword: '',
        name: '',
        surname: '',
        phone: '',
        birthday: '',
    });
    const [step1Valid, setStep1Valid] = useState(false);
    const history = useHistory();

    const validateInput = () => {};

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(
            {
                ...state,
                [name]: value,
            },
            () => validateInput(name, value),
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const { email, username, password, name, surname, phone, birthday } = state;
        // alert(`Your registration detail: \n
        //     Email: ${email} \n
        //     Username: ${username} \n
        //     Password: ${password} \n
        //     Name: ${name} \n
        //     Surname: ${surname} \n
        //     Birthday: ${birthday} \n
        //     Phone: ${phone} \n`);
        //
        // // TODO implement signup POST request

        history.push({
            pathname: LANDING,
        });
    };

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const validateStep1 = (event) => {
        const form = event.currentTarget;
        console.log(form);
        setStep1Valid(true);
    };

    const next = () => {
        let { currentStep } = state;
        currentStep += 1;
        console.log(step1Valid);
        validateStep1();
        console.log(currentStep);
        // setState({
        //     ...state,
        //     currentStep,
        // });
    };

    const prev = () => {
        let { currentStep } = state;
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        setState({
            ...state,
            currentStep,
        });
    };

    const nextButton = () => {
        const { currentStep } = state;
        if (currentStep < 2) {
            return (
                <button className="btn btn-primary" type="button" onClick={next}>
                    Next
                </button>
            );
        }
        return null;
    };

    const previousButton = () => {
        const { currentStep } = state;
        const isDisabled = currentStep === 1;
        return (
            <button
                className="btn btn-secondary mr-5"
                type="button"
                hidden={isDisabled}
                onClick={prev}
            >
                Previous
            </button>
        );
    };

    const submitButton = () => {
        const { currentStep } = state;
        if (currentStep === 2) {
            return (
                <button className="btn btn-success" type="submit">
                    Sign up
                </button>
            );
        }
        return null;
    };

    return (
        <div className="signup">
            <form className="form-container needs-validation" onSubmit={handleSubmit}>
                <div className="form-row input-field-container">
                    <div className="form-group">
                        <button
                            className="header-brand"
                            type="button"
                            onClick={() => handleLogoClick()}
                        >
                            {/* TODO onClick */}
                            <img className="logo" src={logo} alt="logo" />
                        </button>
                    </div>
                </div>
                <Step1
                    currentStep={state.currentStep}
                    handleChange={handleChange}
                    email={state.email}
                    username={state.username}
                    password={state.password}
                    repassword={state.repassword}
                />
                <Step2
                    currentStep={state.currentStep}
                    handleChange={handleChange}
                    name={state.name}
                    surname={state.surname}
                    phone={state.phone}
                    birthday={state.birthday}
                />
                <div className="form-row btn-container">
                    {previousButton()}
                    {nextButton()}
                    {submitButton()}
                </div>
            </form>
        </div>
    );
};

export default Signup;
