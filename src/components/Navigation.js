import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { openAlert } from '../_redux/actions';
import {
    CAT_ELECTRONICS,
    CAT_CONSUMABLES,
    CAT_FASHION,
    CAT_LIFE,
    CAT_HOBBY,
    CAT_TOYS,
    CAT_COSMETICS,
    CAT_OTHERS,
} from '../_constants';

const cats = [
    CAT_ELECTRONICS,
    CAT_CONSUMABLES,
    CAT_FASHION,
    CAT_LIFE,
    CAT_HOBBY,
    CAT_TOYS,
    CAT_COSMETICS,
    CAT_OTHERS,
];

const Navigation = () => {
    const history = useHistory();

    const handleCategory = (pathname) => {
        history.push({
            pathname: `${pathname}`,
        });
    };

    const getName = (name) => name.toLowerCase().replaceAll('/', '').replaceAll('-', ' ');

    const Navs = () => {
        const navs = [];
        cats.forEach((cat, index) => {
            navs.push(
                <Nav
                    className="category"
                    key={cat}
                    style={{ borderLeft: `${index === 0 ? '0.5px solid' : '0px'}` }}
                    onClick={() => handleCategory(cat)}
                >
                    <Nav.Link eventKey={index}>
                        <span className="cat font-weight-bolder" role="button">
                            {getName(cat)}
                        </span>
                    </Nav.Link>
                </Nav>,
            );
        });
        return navs;
    };

    return (
        <div className="navigation-container">
            <Container fluid="xl" className="container">
                <Navbar collapseOnSelect expand="lg" className="navigation">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="ml-auto">
                        <Navs />
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    );
};

export default connect(null, { openAlert })(Navigation);
