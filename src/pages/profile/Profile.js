import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccountDetailsList from './AccountDetailsList';
import { openAlert } from '../../_redux/actions';


const Profile = () => {

    const renderUserInfo = () =>
        <AccountDetailsList />

    return (
        <Container>
            <Row>
                <Col>
                    {renderUserInfo()}
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Profile);
