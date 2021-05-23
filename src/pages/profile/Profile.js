import React from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccountDetailsList from './AccountDetailsList';
import { openAlert } from '../../_redux/actions';

const Profile = () => (
    <Container fluid className="account-info-page">
        <AccountDetailsList />
    </Container>
);

export default connect(null, { openAlert })(Profile);
