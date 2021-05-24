import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartTitle,
    ChartLegend,
} from '@progress/kendo-react-charts';

// TODO delete
const items = [
    'Iphone 11 64GB',
    'Full HD Smart LED TV',
    'Montag FORTALEZA 250g',
    'Yetişkin Kuru Köpek Maması',
    'CanEm Vinç Oyuncak Iş Makinesi',
];
const top5SoldAllTime = [
    {
        name: 'Total Sales',
        data: [40, 35, 20, 15, 12],
    },
];

const Top5SoldAllTime = () => {
    console.log('Top5SoldAllTime');

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
                            <ChartTitle text="Top 5 Products - All Time" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={items} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                {top5SoldAllTime.map((item, idx) => (
                                    <ChartSeriesItem
                                        key={idx} // eslint-disable-line react/no-array-index-key
                                        type="column"
                                        tooltip={{
                                            visible: true,
                                        }}
                                        data={item.data}
                                        name={item.name}
                                    />
                                ))}
                            </ChartSeries>
                        </Chart>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Top5SoldAllTime;