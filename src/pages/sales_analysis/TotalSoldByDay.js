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
const totalSoldByDay = [
    {
        name: 'Total Sales',
        data: [40, 20, 90],
    },
];

const TotalSoldByDay = () => {
    console.log('TotalSoldByDay');

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
                            <ChartTitle text="Daily Sales - Last 5 Days" />
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
            </Row>
        </Container>
    );
};

export default TotalSoldByDay;
