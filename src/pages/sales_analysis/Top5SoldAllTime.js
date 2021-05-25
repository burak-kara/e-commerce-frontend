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

const Top5SoldAllTime = (params) => {
    const [counts, setCounts] = useState();
    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        getStats()
            .then((response) => {
                setCounts(response.data.top_5_sold_products_all_time.counts);
                setProducts(response.data.top_5_sold_products_all_time.products);
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
                            <ChartTitle text="Top 5 Products - All Time" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={products} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                <ChartSeriesItem
                                type="column"
                                        tooltip={{
                                            visible: true,
                                        }}
                                        data={counts ? counts.data : null}
                                        name={counts ? counts.name : null }
                                    />
                            </ChartSeries>
                        </Chart>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default connect(null, { openAlert })(Top5SoldAllTime);
