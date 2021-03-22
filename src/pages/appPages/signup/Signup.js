import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, username, password, name, surname, phone, birthday } = state;
        alert(`Your registration detail: \n 
            Email: ${email} \n 
            Username: ${username} \n
            Password: ${password} \n
            Name: ${name} \n
            Surname: ${surname} \n
            Birthday: ${birthday} \n
            Phone: ${phone} \n`);
    };

    const next = () => {
        let { currentStep } = state;
        currentStep += 1;
        setState({
            ...state,
            currentStep,
        });
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
                disabled={isDisabled}
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
            <form className="form-container" onSubmit={handleSubmit}>
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
