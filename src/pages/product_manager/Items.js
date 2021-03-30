import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductCard } from '../../components';
import { PM } from '../../_constants';

const products = [
    {
        id: 0,
        name: 'iPhone 11 64 GB',
        rating: 4.5,
        details:
            '2 Yıl Apple Türkiye Garantilidir. Kutu içeriğinde iPhone ve USB-C - ' +
            'Lightning Kablosu bulunmaktadır. Adaptör ve Kulaklık bulunmaz.',
        price: '7499.90',
        image: 'https://cutt.ly/Mx6A2pw',
        brand: 'Apple',
        campaign: '24 saatte kargoda',
    },
    {
        id: 1,
        name: 'Gaming Notebook',
        rating: 4.5,
        details: 'Gaming notebook.',
        price: '9,894.95',
        image: 'https://bit.ly/3crSHOh',
        brand: 'Acer',
        campaign: '24 saatte kargoda',
    },
    {
        id: 2,
        name: 'Perwoll Siyahlar için Hassas Sıvı Çamaşır Deterjanı 3L',
        rating: 2,
        details: 'Perwoll Siyahlar için Hassas Sıvı Çamaşır Deterjanı 3L',
        price: '44.99',
        image: 'https://cutt.ly/sx6Ah6A',
        brand: 'Perwoll',
        campaign: "Süpermarket Alışverişine Solo Tuvalet Kağıdı 32'li %20 indirimli",
    },

    {
        id: 3,
        name: 'Prochoice Proderma Yetişkin Kuzu Etli Köpek Maması 18 kg',
        rating: 4,
        details: 'Prochoice Proderma Yetişkin Kuzu Etli Köpek Maması 18 kg',
        price: '227,90',
        image: 'https://cutt.ly/lx6Sh84',
        brand: 'Pro Choice',
        campaign: '75,97 TL x 3 ay’a varan Taksit seçenekleri',
    },

    {
        id: 4,
        name: 'Head&Shoulders Şampuan Klasik Bakım 400 ml x 2',
        rating: 4.5,
        details: 'Head&Shoulders Şampuan Klasik Bakım 400 ml x 2\n',
        price: '49,99',
        image: 'https://cutt.ly/Nx6SDMJ',
        brand: 'Head&Shoulders',
        campaign: '24 saatte kargoda',
    },
];

const Items = () => {
    const role = PM;

    const handleDelete = () => {
        console.log('handleDelete');
    };

    const handleFav = () => {
        console.log('handleFav');
    };
    const handleEdit = () => {
        console.log('handleEdit');
    };

    const handleBasket = () => {
        console.log('handleBasket');
    };

    const handleUpper = role === PM ? handleDelete : handleFav;
    const handleBottom = role === PM ? handleEdit : handleBasket;

    return (
        <Container fluid="lg" className="pm-item-list">
            <Row className="row">
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[0]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[1]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[2]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[3]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[4]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[0]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[0]}
                    />
                </Col>
                <Col sm={12} md={6} lg={4} className="col">
                    <ProductCard
                        role={role}
                        handleUpper={handleUpper}
                        handleBottom={handleBottom}
                        {...products[0]}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Items;
