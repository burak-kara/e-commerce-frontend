import React, { useState, useEffect } from 'react';
import { connect, /* useStore, */ } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormLabel, Container, /* Row, */ Col, ListGroup } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { getAllCampaigns } from '../../_requests';
import { ComponentLoading, PageLoading, CampaignCard } from '../../components';
import { openAlert } from '../../_redux/actions';
import {
    SM_CREATE_CAMPAIGN
} from '../../_constants';

const ManageCampaigns = (params) => {
    // const { user } = useStore().getState();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [allCurrentCampaigns, setAllCurrentCampaigns] = useState([]);
    const [newCampaign, setNewCampaign] = useState(
        {
            campaign_name: "New Campaign",
            campaign_x: 0,
            campaign_y: 0,
            campaign_amount: 0,
        }
    );

    useEffect(() => {
        setLoading(true);
        getAllCampaigns()
            .then((response) => {
                setAllCurrentCampaigns(response.data);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while getting all campaign information!',
                    severity: 'error',
                });
                setLoading(false);
            })
    }, []);

    const updateCampaignName = (/* updatedCampaign, */ newCampaignName) => {
        newCampaign.campaign_amount = newCampaignName;
        setNewCampaign(newCampaign);
    };

    const updateCampaignDetailX = (/* updatedCampaign, */ newCampaignX) => {
        newCampaign.campaign_x = newCampaignX;
        setNewCampaign(newCampaign);
    };

    const updateCampaignDetailY = (/* updatedCampaign, */ newCampaignY) => {
        newCampaign.campaign_y = newCampaignY;
        setNewCampaign(newCampaign);
    };

    const updateCampaignDetailAmount = (/* updatedCampaign, */ newCampaignAmount) => {
        newCampaign.campaign_amount = newCampaignAmount;
        setNewCampaign(newCampaign);
    };

    const ListAllCampaigns = () => {
        const list = [];
        let campaignIndex = 0;
        if (allCurrentCampaigns) {
            allCurrentCampaigns.forEach((campaign, index) => {
                if (campaign !== '') {
                    list.push(
                        <ListGroup.Item
                            header={`Campaign ${index + 1}`}
                            className="campaign-card"
                            key={`campaign-${campaignIndex}`}
                        >
                            <FormLabel as={Col} lg={2} xs={6}>
                                Campaign {campaignIndex + 1}
                            </FormLabel>
                            <CampaignCard
                                index={index}
                                campaign={campaign}
                                updateCampaignName={updateCampaignName}
                                updateCampaignDetailX={updateCampaignDetailX}
                                updateCampaignDetailY={updateCampaignDetailY}
                                updateCampaignDetailAmount={updateCampaignDetailAmount}
                                campaignPlaceHolder={campaign.campaign_name}
                                firstProductPlaceHolder={campaign.campaign_x}
                                secondProductPlaceHolder={campaign.campaign_y}
                                campaignAmountPlaceHolder={campaign.campaign_amount}
                                componentIndex={campaignIndex}
                                key={`campaign-${campaignIndex}`}
                            />
                        </ListGroup.Item>
                    );
                    campaignIndex += 1;
                }
            });
        }
        return list;
    };

    const Campaigns = () => <ListAllCampaigns />;

    const saveAllCampaigns = () => {
        console.log('all campaigns saved and firebase is updated here.');
    };

    const rerouteToCreateCampaignPage = () => {
        history.push({
            pathname: SM_CREATE_CAMPAIGN,
        });
    };

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="campaign-management-page">
            <Container className="form-container">
                <Col>
                    <h3 className="page-title">Campaign Management</h3>
                    <ListGroup variant="flush" className="campaign-list">
                        <Campaigns />
                    </ListGroup>
                    <Form.Row className="buttons">
                        <Form.Group as={Col} lg={6} xs={5} className="button-container">
                            <Button
                                name="CreateNewCampaigns"
                                type="button"
                                className="btn create-campaign-button"
                                onClick={() => rerouteToCreateCampaignPage()}
                            >
                                {loading ? <ComponentLoading /> : 'New Campaign'}
                            </Button>
                        </Form.Group>
                        <Form.Group as={Col} lg={6} xs={4} className="button-container">
                            <Button
                                name="SaveCampaigns"
                                type="button"
                                className="btn save-campaigns-button"
                                onClick={() => saveAllCampaigns()}
                            >
                                {loading ? <ComponentLoading /> : 'Save'}
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Col>
            </Container>
        </Container>
    );
}

export default connect(null, { openAlert })(ManageCampaigns);