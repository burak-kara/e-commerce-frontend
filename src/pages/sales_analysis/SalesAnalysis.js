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
const categories = ['20.05.2021', '21.05.2021', '22.05.2021'];
const top3SoldByDay = [
    {
        name: 'Iphone 11 64GB',
        data: [3.907, 7.943, 7.848],
    },
    {
        name: 'Full HD Smart LED TV',
        data: [4.743, 7.295, 7.175],
    },
    {
        name: 'Montag FORTALEZA 250g',
        data: [0.21, 0.375, 1.161],
    },
];
const totalSoldByDay = [
    {
        name: 'Total Sold Count',
        data: [40, 20, 90],
    },
];
const items = [
    'Iphone 11 64GB',
    'Full HD Smart LED TV',
    'Montag FORTALEZA 250g',
    'Yetişkin Kuru Köpek Maması',
    'CanEm Vinç Oyuncak Iş Makinesi',
];
const top5SoldAllTime = [
    {
        name: 'Total Sold Count',
        data: [40, 35, 20, 15, 12],
    },
];
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
const totalRevenueByDay = [
    {
        name: 'Total Revenue',
        data: [1500, 2000, 1600],
    },
];

const SalesAnalysis = () => {
    console.log('sales analysis');

    return (
        <Container fluid className="mt-2 mb-2">
            <Row>
                <Col xl={6}>
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Top 3 Sold Product by Day" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={categories} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                {top3SoldByDay.map((item, idx) => (
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
                <Col xl={6}>
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Total Sold Count by Day" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={categories} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                {totalSoldByDay.map((item, idx) => (
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
                <Col xl={6}>
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Top 5 Sold Product Ratios" />
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
                <Col xl={6}>
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Top 5 Sold Product Count" />
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
                <Col xl={6}>
                    <div className="k-card">
                        <Chart
                            style={{
                                height: 350,
                            }}
                        >
                            <ChartTitle text="Day by Day Revenue" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={categories} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                {totalRevenueByDay.map((item, idx) => (
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

export default SalesAnalysis;
