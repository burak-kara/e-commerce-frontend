import React from 'react';

const Step3 = (props) => {
    const { email, currentStep, handleChange } = props;
    if (currentStep !== 3) {
        // Prop: The current step
        return null;
    }
    return (
        <>
            <div className="form-group">
                <label htmlFor="email">
                    Email address
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter email"
                        value={email} // Prop: The email input data
                        onChange={handleChange} // Prop: Puts data into state
                    />
                </label>
            </div>
            <button className="btn btn-success btn-block" type="submit">
                Sign up
            </button>
        </>
    );
};

export default Step3;
