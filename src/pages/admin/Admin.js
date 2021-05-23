import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import AllUsersList from './AllUsersList';
import { openAlert } from '../../_redux/actions';

const Admin = () => {
    const renderAllUsers = () => <AllUsersList key="allUsersList" />;

    return (
        <Container key="adminConsole">
            <Row>
                <Col>{renderAllUsers()}</Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Admin);
