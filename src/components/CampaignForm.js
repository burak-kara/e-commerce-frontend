import React from 'react';
import { Form, FormLabel, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { openAlert } from '../_redux/actions';

const CampaignForm = (props) => {
    const {
        index,
        campaign,
        disabled,
    } = props;

    const getExpirationDate = (date) => {
        let parseDate = date;
        let year = '';
        let month = '';
        let day = '';
        let hour = '';
        let minute = '';
        let second = '';
        if (date !== '') {
            year = parseDate.substring(0, parseDate.indexOf('-'));
            parseDate = parseDate.substring(parseDate.indexOf('-') + 1, parseDate.length);
            month = parseDate.substring(0, parseDate.indexOf('-'));
            parseDate = parseDate.substring(parseDate.indexOf('-') + 1, parseDate.length);
            day = parseDate.substring(0, parseDate.indexOf('T'));
            parseDate = parseDate.substring(parseDate.indexOf('T') + 1, parseDate.length);
            hour = parseDate.substring(0, parseDate.indexOf(':'));
            parseDate = parseDate.substring(parseDate.indexOf(':') + 1, parseDate.length);
            minute = parseDate.substring(0, parseDate.indexOf(':'));
            parseDate = parseDate.substring(parseDate.indexOf(':') + 1, parseDate.length);
            second = parseDate.substring(0, parseDate.indexOf('Z'));
        }
        return new Date(year, month, day, hour, minute, second, 0);
    };

    //  Thu Jun 24 2021 00:00:00 GMT+0300 (GMT+03:00)
    const parseNewDate = (new_valid_until) => {
        let parseDate = new_valid_until.toString();
        let year = '';
        let month = '';
        let day = '';
        let hour = '';
        let minute = '';
        let second = '';
        if (parseDate) {
            parseDate = parseDate.substring(parseDate.indexOf(' ') + 1, parseDate.length);
            month = parseDate.substring(0, parseDate.indexOf(' '));
            if (month === 'Jan') {
                month = 1;
            } else if (month === 'Feb') {
                month = 2;
            } else if (month === 'Mar') {
                month = 3;
            } else if (month === 'Apr') {
                month = 4;
            } else if (month === 'May') {
                month = 5;
            } else if (month === 'Jun') {
                month = 6;
            } else if (month === 'Jul') {
                month = 7;
            } else if (month === 'Aug') {
                month = 8;
            } else if (month === 'Sep') {
                month = 9;
            } else if (month === 'Oct') {
                month = 10;
            } else if (month === 'Nov') {
                month = 11;
            } else if (month === 'Dec') {
                month = 12;
            }
            parseDate = parseDate.substring(parseDate.indexOf(' ') + 1, parseDate.length);
            day = parseDate.substring(0, parseDate.indexOf(' '));
            parseDate = parseDate.substring(parseDate.indexOf(' ') + 1, parseDate.length);
            year = parseDate.substring(0, parseDate.indexOf(' '));
            parseDate = parseDate.substring(parseDate.indexOf(' ') + 1, parseDate.length);
            hour = parseDate.substring(0, parseDate.indexOf(':'));
            parseDate = parseDate.substring(parseDate.indexOf(':') + 1, parseDate.length);
            minute = parseDate.substring(0, parseDate.indexOf(':'));
            parseDate = parseDate.substring(parseDate.indexOf(':') + 1, parseDate.length);
            second = parseDate.substring(0, parseDate.indexOf(' '));
        }
        return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
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
                <FormLabel>
                    Expiration Date
                </FormLabel>
                <DateTimePicker
                    format="yyyy-MM-dd hh:mm:ss"
                    defaultValue={getExpirationDate(campaign.valid_until)}
                    onChange={(e) => setCampaignExpirationDate(e.target.value)}
                    className='form-control'
                    disabled={disabled}
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
                        disabled={disabled}
                        placeholder={campaign.campaign_x}
                        defaultValue={campaign.campaign_x}
                        onChange={(e) => setCampaignXCount(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} xl={6} xs={12}>
                    <FormLabel>
                        Second Product Count
                        </FormLabel>
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
                    <FormLabel>
                        Discount Amount (%)
                        </FormLabel>
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
