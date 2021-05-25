import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
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

const DayByDayRevenue = (params) => {
    const [revenues, setRevenues] = useState();
    const [days, setDays] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        getStats()
            .then((response) => {
                const data = response.data.last_5_total_revenue;
                setRevenues(data.revenue);
                setDays(
                    data.days.map((day) =>
                        moment(new Date(day), 'YYYY-MM-DD HH:mm:ss').format('dddd'),
                    ),
                );
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
                    <div className="k-card bg-dark">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Daily Revenue - Last 5 Days" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem
                                    categories={days}
                                    startAngle={45}
                                    baseUnit="days"
                                />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                <ChartSeriesItem
                                    type="column"
                                    tooltip={{
                                        visible: true,
                                    }}
                                    data={revenues ? revenues.data : null}
                                    name={revenues ? revenues.name : null}
                                />
                            </ChartSeries>
                        </Chart>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(DayByDayRevenue);
