import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { ButtonGroup, Button, FormLabel } from '@material-ui/core';
import { Form, /* Col, */ Row, ListGroup } from 'react-bootstrap';
import { ComponentLoading } from '../../components';
import { updateUserInformation, getUserDetail } from '../../_requests';
import { openAlert, setUser, setUserDetail } from '../../_redux/actions';
import { noneError, ADMIN, TIME_OUT } from '../../_constants';

const AllUsersList = (params) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [allUsersList, setAllUsersList] = useState([
        {
            id: 1,
            username: 'johndoeeee',
            email: 'john.doe@gmail.com',
            phone_number: '539-456-12-45',
            first_name: 'John',
            last_name: 'Doe',
            addresses: ['Mint Street No.1', 'Address2'],
            is_sales_manager: false,
            is_product_manager: false,
            is_admin: false,
        },
        {
            id: 2,
            username: 'AliVeli',
            email: 'ali.veli@gmail.com',
            phone_number: '539-789-56-23',
            first_name: 'Ali',
            last_name: 'Veli',
            addresses: ['Mint Street No.2', 'Address5'],
            is_sales_manager: false,
            is_product_manager: false,
            is_admin: false,
        }
    ]);

    const [errors, setErrors] = useState({
        first_name: noneError,
        last_name: noneError,
        username: noneError,
        phone_number: noneError,
        email: noneError,
        addresses: noneError,
    });

    const findErrors = (updatedUser) => {
        // first_name errors
        const userNameToCheck = updatedUser.userNewName;
        if (!userNameToCheck || userNameToCheck === '')
            errors.first_name = 'Please provide a valid name!';
        else if (userNameToCheck.length < 2) errors.first_name = 'Name is too short!';
        else if (userNameToCheck.length > 16) errors.first_name = 'Name is too long!';
        else errors.first_name = noneError;

        // last_name errors
        const userSurNameToCheck = updatedUser.userNewLastname;
        if (!userSurNameToCheck || userSurNameToCheck === '')
            errors.last_name = 'Please provide a valid surname!';
        else if (userSurNameToCheck.length < 2) errors.last_name = 'Surname is too short!';
        else if (userSurNameToCheck.length > 16) errors.last_name = 'Surname is too long!';
        else errors.last_name = noneError;

        return errors;
    };

    const checkAnyError = (stepErrors, updatedUser) => {
        setErrors(findErrors(updatedUser));
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

    const updateUser = (updatedUserInfo) => {
        const updatedUser = {
            username: updatedUserInfo.username,
            email: updatedUserInfo.email,
            phone_number: updatedUserInfo.phone_number,
            first_name: updatedUserInfo.userNewName,
            last_name: updatedUserInfo.userNewLastname,
            addresses: updatedUserInfo.addresses,
        };

        //  Use BE to update PW instead of logging it here.
        if (!checkAnyError(errors, updatedUserInfo)) {
            setLoading(true);
            updateUserInformation(updatedUser)
                .then((response) => {
                    params.openAlert({
                        message: 'User account information successfully updated.',
                        severity: 'success',
                    });
                    params.setUser(response.data);
                    getUserDetail()
                        .then((detail) => {
                            params.setUserDetail(detail.data);
                            history.push({
                                pathname: ADMIN,
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
                            pathname: ADMIN,
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

    const saveUsers = () => {
        if (allUsersList) {
            allUsersList.forEach((user) => {
                updateUser(user);
            });
        }
    }

    const setUserAsNormalUser = (userID) => {
        const newUserList = [];
        let currentUser = null;
        if (allUsersList) {
            allUsersList.forEach((user) => {
                if (user.id === userID) {
                    currentUser = user;
                    currentUser.is_sales_manager = false;
                    currentUser.is_product_manager = false;
                    newUserList.push(currentUser);
                } else {
                    newUserList.push(user);
                }
            });
        }
        setAllUsersList(newUserList);
    }

    const setUserAsSalesManager = (userID) => {
        const newUserList = [];
        let currentUser = null;
        if (allUsersList) {
            allUsersList.forEach((user) => {
                if (user.id === userID) {
                    currentUser = user;
                    currentUser.is_sales_manager = true;
                    currentUser.is_product_manager = false;
                    newUserList.push(currentUser);
                } else {
                    newUserList.push(user);
                }
            });
        }
        setAllUsersList(newUserList);
    }

    const setUserAsProductManager = (userID) => {
        const newUserList = [];
        let currentUser = null;
        if (allUsersList) {
            allUsersList.forEach((user) => {
                if (user.id === userID) {
                    currentUser = user;
                    currentUser.is_sales_manager = false;
                    currentUser.is_product_manager = true;
                    newUserList.push(currentUser);
                } else {
                    newUserList.push(user);
                }
            });
        }
        setAllUsersList(newUserList);
    }

    const populateAllUsers = () => {
        const list = [];
        let userIndex = 0;
        if (allUsersList) {
            allUsersList.forEach((user, index) => {
                if (user) {
                    list.push(
                        <ListGroup.Item
                            header={`User ${userIndex + 1}`}
                            className="admin-console-user-row 
                                col-lg-12 
                                col-md-9 
                                col-sm-6 
                                col-xs-4
                                col-12"
                            key={`user-${userIndex}`}
                        >
                            <Form.Group>
                                <FormLabel className="user-detail-label 
                                        col-lg-1 
                                        col-md-9 
                                        col-sm-6 
                                        col-xs-4 
                                        col-1">
                                    {index + 1}
                                </FormLabel>
                            </Form.Group>
                            <Form.Group>
                                <FormLabel className="user-detail-label 
                                        col-lg-1 
                                        col-md-9 
                                        col-sm-6 
                                        col-xs-4 
                                        col-1">
                                    {user.username}
                                </FormLabel>
                            </Form.Group>
                            <Form.Group>
                                <FormLabel className="user-detail-label 
                                        col-lg-1 
                                        col-md-9 
                                        col-sm-6 
                                        col-xs-4 
                                        col-1">
                                    {user.first_name}
                                </FormLabel>
                            </Form.Group>
                            <Form.Group>
                                <FormLabel className="user-detail-label 
                                        col-lg-1 
                                        col-md-9 
                                        col-sm-6 
                                        col-xs-4 
                                        col-1">
                                    {user.last_name}
                                </FormLabel>
                            </Form.Group>
                            <ButtonGroup
                                size="small"
                                aria-label="user-role-button-group"
                                className="update-user-role-button-group"
                            >
                                {loading ? (<ComponentLoading />) :
                                    (<Button
                                        className="update-user-role-button 
                                            col-lg-1 
                                            col-md-3 
                                            col-sm-3 
                                            col-xs-3 
                                            col-3"
                                        disabled={
                                            (!user.is_product_manager
                                                && !user.is_sales_manager)
                                        }
                                        onClick={() => setUserAsNormalUser(user.id)}

                                    >
                                        Customer
                                    </Button>
                                    )
                                }
                                {loading ? (<ComponentLoading />) :
                                    (<Button
                                        className="update-user-role-button 
                                            col-lg-1 
                                            col-md-3 
                                            col-sm-3 
                                            col-xs-3
                                            col-3"
                                        disabled={user.is_sales_manager}
                                        onClick={() => setUserAsSalesManager(user.id)}
                                    >
                                        Sales Manager
                                    </Button>
                                    )
                                }
                                {loading ? (<ComponentLoading />) :
                                    (<Button
                                        className="update-user-role-button 
                                            col-lg-1 
                                            col-md-3 
                                            col-sm-3 
                                            col-xs-3 
                                            col-3"
                                        disabled={user.is_product_manager}
                                        onClick={() => setUserAsProductManager(user.id)}
                                    >
                                        Product Manager
                                    </Button>
                                    )
                                }
                            </ButtonGroup>
                        </ListGroup.Item>
                    );
                    userIndex += 1;
                }
            });
        }
        return list;
    }

    return (
        <div className="admin-console-page" key="admin-console-page">
            <Form
                className="form-container col-lg-11 col-md-9 col-sm-6 col-xs-4 col-12"
                noValidate
                key="adminConsole"
            >
                <Form.Row
                    className="user-list-headers"
                >
                    <Form.Group className="user-list-header 
                                col-xl-1
                                col-lg-1 
                                col-md-1 
                                col-sm-1 
                                col-xs-1
                                col-1">
                        <Form.Label>
                            #
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="user-list-header 
                                col-xl-1
                                col-lg-1 
                                col-md-1 
                                col-sm-1 
                                col-xs-1
                                col-1">
                        <Form.Label>
                            Username
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="user-list-header 
                                col-xl-1 
                                col-lg-1 
                                col-md-1 
                                col-sm-1 
                                col-xs-1
                                col-1">
                        <Form.Label>
                            First Name
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="user-list-header 
                                col-xl-1 
                                col-lg-1 
                                col-md-1 
                                col-sm-1 
                                col-xs-1
                                col-1">
                        <Form.Label>
                            Last Name
                        </Form.Label>
                    </Form.Group>
                </Form.Row>
                <Form.Group as={Row} className="admin-console-user-list">
                    <ListGroup variant="flush" className="admin-console-user-list">
                        {populateAllUsers()}
                    </ListGroup>
                </Form.Group>
                <Form.Row className="update-users-button-section">
                    <Button className="update-all-users-button" onClick={saveUsers}>
                        Save Users
                    </Button>
                </Form.Row>
            </Form>
        </div>
    );
};

export default connect(null, { openAlert, setUser, setUserDetail })(AllUsersList);
