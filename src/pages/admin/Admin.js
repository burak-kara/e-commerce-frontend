import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { PageLoading } from '../../components';
import { getAllUsers, updateUserByID } from '../../_requests';
import { openAlert } from '../../_redux/actions';
import UserCard from './UserCard';

const Admin = (params) => {
    const [loading, setLoading] = useState(false);
    // TODO get from BE
    const [users, setUsers] = useState([
        {
            pk: 1,
            username: 'johndoe',
            email: 'john.doe@gmail.com',
            phone_number: '539-456-12-45',
            first_name: 'John',
            last_name: 'Doe',
            addresses: ['Mint Street No.1', 'Address2'],
            is_sales_manager: false,
            is_product_manager: false,
            is_admin: false,
        },
        {
            pk: 2,
            username: 'AliVeli',
            email: 'ali.veli@gmail.com',
            phone_number: '539-789-56-23',
            first_name: 'Ali',
            last_name: 'Veli',
            addresses: ['Mint Street No.2', 'Address5'],
            is_sales_manager: true,
            is_product_manager: false,
            is_admin: false,
        },
        {
            pk: 3,
            username: 'test',
            email: 'ali.veli@gmail.com',
            phone_number: '539-789-56-23',
            first_name: 'test',
            last_name: 'test',
            addresses: ['Mint Street No.2', 'Address5'],
            is_sales_manager: false,
            is_product_manager: true,
            is_admin: false,
        },
    ]);

    useEffect(() => {
        setLoading(true);
        getAllUsers()
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error while getting users!',
                    severity: 'error',
                });
                setLoading(false);
            });
    }, []);

    const changeRole = (pk, id) => {
        let is_sales_manager = false;
        let is_product_manager = false;
        if (id === 'sm') {
            is_sales_manager = true;
            is_product_manager = false;
        } else if (id === 'pm') {
            is_sales_manager = false;
            is_product_manager = true;
        }
        const data = { is_sales_manager, is_product_manager };
        updateUserByID(data, pk)
            .then(() => {
                params.openAlert({
                    message: 'User is updated!',
                    severity: 'success',
                });
            })
            .catch(() => {
                params.openAlert({
                    message: 'Error while updating user!',
                    severity: 'error',
                });
            });
    };

    const Users = () => {
        if (loading) {
            return <PageLoading />;
        }
        const list = [];
        if (users) {
            users.forEach((user) => {
                list.push(
                    <ListGroup.Item className="list-item" key={user.pk}>
                        <UserCard
                            user={user}
                            sm={user.is_sales_manager}
                            pm={user.is_product_manager}
                            onChange={changeRole}
                        />
                    </ListGroup.Item>,
                );
            });
        }
        return list;
    };

    const Header = () => (
        <Row className="headers">
            <Col xs={3} xl={6}>
                <Row xl={12}>
                    <Col xs={12} xl={3}>
                        <div>
                            <span>#</span>
                        </div>
                    </Col>
                    <Col xs={12} xl={3}>
                        <div>
                            <span>Username</span>
                        </div>
                    </Col>
                    <Col xs={12} xl={3}>
                        <div>
                            <span>Name</span>
                        </div>
                    </Col>
                    <Col xs={12} xl={3}>
                        <div>
                            <span>Surname</span>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs={3} xl={2} className="radio-cols">
                <div>
                    <span>Customer</span>
                </div>
            </Col>
            <Col xs={3} xl={2} className="radio-cols">
                <div>
                    <span>Sales M.</span>
                </div>
            </Col>
            <Col xs={3} xl={2} className="radio-cols">
                <div>
                    <span>Product M.</span>
                </div>
            </Col>
        </Row>
    );

    return (
        <div className="admin-console-page">
            <Container className="form-container">
                <Header />
                <Row>
                    <Col>
                        <ListGroup variant="flush">
                            <Users />
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default connect(null, { openAlert })(Admin);
