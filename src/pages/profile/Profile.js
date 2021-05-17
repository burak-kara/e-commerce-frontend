import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccountDetailsList from './AccountDetailsList';
import { openAlert } from '../../_redux/actions';


const Profile = () => {

    const renderUserInfo = () =>
        <AccountDetailsList key="profilePageDetails" />

    return (
        <Container key="profilePage">
            <Row>
                <Col>
                    {renderUserInfo()}
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Profile);
