import React, { useState } from 'react';
import { connect, /* useStore, */ } from 'react-redux';
import { Form, /* FormLabel, */ Container, /* Row, Col, */ } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { /* ComponentLoading, */ PageLoading, CampaignCard } from '../../components';
import { openAlert } from '../../_redux/actions';

const CreateCampaign = () => {
    const [loading, setLoading] = useState(false);

    const createCampaign = (data) => {
        setLoading(true);
        console.log(data);
        setLoading(false);
    };

    return loading ? (
        <PageLoading />
    ) : (
        <div className="create-campaign-page">
            <Container fluid className="campaign-management-page">
                <Form>
                    <CampaignCard
                        index="New"
                        placeHolder="New campaign"
                        componentIndex="new"
                        key="campaign-new"
                    />
                    <Form.Group className="create-campaign-button-group">
                        <Button onClick={createCampaign} type="submit">
                            Create Campaign
                        </Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
};

export default connect(null, { openAlert })(CreateCampaign);