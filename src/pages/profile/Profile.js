import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';

const Profile = () => {
    const user = {
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@gmail.com',
        phoneNumber: '+90 530 234 5678',
        password: 12345,
    };

    const [values, setValues] = React.useState({
        password: user.password, //    This needs to change with the user's password.
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <div className="account-info-page">
            <h1>Account Info</h1>
            <div>
                <img
                    className="profile-picture"
                    src="" //   Input the user's photo here.
                    alt="PP"
                />
            </div>
            <br />
            <div className="account-info-list">
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Name:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userName"
                            name="userName"
                            text={user.name}
                            value={user.name}
                        >
                            John
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Surname:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userSurname"
                            name="userSurname"
                        >
                            Doe
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Nickname:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userNickname"
                            name="userNickname"
                        >
                            JohnDoe1234
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Mail:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userEmail"
                            name="userEmail"
                        >
                            john.doe@gmail.com
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Phone:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userPhoneNumber"
                            name="userPhoneNumber"
                        >
                            +90 530 234 5678
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-details-element">
                        <text className="user-detail-label">Previous Orders:</text>
                        <text
                            className="user-detail-text-userspecific"
                            id="userOrderHistory"
                            name="userOrderHistory"
                        >
                            20 ETH
                            <br />
                            30 ETH
                            <br />
                            USB Storage Device
                        </text>
                    </div>
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
                <div className="account-info-list-details">
                    <div className="account-info-filler">
                        <text />
                    </div>
                    <div className="account-info-list-password-element">
                        <text className="account-info-detail-password">Password:</text>
                    </div>
                    <Input
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handlePasswordChange('password')}
                        value={values.password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}{' '}
                                </IconButton>
                            </InputAdornment>
                        }
                        style={{ margin: '0px 60px' }}
                    />
                    <div className="account-info-filler">
                        <text />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
