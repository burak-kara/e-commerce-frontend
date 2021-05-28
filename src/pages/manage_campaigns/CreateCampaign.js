import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Container, Col } from 'react-bootstrap';
import { createNewCampaign } from '../../_requests';
import { PageLoading, CampaignForm } from '../../components';
import { openAlert } from '../../_redux/actions';
import { SM_CAMPAIGNS, TIME_OUT } from '../../_constants';
import { withFirebase } from '../../_firebase';

const CreateCampaign = (params) => {
    const history = useHistory();
    const { firebase } = params;
    const [loading, setLoading] = useState(false);
    const [campaign, setCampaign] = useState({
        valid_until: '',
        campaign_x: 0,
        campaign_y: 0,
        campaign_amount: 0,
    });

    const sendPushNotification = (campaign_details) => {
        const database = firebase.campaign_db('new_campaign');
        // Doesn't correctly get the prev data from firebase, may need a fix.
        // This is just for keeping data consistent on firebase realtime db.
        database.set({
            id: campaign_details.id,
            valid_until: campaign_details.valid_until,
            campaign_x: campaign_details.campaign_x,
            campaign_y: campaign_details.campaign_y,
            campaign_amount: campaign_details.campaign_amount,
            notified_users: '',
        });
    };

    const createCampaign = () => {
        setLoading(true);
        createNewCampaign(campaign)
            .then((response) => {
                setCampaign(response.data);
                sendPushNotification(response.data);
                params.openAlert({
                    message: 'Successfully created campaign!',
                    severity: 'success',
                });
                setTimeout(() => {
                    history.push({
                        pathname: SM_CAMPAIGNS,
                    });
                }, TIME_OUT);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while creating campaign!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="create-campaign-page">
            <Form className="form-container" noValidate key="campaignCreationPageForm">
                <h3 className="page-title">Campaign Creation</h3>
                <Form.Row>
                    <Form.Group as={Col} xl={6} xs={12} className="campaign-details-group">
                        <CampaignForm
                            index="New"
                            campaign={campaign}
                            componentIndex="new"
                            key="campaign-new"
                        />
                    </Form.Group>
                    <Form.Group as={Col} xl={12} xs={12} className="create-campaign-button-group">
                        <button
                            type="button"
                            className="create-campaign-button"
                            onClick={createCampaign}
                        >
                            Create Campaign
                        </button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    );
};

export default connect(null, { openAlert })(withFirebase(CreateCampaign));
