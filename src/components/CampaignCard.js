import React from 'react';
import { Form, FormLabel, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { openAlert } from '../_redux/actions';

const CampaignCard = (props) => {
    const {
        index,
        campaign,
        updateCampaignDetailX,
        updateCampaignDetailY,
        updateCampaignDetailAmount,
        campaignPlaceHolder,
        firstProductPlaceHolder,
        secondProductPlaceHolder,
        campaignAmountPlaceHolder,
    } = props;

    return (
        campaign ? (
            <>
                <Form.Group as={Col} xl={12}>
                    <FormLabel>
                        Expiration Date
                    </FormLabel>
                    <Form.Control
                        header="Campaign Name"
                        name={`campaignExpirationDate${index}`}
                        type="text"
                        disabled
                        placeholder={campaignPlaceHolder}
                        defaultValue={campaign.valid_until}
                    />
                </Form.Group>
                <div className="campaign-details">
                    <Form.Group as={Col} xl={6} xs={12}>
                        <FormLabel>
                            First Product Count
                        </FormLabel>
                        <Form.Control
                            name={`campaignFirstProduct${index}`}
                            type="text"
                            placeholder={firstProductPlaceHolder}
                            defaultValue={campaign.campaign_x}
                            onBlur={(e) => updateCampaignDetailX(e.target.value, e.target.name)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xl={6} xs={12}>
                        <FormLabel>
                            Second Product Count
                        </FormLabel>
                        <Form.Control
                            name={`campaignSecondProduct${index}`}
                            type="text"
                            placeholder={secondProductPlaceHolder}
                            defaultValue={campaign.campaign_x}
                            onBlur={(e) => updateCampaignDetailY(e.target.value, e.target.name)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xl={12} xs={12}>
                        <FormLabel>
                            Discount Amount (%)
                        </FormLabel>
                        <Form.Control
                            name={`campaignAmount${index}`}
                            type="text"
                            placeholder={campaignAmountPlaceHolder}
                            defaultValue={campaign.campaign_amount}
                            onBlur={
                                (e) => updateCampaignDetailAmount(e.target.value, e.target.name)
                            }
                        />
                    </Form.Group>
                </div>
            </>
        ) : <></>
    );
};

export default connect(null, { openAlert })(CampaignCard);
