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
const days = ['20.05.2021', '21.05.2021', '22.05.2021'];
const revenues = [
    {
        name: 'Total Revenue',
        data: [1500, 2000, 1600],
    },
];

const DayByDayRevenue = () => {
    console.log('DayByDayRevenue');

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
                            <ChartTitle text="Day by Day Revenue" />
                            <ChartLegend position="top" orientation="horizontal" />
                            <ChartCategoryAxis>
                                <ChartCategoryAxisItem categories={days} startAngle={45} />
                            </ChartCategoryAxis>
                            <ChartSeries>
                                {revenues.map((item, idx) => (
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

export default DayByDayRevenue;
