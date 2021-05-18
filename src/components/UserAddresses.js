import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { openAlert } from '../_redux/actions';

const UserAddresses = (props) => {
    const { index, address, updateUserAddress, placeHolder } = props;

    return (
        <Form.Control
            name={`address${index}`}
            type="text"
            placeholder={placeHolder}
            defaultValue={address}
            onBlur={(e) => updateUserAddress(e.target.value, e.target.name)}
        />
    );
};

export default connect(null, { openAlert })(UserAddresses);
