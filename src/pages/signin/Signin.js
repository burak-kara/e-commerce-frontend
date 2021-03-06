import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { openAlert, setToken, setUser, setUserDetail } from '../../_redux/actions';
import { ComponentLoading } from '../../components';
import { getUser, getUserDetail, login, verify2FA } from '../../_requests';
import { Hide, Show } from '../../_utilities/icons';
import { logo } from '../../_assets';
import { LANDING, noneError, SIGN_OUT, TIME_OUT, TOKEN } from '../../_constants';
import AuthModal from './AuthModal';

const Signin = (params) => {
    const history = useHistory();
    const [showPassword, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [form, setForm] = useState({
        is_sales_manager: false,
        is_product_manager: false,
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };

    const findErrors = () => {
        const { username, password } = form;
        const newErrors = {
            username: noneError,
            password: noneError,
        };

        // username errors
        if (!username) newErrors.username = 'Please provide a valid username!';
        else if (username === '') newErrors.username = 'Username should not be empty';

        // password errors
        if (!password || password === '') newErrors.password = 'Please provide a valid password!';

        return newErrors;
    };

    const onCode = (e) => {
        if (e.target.value && e.target.value.length === 6) {
            verify2FA(e.target.value).then((response) => {
                if (response.data) {
                    setIsInvalid(false);
                    setTimeout(() => {
                        history.push({
                            pathname: LANDING,
                        });
                    }, TIME_OUT);
                } else {
                    setIsInvalid(true);
                }
            });
        }
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
        const stepError = findErrors();
        setErrors(stepError);
        if (!checkAnyError(stepError)) {
            setLoading(true);
            login(form)
                .then((response) => {
                    localStorage.setItem(TOKEN, response.data.key);
                    params.openAlert({
                        message: 'Logged in successfully!',
                        severity: 'success',
                    });
                    params.setToken({
                        key: response.data.key,
                    });
                    getUser(response.data.key)
                        .then((r) => {
                            params.setUser(r.data);
                            getUserDetail()
                                .then((detail) => {
                                    params.setUserDetail(detail.data);
                                    if (detail.data.twoFA_enabled) {
                                        setModal(true);
                                    } else {
                                        history.push({
                                            pathname: LANDING,
                                        });
                                    }
                                })
                                .catch(() => {
                                    params.openAlert({
                                        message: 'Error while getting user info',
                                        severity: 'error',
                                    });
                                });
                            setLoading(false);
                        })
                        .catch(() => {
                            params.openAlert({
                                message: 'Error while getting user info',
                                severity: 'error',
                            });
                        });
                })
                .catch((error) => {
                    params.openAlert({
                        message:
                            error && error.response && error.response.data.non_field_errors
                                ? error.response.data.non_field_errors[0]
                                : 'Wrong credentials while logging in!',
                        severity: 'error',
                    });
                });
            setLoading(false);
        }
    };

    const handlePasswordClick = () => {
        setPasswordShow(!showPassword);
    };

    const handleLogoClick = () => {
        history.push({
            pathname: LANDING,
        });
    };

    const renderSubmitButton = () => (
        <button className="btn font-weight-bold sign-in-btn" type="submit">
            {loading ? <ComponentLoading /> : 'Sign in'}
        </button>
    );

    return (
        <>
            <div className="signin">
                <Form
                    className="form-container col-lg-3 col-md-6 col-sm-10 col-12"
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
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setField('username', e.target.value)}
                                isInvalid={!!errors.username && errors.username !== noneError}
                                isValid={errors.username === noneError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="12" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    required
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setField('password', e.target.value)}
                                    isInvalid={!!errors.password && errors.password !== noneError}
                                    isValid={errors.password === noneError}
                                />
                                <InputGroup.Append>
                                    <button
                                        className="btn password_btn"
                                        type="button"
                                        onClick={handlePasswordClick}
                                    >
                                        {showPassword ? (
                                            <Hide color="white" />
                                        ) : (
                                            <Show color="white" />
                                        )}
                                    </button>
                                </InputGroup.Append>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <div className="form-row btn-container">{renderSubmitButton()}</div>
                </Form>
            </div>
            {modal ? (
                <AuthModal
                    onChange={onCode}
                    show={modal}
                    isInvalid={isInvalid}
                    onHide={() => {
                        setModal(false);
                        history.push({
                            pathname: SIGN_OUT,
                        });
                    }}
                />
            ) : null}
        </>
    );
};

export default connect(null, { openAlert, setToken, setUser, setUserDetail })(Signin);
