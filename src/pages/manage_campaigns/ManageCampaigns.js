import React, { useState, useEffect } from 'react';
import { connect, /* useStore */ } from 'react-redux';
import { Form, FormLabel, Container, /* Row, */ Col, ListGroup } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { getAllCampaigns } from '../../_requests';
import { ComponentLoading, PageLoading, CampaignCard } from '../../components';
import { openAlert } from '../../_redux/actions';

const ManageCampaigns = (params) => {
    // const { user } = useStore().getState();
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
        console.log('current camps:', allCurrentCampaigns);
        if (allCurrentCampaigns) {
            allCurrentCampaigns.forEach((campaign, index) => {
                if (campaign !== '') {
                    list.push(
                        <ListGroup.Item
                            header={`Campaign ${index + 1}`}
                            className="campaign-card"
                            key={`campaign-${campaignIndex}`}
                        >
                            <FormLabel>
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
            list.push(
                <ListGroup.Item className="campaign" key="new-campaign">
                    <CampaignCard
                        index="New"
                        campaign={newCampaign}
                        updateCampaignName={updateCampaignName}
                        updateCampaignDetailX={updateCampaignDetailX}
                        updateCampaignDetailY={updateCampaignDetailY}
                        updateCampaignDetailAmount={updateCampaignDetailAmount}
                        campaignPlaceHolder={newCampaign.campaign_name}
                        firstProductPlaceHolder={newCampaign.campaign_x}
                        secondProductPlaceHolder={newCampaign.campaign_y}
                        campaignAmountPlaceHolder={newCampaign.campaign_amount}
                        componentIndex="new"
                        key={`campaign-${campaignIndex}`}
                    />
                </ListGroup.Item>,
            );
        }
        return list;
    };

    const Campaigns = () =>
        allCurrentCampaigns.length < 1 ? (
            <CampaignCard
                index="New"
                placeHolder="New campaign"
                componentIndex="new"
                key="campaign-new"
            />
        ) : (
            <ListAllCampaigns />
        );

    const saveAllCampaigns = () => {
        console.log('all campaigns saved and firebase is updated here.');
    }

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="campaign-management-page">
            <Container className="form-container">
                <Col>
                    <h3 className="page-title">Account Details</h3>
                    <ListGroup variant="flush" className="campaign-list">
                        <Campaigns />
                    </ListGroup>
                    <Form.Row className="buttons">
                        <Button
                            name="Save Campaigns"
                            type="button"
                            className="btn save-campaigns-button"
                            onClick={() => saveAllCampaigns()}
                        >
                            {loading ? <ComponentLoading /> : 'Save'}
                        </Button>
                    </Form.Row>
                </Col>
            </Container>
        </Container>
    );
}

export default connect(null, { openAlert })(ManageCampaigns);