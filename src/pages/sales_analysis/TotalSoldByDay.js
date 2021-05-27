import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
} from '@progress/kendo-react-charts';
import { getStats } from '../../_requests';
import { PageLoading } from '../../components';
import { openAlert } from '../../_redux/actions';

const TotalSoldByDay = (params) => {
    const [counts, setCounts] = useState();
    const [days, setDays] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        getStats()
            .then((response) => {
                setCounts(response.data.total_sold_product_counts_5_days.revenue);
                setDays(response.data.total_sold_product_counts_5_days.days);
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
                            <ChartTitle text="Daily Sales - Last 5 Days" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={days} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                <ChartSeriesItem
                                    type="column"
                                    tooltip={{
                                        visible: true,
                                    }}
                                    data={counts ? counts.data : null}
                                    name={counts ? counts.name : null}
                                />
                            </ChartSeries>
                        </Chart>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(TotalSoldByDay);
