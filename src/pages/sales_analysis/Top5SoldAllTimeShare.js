import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartLegend,
} from '@progress/kendo-react-charts';

// TODO delete
const top5SoldAllTimePie = [
    {
        name: 'Iphone 11 64GB',
        share: 0.2,
    },
    {
        name: 'Full HD Smart LED TV',
        share: 0.25,
    },
    {
        name: 'Montag FORTALEZA 250g',
        share: 0.15,
    },
    {
        name: 'Yetişkin Kuru Köpek Maması',
        share: 0.3,
    },
    {
        name: 'CanEm Vinç Oyuncak Iş Makinesi',
        share: 0.1,
    },
];

const Top5SoldAllTimeShare = () => {
    console.log('Top5SoldAllTimeShare');

    return (
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
                                    data={top5SoldAllTimePie}
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

export default Top5SoldAllTimeShare;