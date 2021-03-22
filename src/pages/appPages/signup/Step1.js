import React from 'react';

const Step1 = (props) => {
    const { email, username, password, repassword, currentStep, handleChange } = props;

    if (currentStep !== 1) {
        return null;
    }

    return (
        <>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="email">
                        Email address
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="username">
                        Username
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="password">
                        Password
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="repassword">
                        Password
                        <input
                            className="form-control"
                            id="repassword"
                            name="repassword"
                            type="text"
                            placeholder="Confirm password"
                            value={repassword}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </>
    );
};

export default Step1;
