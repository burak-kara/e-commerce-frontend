import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
    SM_ANALYSIS_DAY_BY_DAY,
    SM_ANALYSIS_SOLD,
    SM_ANALYSIS_SOLD_SHARE,
    SM_ANALYSIS_TOTAL_SOLD,
} from '../../_constants';

const charts = {
    'Day by Day Revenue': SM_ANALYSIS_DAY_BY_DAY,
    'Top 5 Sold': SM_ANALYSIS_SOLD,
    'Top 5 Sold Share': SM_ANALYSIS_SOLD_SHARE,
    'Total Sold': SM_ANALYSIS_TOTAL_SOLD,
};

const SalesAnalysis = () => {
    const history = useHistory();

    const List = () =>
        Object.entries(charts).map(([key, value]) => (
            <Row className="analysis-row">
                <Col xs={12} xl={4} className="analysis-col">
                    <Row>
                        <Col className="desc-col">
                            <div>
                                <span>{key}</span>
                            </div>
                        </Col>
                        <Col className="btn-col">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {
                                    history.push({
                                        pathname: value,
                                    });
                                }}
                            >
                                See Chart
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        ));

    return (
        <Container fluid className="sales-analysis mt-2 mb-2">
            <List />
        </Container>
    );
};

export default SalesAnalysis;
