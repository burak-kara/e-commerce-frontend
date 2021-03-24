import React from 'react';

const Step2 = (props) => {
    const { name, surname, phone, birthday, currentStep, handleChange } = props;

    if (currentStep !== 2) {
        return null;
    }

    return (
        <>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="surname">
                        Surname
                        <input
                            className="form-control"
                            id="surname"
                            name="surname"
                            type="text"
                            placeholder="Surname"
                            value={surname}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="phone">
                        Phone
                        <input
                            className="form-control"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="form-row input-field-container">
                <div className="form-group">
                    <label htmlFor="birthday">
                        Birthday
                        <input
                            className="form-control"
                            id="birthday"
                            name="birthday"
                            type="text"
                            placeholder="Birthday"
                            value={birthday}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
        </>
    );
};

export default Step2;
