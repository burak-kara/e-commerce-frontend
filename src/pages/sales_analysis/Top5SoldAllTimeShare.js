import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartLegend,
} from '@progress/kendo-react-charts';
import { getStats } from '../../_requests';
import { openAlert } from '../../_redux/actions';
import { PageLoading } from '../../components';

const Top5SoldAllTimeShare = (params) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        getStats()
            .then((response) => {
                setData(response.data.top_5_sold_products_all_time_shares);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Something went wrong while fetching stats!',
                    severity: 'error',
                });
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return loading ? (
        <PageLoading />
    ) : (
        <Container fluid className="sales-analysis mt-2 mb-2">
            <Row className="analysis-row">
                <Col xs={12} xl={8} className="chart-col">
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Top 5 Products - All Time - Shares" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartSeries>
                                <ChartSeriesItem
                                    type="pie"
                                    overlay={{
                                        gradient: 'sharpBevel',
                                    }}
                                    tooltip={{
                                        visible: true,
                                    }}
                                    data={data}
                                    categoryField="name"
                                    field="share"
                                />
                            </ChartSeries>
                        </Chart>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Top5SoldAllTimeShare);
