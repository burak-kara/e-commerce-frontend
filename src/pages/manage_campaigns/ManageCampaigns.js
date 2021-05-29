import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormLabel, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { getAllCampaigns, deleteCampaignByID } from '../../_requests';
import { ComponentLoading, PageLoading, CampaignForm } from '../../components';
import { openAlert } from '../../_redux/actions';
import { SM_CREATE_CAMPAIGN, SM_CAMPAIGNS, TIME_OUT } from '../../_constants';

const ManageCampaigns = (params) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [allCurrentCampaigns, setAllCurrentCampaigns] = useState([]);

    const fetchCampaigns = () => {
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
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchCampaigns();
        setLoading(false);
    }, []);

    const deleteCampaign = (param) => {
        setLoading(true);
        deleteCampaignByID(param)
            .then(() => {
                fetchCampaigns();
                params.openAlert({
                    message: `Successfully deleted campaign with id ${param}!`,
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
                    message: 'Something went wrong while deleting campaign!',
                    severity: 'error',
                });
                setLoading(false);
            });
        fetchCampaigns();
        setLoading(false);
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
                            key={campaign.id}
                        >
                            <FormLabel as={Col} lg={2} xs={6}>
                                Campaign {campaignIndex + 1}
                            </FormLabel>
                            <CampaignForm
                                index={index}
                                campaign={campaign}
                                disabled
                                componentIndex={campaignIndex}
                                key={`campaign-${campaignIndex}`}
                            />
                            <Col lg={12} xs={12} className="delete-campaign-button-group">
                                <Button
                                    name="SaveCampaigns"
                                    type="button"
                                    className="btn delete-campaign-button"
                                    onClick={() => deleteCampaign(campaign.id)}
                                >
                                    {loading ? <ComponentLoading /> : 'Delete'}
                                </Button>
                            </Col>
                        </ListGroup.Item>,
                    );
                    campaignIndex += 1;
                }
            });
        }
        return list;
    };

    const Campaigns = () => <ListAllCampaigns />;

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
                <Row>
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
                        </Form.Row>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default connect(null, { openAlert })(ManageCampaigns);
