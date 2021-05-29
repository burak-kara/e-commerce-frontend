import React, { useEffect, useState } from 'react';
import { Form, Container, Col, FormLabel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageLoading } from '../../components';
import { openAlert } from '../../_redux/actions';
import { getCurrentFunds, addFundsToUser } from '../../_requests';
import { PROFILE, TIME_OUT } from '../../_constants';

const Funding = (params) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [userFunds, setUserFunds] = useState();
    const [requestedFunds, setRequestedFunds] = useState({
        amt: 0,
    });

    const fetchFunds = () => {
        getCurrentFunds()
            .then((response) => {
                setUserFunds(response.data.balance);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting user funds!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchFunds();
    }, []);

    const fundUser = () => {
        setLoading(true);
        addFundsToUser(requestedFunds)
            .then(() => {
                params.openAlert({
                    message: `Successfully added funds worth to user's wallet!`,
                    severity: 'success',
                });
                fetchFunds();
                setTimeout(() => {
                    history.push({
                        pathname: PROFILE,
                    });
                }, TIME_OUT);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while adding funds to user!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    const setCurrentlyRequestedFunds = (requested_amount) => {
        const fundsToBeRequested = requestedFunds;
        fundsToBeRequested.amt = requested_amount;
        setRequestedFunds(fundsToBeRequested);
    };

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="funding-page">
            <Form className="form-container">
                <h3 className="page-title">Funding</h3>
                <Form.Row>
                    <Form.Group as={Col} xl={12} xs={12} className="fund-fields">
                        <FormLabel>Current Funds</FormLabel>
                        <Form.Control type="text" defaultValue={userFunds} disabled />
                    </Form.Group>
                    <Form.Group as={Col} xl={12} xs={12} className="fund-fields">
                        <FormLabel>Funds Requested</FormLabel>
                        <Form.Control
                            type="text"
                            defaultValue={0}
                            onChange={(e) => setCurrentlyRequestedFunds(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xl={12} xs={12} className="button-group">
                        <button type="button" onClick={fundUser} className="btn fund-user-button">
                            Send Funds To Account
                        </button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    );
};

export default connect(null, { openAlert })(Funding);
