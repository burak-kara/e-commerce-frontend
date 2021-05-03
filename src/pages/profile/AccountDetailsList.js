import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Form, Col, Row, InputGroup, ListGroup } from 'react-bootstrap';
import { ComponentLoading, PageLoading } from '../../components';
import { updateUserInformation, changePassword, getUserDetail } from '../../_requests';
import { openAlert, setUser, setUserDetail } from '../../_redux/actions';
import { Hide, Show } from '../../_utilities/icons';
import {
    noneError,
    emailRegex,
    passwordRegex,
    PROFILE,
    TIME_OUT
} from '../../_constants';

const AccountDetailsList = (params) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { user } = useStore().getState();
    const [userNewName, setUserNewName] = useState('');
    const [userNewSurname, setUserNewSurname] = useState('');
    const [userNewAddress, setUserNewAddress] = useState('');
    const [showNewPassword1, setShowNewPassword1] = useState(false);
    const [showNewPassword2, setShowNewPassword2] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [userAddresses, setUserAddresses] = useState([]);
    const [userUpdatedAddresses, setUserUpdatedAddresses] = useState('');

    console.log(user);

    const [passwordForm, setPasswordForm] = useState({
        new_password1: '',
        new_password2: '',
        old_password: '',
    });

    useEffect(() => {
        setUserAddresses(user.addresses ? user.addresses.replaceAll("'", '').split(', ') : []);
    }, []);

    // possible fix for the Form.Control component losing focus?
    // useEffect(() => {
    //     console.log(userUpdatedAddresses);
    // }, [userUpdatedAddresses]);

    const [errors, setErrors] = useState({
        email: noneError,
        username: noneError,
        first_name: noneError,
        last_name: noneError,
        phone_number: noneError,
        addresses: noneError
    });

    const [passwordErrors, setPasswordErrors] = useState({
        new_password1: noneError,
        new_password2: noneError,
        old_password: noneError
    });

    const setPasswordFormField = (field, value) => {
        setPasswordForm({
            ...passwordForm,
            [field]: value,
        });
    };

    /*
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    */

    const findErrors = () => {

        // first_name errors
        if (!userNewName || userNewName === '')
            errors.first_name = 'Please provide a valid name!';
        else if (userNewName.length < 2) errors.first_name = 'Name is too short!';
        else if (userNewName.length > 16) errors.first_name = 'Name is too long!';
        else errors.first_name = noneError;

        // last_name errors
        if (!userNewSurname || userNewSurname === '')
            errors.last_name = 'Please provide a valid surname!';
        else if (userNewSurname.length < 2) errors.last_name = 'Surname is too short!';
        else if (userNewSurname.length > 16) errors.last_name = 'Surname is too long!';
        else errors.last_name = noneError;

        // username errors
        if (!user.username) errors.username = 'Please provide a valid username!';
        else if (user.username === '' || user.username.length < 5)
            errors.username = 'Username should be at least 5 characters';
        else if (user.username.length > 12)
            errors.username = 'Username should be at max 12 characters!';
        else
            errors.username = noneError;

        // email errors
        if (!user.email || user.email === '')
            errors.email = 'Please provide a valid email address!';
        else if (user.email.length > 30) errors.email = 'Email is too long!';
        else if (!emailRegex.test(user.email)) errors.email = 'Invalid email!';
        else errors.email = noneError;

        // phone_number errors
        if (!user.phone_number || user.phone_number === '' || user.phone_number.length !== 13)
            errors.phone_number = 'Please provide a valid phone number!';
        else
            errors.phone_number = noneError;

        return errors;
    };

    const checkAnyError = (stepErrors) => {
        setErrors(findErrors());
        let isError = false;
        Object.values(stepErrors).forEach((value) => {
            if (value !== noneError) {
                isError = true;
            }
        });
        return isError;
    };

    const findPasswordErrors = () => {

        // password errors
        //  TODO: check the password somewhere else
        if (!passwordForm.newPassword1 || passwordForm.newPassword1 === '')
            errors.password = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.newPassword1))
            errors.password =
                'Password should contain at least one number and one special character!';

        if (!passwordForm.newPassword2 || passwordForm.newPassword2 === '')
            errors.password = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.newPassword2))
            errors.password =
                'Password should contain at least one number and one special character!';

        if (!passwordForm.oldPassword || passwordForm.oldPassword === '')
            errors.password = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.oldPassword))
            errors.password =
                'Password should contain at least one number and one special character!';

        return passwordErrors;
    }

    const checkAnyPasswordError = (passwordErrorList) => {
        setPasswordErrors(findPasswordErrors());
        let isPasswordError = false;
        Object.values(passwordErrorList).forEach((value) => {
            if (value !== noneError) {
                isPasswordError = true;
            }
        });
        return isPasswordError;
    };

    const setServerSideResponse = (serverErrors) => {
        const newErrors = {
            email: noneError,
            username: noneError,
            first_name: noneError,
            last_name: noneError,
            phone_number: noneError,
        };

        Object.keys(serverErrors).forEach((key) => {
            // eslint-disable-next-line prefer-destructuring
            newErrors[key] = serverErrors[key][0];
        });
        return newErrors;
    };

    const updateUser = () => {
        const newUserInfo = {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            first_name: userNewName,
            last_name: userNewSurname,
            addresses: userAddresses
        };

        //  Use BE to update PW instead of logging it here.
        if (!checkAnyError(errors)) {
            setLoading(true);
            updateUserInformation(newUserInfo)
                .then((response) => {
                    params.openAlert({
                        message: 'Account information successfully updated.',
                        severity: 'success',
                    });
                    params.setUser(response.data);
                    setTimeout(() => {
                        history.push({
                            pathname: PROFILE,
                        });
                    }, TIME_OUT);
                    setLoading(false);
                })
                .catch((error) => {
                    params.openAlert({
                        message: 'Something went wrong while updating account information!',
                        severity: 'error',
                    });
                    const serverErrors = setServerSideResponse(error.response.data);
                    setErrors(serverErrors);
                    setLoading(false);
                });
        }
    }

    const onClickUpdateUser = () => {
        updateUser();
    };

    const onClickUpdatePassword = () => {
        if (!checkAnyPasswordError(passwordErrors)) {
            setLoading(true);
            changePassword(passwordForm)
                .then((response) => {
                    params.openAlert({
                        message: 'Password updated successfully.',
                        severity: 'success',
                    });
                    params.setUser(response.data);
                    setTimeout(() => {
                        history.push({
                            pathname: PROFILE,
                        });
                    }, TIME_OUT);
                    setLoading(false);
                })
                .catch((error) => {
                    params.openAlert({
                        message: 'Something went wrong while updating account password!',
                        severity: 'error',
                    });
                    const serverErrors = setServerSideResponse(error.response.data);
                    setErrors(serverErrors);
                    setLoading(false);
                });
        }
    };

    const onChangeFirstName = (param) => {
        setUserNewName(param);
    }

    const onChangeLastName = (param) => {
        setUserNewSurname(param);
    }

    const updateUserAddress = (updatedAddress, addressName) => {
        const index = addressName.lastIndexOf('s') + 1;
        userAddresses[addressName.substr(index, addressName.length)] = updatedAddress;
        let updatedAddresses = '';
        Object.values(userAddresses).forEach((value) => {
            const currentAddress = `'${value}', `;
            updatedAddresses += currentAddress;
        });
        updatedAddresses = updatedAddresses.substring(0, updatedAddresses.lastIndexOf(`'`) + 1);
        setUserUpdatedAddresses(updatedAddresses);
    }

    const updateUserAddresses = () => {
        const newUserInfo = {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            first_name: user.first_name,
            last_name: user.last_name,
            addresses: userUpdatedAddresses
        };

        //  Use BE to update PW instead of logging it here.
        setLoading(true);
        updateUserInformation(newUserInfo)
            .then((response) => {
                params.openAlert({
                    message: 'Account address information successfully updated.',
                    severity: 'success',
                });
                params.setUser(response.data);
                getUserDetail()
                    .then((detail) => {
                        params.setUserDetail(detail.data);
                        history.push({
                            pathname: PROFILE,
                        });
                    })
                    .catch(() => {
                        params.openAlert({
                            message: 'Error while getting user info',
                            severity: 'error',
                        });
                    });
                setTimeout(() => {
                    history.push({
                        pathname: PROFILE,
                    });
                }, TIME_OUT);
                setLoading(false);
            })
            .catch((error) => {
                params.openAlert({
                    message: 'Something went wrong while updating account information!',
                    severity: 'error',
                });
                const serverErrors = setServerSideResponse(error.response.data);
                setErrors(serverErrors);
                setLoading(false);
            });
    }

    const onClickUpdateAddresses = () => {
        if (userNewAddress && userNewAddress !== '') {
            userAddresses.push(userNewAddress);
        }
        setUserNewAddress('');
        updateUserAddresses();
    }

    const ListItems = () => {
        const list = [];
        let addressIndex = 0;
        if (userAddresses) {
            userAddresses.forEach((address) => {
                list.push(
                    <ListGroup.Item className="address-textbox" key={addressIndex}>
                        <Form.Control
                            name={`address${addressIndex}`}
                            type="text"
                            placeholder="User Address"
                            defaultValue={address}
                            onChange={(e) => updateUserAddress(e.target.value, e.target.name)}
                        />
                    </ListGroup.Item>,
                );
                addressIndex += 1;
            });
            list.push(
                <ListGroup.Item className="address-textbox" key={addressIndex}>
                    <Form.Control
                        name={`address${addressIndex}`}
                        type="text"
                        placeholder="Enter new address"
                        defaultValue={userNewAddress}
                        onChange={(e) => setUserNewAddress(e.target.value)}
                    />
                </ListGroup.Item>
            );
        }
        return list;
    };

    const handleNewPassword1Click = () => {
        setShowNewPassword1(!showNewPassword1);
    };

    const handleNewPassword2Click = () => {
        setShowNewPassword2(!showNewPassword2);
    };

    const handleOldPasswordClick = () => {
        setShowOldPassword(!showOldPassword);
    };

    const renderAddressesContent = () => userAddresses.length < 1 ? <PageLoading /> : <ListItems />;

    return (
        <div className="account-info-page">
            <Form
                className="form-container col-lg-3 col-md-6 col-sm-10 col-12"
                noValidate
                onSubmit={updateUser}
            >
                <Form.Row className="page-title">
                    <h1>Account Information</h1>
                </Form.Row>
                <Form.Row className="page-title">
                    <h3>User Details</h3>
                </Form.Row>
                <Form.Row className="labels">
                    <Form.Group as={Row} md="12">
                        <Form.Label>First Name</Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} md="12">
                        <Form.Label>Last Name</Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="inputs">
                    <Form.Group as={Row} md="12" controlId="firstNameInput">
                        <Form.Control
                            name="first_name"
                            type="text"
                            placeholder="Firstname"
                            defaultValue={user.first_name}
                            onChange={(e) => onChangeFirstName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Row} md="12" controlId="lastNameInput">
                        <Form.Control
                            name="last_name"
                            type="text"
                            placeholder="Lastname"
                            defaultValue={user.last_name}
                            onChange={(e) => onChangeLastName(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="buttons">
                    <button
                        className="btn font-weight-bold update-name-surname-btn"
                        type="button"
                        onClick={onClickUpdateUser}
                    >
                        {loading ? <ComponentLoading /> : 'Update'}
                    </button>
                </Form.Row>
                <Form.Group />
                <Form.Row className="page-title">
                    <h3>User Account Addresses</h3>
                </Form.Row>
                <Form.Row className="address-list">
                    <Form.Group as={Col} md="12">
                        <ListGroup variant="flush" className="address-textbox">
                            {renderAddressesContent()}
                        </ListGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="buttons">
                    <button
                        className="btn font-weight-bold update-name-surname-btn"
                        type="button"
                        onClick={onClickUpdateAddresses}
                    >
                        {loading ? <ComponentLoading /> : 'Update Addresses'}
                    </button>
                </Form.Row>
                <Form.Group />
                <Form.Row className="page-title">
                    <h3>Password</h3>
                </Form.Row>
                <Form.Row className="inputs">
                    <Form.Group as={Col} md="12">
                        <InputGroup className="password-input-group">
                            <Form.Control
                                className="password-textbox"
                                name="newPassword1"
                                type={showNewPassword1 ? 'text' : 'password'}
                                placeholder="Enter new password"
                                defaultValue=''
                                onChange={(e) =>
                                    setPasswordFormField('new_password1', e.target.value)}
                            />
                            <InputGroup.Append>
                                <button
                                    className="btn password_btn"
                                    type="button"
                                    onClick={handleNewPassword1Click}
                                >
                                    {showNewPassword1 ?
                                        <Hide color="white" /> : <Show color="white" />}
                                </button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Group />
                        <InputGroup className="password-input-group">
                            <Form.Control
                                className="password-textbox"
                                name="newPassword2"
                                type={showNewPassword2 ? 'text' : 'password'}
                                placeholder="Enter new password again"
                                defaultValue=''
                                onChange={(e) =>
                                    setPasswordFormField('new_password2', e.target.value)}
                            />
                            <InputGroup.Append>
                                <button
                                    className="btn password_btn"
                                    type="button"
                                    onClick={handleNewPassword2Click}
                                >
                                    {showNewPassword2 ?
                                        <Hide color="white" /> : <Show color="white" />}
                                </button>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Group />
                        <InputGroup className="password-input-group">
                            <Form.Control
                                className="password-textbox"
                                name="oldPasword"
                                type={showOldPassword ? 'text' : 'password'}
                                placeholder="Enter your current password"
                                defaultValue=''
                                onChange={(e) =>
                                    setPasswordFormField('old_password', e.target.value)}
                            />
                            <InputGroup.Append>
                                <button
                                    className="btn password_btn"
                                    type="button"
                                    onClick={handleOldPasswordClick}
                                >
                                    {showOldPassword ?
                                        <Hide color="white" /> : <Show color="white" />}
                                </button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="buttons">
                    <button
                        className="btn font-weight-bold update-name-surname-btn"
                        type="button"
                        onClick={onClickUpdatePassword}
                    >
                        {loading ? <ComponentLoading /> : 'Update Password'}
                    </button>
                </Form.Row>
            </Form>

        </div>
    );
};

export default connect(null, { openAlert, setUser, setUserDetail })(AccountDetailsList);
