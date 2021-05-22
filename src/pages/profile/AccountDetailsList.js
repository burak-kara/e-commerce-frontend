import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { Form, Col, InputGroup, ListGroup } from 'react-bootstrap';
import { ComponentLoading, UserAddresses } from '../../components';
import { updateUserInformation, changePassword, getUserDetail } from '../../_requests';
import { openAlert, setUser, setUserDetail } from '../../_redux/actions';
import { Hide, Show } from '../../_utilities/icons';
import { noneError, passwordRegex, PROFILE, TIME_OUT } from '../../_constants';

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

    const [passwordForm, setPasswordForm] = useState({
        new_password1: '',
        new_password2: '',
        old_password: '',
    });

    useEffect(() => {
        setUserAddresses(user.addresses ? user.addresses.replace(/'/g, '').split(',') : []);
    }, []);

    // possible fix for the Form.Control component losing focus?
    useEffect(() => {}, [userUpdatedAddresses]);

    const [errors, setErrors] = useState({
        first_name: noneError,
        last_name: noneError,
        addresses: noneError,
    });

    const [passwordErrors, setPasswordErrors] = useState({
        new_password1: noneError,
        new_password2: noneError,
        old_password: noneError,
    });

    const setPasswordFormField = (field, value) => {
        setPasswordForm({
            ...passwordForm,
            [field]: value,
        });
    };

    const findErrors = () => {
        // first_name errors
        const userNameToCheck = userNewName === '' ? user.first_name : userNewName;
        if (!userNameToCheck || userNameToCheck === '')
            errors.first_name = 'Please provide a valid name!';
        else if (userNameToCheck.length < 2) errors.first_name = 'Name is too short!';
        else if (userNameToCheck.length > 16) errors.first_name = 'Name is too long!';
        else errors.first_name = noneError;

        // last_name errors
        const userSurNameToCheck = userNewSurname === '' ? user.last_name : userNewSurname;
        if (!userSurNameToCheck || userSurNameToCheck === '')
            errors.last_name = 'Please provide a valid surname!';
        else if (userSurNameToCheck.length < 2) errors.last_name = 'Surname is too short!';
        else if (userSurNameToCheck.length > 16) errors.last_name = 'Surname is too long!';
        else errors.last_name = noneError;

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
        if (!passwordForm.new_password1 || passwordForm.new_password1 === '')
            passwordErrors.new_password1 = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.new_password1))
            passwordErrors.new_password1 =
                'Password should contain at least one number and one special character!';

        if (!passwordForm.new_password2 || passwordForm.new_password2 === '')
            passwordErrors.new_password2 = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.new_password2))
            passwordErrors.new_password2 =
                'Password should contain at least one number and one special character!';

        if (!passwordForm.old_password || passwordForm.old_password === '')
            passwordErrors.old_password = 'Please provide a valid password!';
        else if (!passwordRegex.test(passwordForm.old_password))
            passwordErrors.old_password =
                'Password should contain at least one number and one special character!';

        return passwordErrors;
    };

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
            Object.keys(serverErrors[key]).forEach((value) => {
                newErrors[key] = value;
            });
        });
        return newErrors;
    };

    const updateUser = () => {
        const newUserInfo = {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            first_name: userNewName === '' ? user.first_name : userNewName,
            last_name: userNewSurname === '' ? user.last_name : userNewSurname,
            addresses: user.addresses,
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

    const updateUserAddress = (updatedAddress, addressName) => {
        const index = addressName.lastIndexOf('s') + 1;
        userAddresses[addressName.substr(index, addressName.length)] = updatedAddress;
        let updatedAddresses = '';
        Object.values(userAddresses).forEach((value) => {
            const currentAddress = `'${value}',`;
            updatedAddresses += currentAddress;
        });
        updatedAddresses = updatedAddresses.substring(0, updatedAddresses.lastIndexOf(`'`) + 1);
        setUserUpdatedAddresses(updatedAddresses);
    };

    const updateAddressesWithNewAddress = (newAddress, addressName) => {
        if (newAddress && newAddress !== '') {
            const index = addressName.lastIndexOf('s') + 1;
            let updatedAddresses = '';
            const addressType = addressName.substr(index, addressName.length);
            if (addressType === 'New') {
                const newAddressList = userAddresses;
                newAddressList.push(newAddress);
                Object.values(newAddressList).forEach((value) => {
                    const currentAddress = `'${value}',`;
                    updatedAddresses += currentAddress;
                });
                updatedAddresses = updatedAddresses.substring(
                    0,
                    updatedAddresses.lastIndexOf(`'`) + 1,
                );
                setUserUpdatedAddresses(updatedAddresses);
            }
            setUserUpdatedAddresses(updatedAddresses);
        }
    };

    const updateUserAddresses = () => {
        const newUserInfo = {
            username: user.username,
            email: user.email,
            phone_number: user.phone_number,
            first_name: user.first_name,
            last_name: user.last_name,
            addresses: userUpdatedAddresses,
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
    };

    const onClickUpdateAddresses = () => {
        if (userNewAddress && userNewAddress !== '') {
            userAddresses.push(userNewAddress);
        }
        setUserNewAddress('');
        updateUserAddresses();
    };

    const ListAddresses = () => {
        const list = [];
        let addressIndex = 0;
        if (userAddresses) {
            userAddresses.forEach((address, index) => {
                if (address !== '') {
                    list.push(
                        <ListGroup.Item
                            header={`Address ${index + 1}`}
                            className="address-textbox"
                            key={`address-${addressIndex}`}
                        >
                            <UserAddresses
                                index={index}
                                address={address}
                                updateUserAddress={updateUserAddress}
                                placeHolder="User Address"
                                componentIndex={addressIndex}
                                key={`address-${addressIndex}`}
                            />
                        </ListGroup.Item>,
                    );
                    addressIndex += 1;
                }
            });
            list.push(
                <ListGroup.Item className="address-textbox" key="new-address">
                    <UserAddresses
                        index="New"
                        address={userNewAddress}
                        updateUserAddress={updateAddressesWithNewAddress}
                        placeHolder="Enter new address"
                        componentIndex="new"
                        key={`address-${addressIndex}`}
                    />
                </ListGroup.Item>,
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

    const renderAddressesContent = () =>
        userAddresses.length < 1 ? (
            <UserAddresses
                index="New"
                address={userNewAddress}
                updateUserAddress={updateAddressesWithNewAddress}
                placeHolder="Enter new address"
                componentIndex="new"
                key="address-new"
            />
        ) : (
            <ListAddresses />
        );

    return (
        <Form
            className="form-container"
            noValidate
            onSubmit={updateUser}
            key="profilePageDetailUpdateForm"
        >
            <Form.Row className="page-title">
                <h1>Account Information</h1>
            </Form.Row>
            <Form.Row className="page-title">
                <h3>User Details</h3>
            </Form.Row>
            <Form.Row className="input-row">
                <Form.Group as={Col} xl={5} xs={12} controlId="firstNameInput">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        className="input-details"
                        name="first_name"
                        type="text"
                        placeholder="Firstname"
                        defaultValue={user.first_name}
                        onChange={(e) => setUserNewName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.first_name}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xl={5} xs={12} controlId="lastNameInput">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        className="input-details"
                        name="last_name"
                        type="text"
                        placeholder="Surname"
                        defaultValue={user.last_name}
                        onChange={(e) => setUserNewSurname(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row className="input-row">
                <Form.Group as={Col} xl={3} xs={12} controlId="userNameInput">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        className="input-details"
                        disabled
                        name="username"
                        type="text"
                        placeholder="Username"
                        defaultValue={user.username}
                    />
                </Form.Group>
                <Form.Group as={Col} xl={3} xs={12} className="" controlId="emailAddressInput">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        className="input-details"
                        disabled
                        name="email_address"
                        type="text"
                        placeholder="***@***.***"
                        defaultValue={user.email}
                    />
                </Form.Group>
                <Form.Group as={Col} xl={3} xs={12} controlId="phoneNumberInput">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        className="input-details"
                        disabled
                        name="phone_number"
                        type="text"
                        placeholder="### ### ####"
                        defaultValue={user.phone_number}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row className="buttons">
                <button
                    className="btn font-weight-bold update-name-surname-btn"
                    name="Update"
                    type="button"
                    onClick={updateUser}
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
                    <ListGroup variant="flush">{renderAddressesContent()}</ListGroup>
                </Form.Group>
            </Form.Row>
            <Form.Row className="buttons">
                <button
                    className="btn font-weight-bold update-name-surname-btn"
                    name="Update Address"
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
            <Form.Row className="input-row">
                <Form.Group as={Col} md="12">
                    <InputGroup className="password-input-group">
                        <Form.Control
                            className="password-textbox"
                            name="newPassword1"
                            type={showNewPassword1 ? 'text' : 'password'}
                            placeholder="Enter new password"
                            defaultValue=""
                            onChange={(e) => setPasswordFormField('new_password1', e.target.value)}
                        />
                        <InputGroup.Append>
                            <button
                                className="btn password_btn"
                                name="Hide Show"
                                type="button"
                                onClick={handleNewPassword1Click}
                            >
                                {showNewPassword1 ? <Hide color="white" /> : <Show color="white" />}
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
                            defaultValue=""
                            onChange={(e) => setPasswordFormField('new_password2', e.target.value)}
                        />
                        <InputGroup.Append>
                            <button
                                className="btn password_btn"
                                name="Hide Show"
                                type="button"
                                onClick={handleNewPassword2Click}
                            >
                                {showNewPassword2 ? <Hide color="white" /> : <Show color="white" />}
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
                            defaultValue=""
                            onChange={(e) => setPasswordFormField('old_password', e.target.value)}
                        />
                        <InputGroup.Append>
                            <button
                                className="btn password_btn"
                                type="button"
                                onClick={handleOldPasswordClick}
                            >
                                {showOldPassword ? <Hide color="white" /> : <Show color="white" />}
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
    );
};

export default connect(null, { openAlert, setUser, setUserDetail })(AccountDetailsList);
