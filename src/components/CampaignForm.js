import React from 'react';
import { Form, FormLabel, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import * as moment from 'moment';
import { openAlert } from '../_redux/actions';

const CampaignForm = (props) => {
    const { index, campaign, disabled } = props;

    const parseNewDate = (new_valid_until) => {
        const momentDate = moment(new_valid_until);
        const selectedDate = momentDate.format('yyyy-MM-DDTHH:mm:ss');
        return selectedDate;
    };

    const setCampaignExpirationDate = (new_valid_until) => {
        campaign.valid_until = parseNewDate(new_valid_until);
    };

    const setCampaignXCount = (x_count) => {
        campaign.campaign_x = x_count;
    };

    const setCampaignYCount = (y_count) => {
        campaign.campaign_y = y_count;
    };

    const setCampaignSaleAmount = (sale_amount) => {
        campaign.campaign_amount = sale_amount;
    };

    return (
        <>
            <Form.Group as={Col} xl={12}>
                <FormLabel>Expiration Date</FormLabel>
                <DateTimePicker
                    parseFormats="yyyy-MM-ddTHH:MM:SSZ"
                    timeFormat="HH:mm:ss"
                    defaultValue={new Date()}
                    onChange={(e) => setCampaignExpirationDate(e.target.value)}
                    className="form-control"
                    disabled={disabled}
                />
            </Form.Group>
            <div className="campaign-details">
                <Form.Group as={Col} xl={6} xs={12}>
                    <FormLabel>First Product Count</FormLabel>
                    <Form.Control
                        name={`campaignFirstProduct${index}`}
                        type="text"
                        disabled={disabled}
                        placeholder={campaign.campaign_x}
                        defaultValue={campaign.campaign_x}
                        onChange={(e) => setCampaignXCount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} xl={6} xs={12}>
                    <FormLabel>Second Product Count</FormLabel>
                    <Form.Control
                        name={`campaignSecondProduct${index}`}
                        type="text"
                        disabled={disabled}
                        placeholder={campaign.campaign_y}
                        defaultValue={campaign.campaign_y}
                        onChange={(e) => setCampaignYCount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} xl={12} xs={12}>
                    <FormLabel>Discount Amount (%)</FormLabel>
                    <Form.Control
                        name={`campaignAmount${index}`}
                        type="text"
                        disabled={disabled}
                        placeholder={campaign.campaign_amount}
                        defaultValue={campaign.campaign_amount}
                        onChange={(e) => setCampaignSaleAmount(e.target.value)}
                    />
                </Form.Group>
            </div>
        </>
    );
};

export default connect(null, { openAlert })(CampaignForm);
