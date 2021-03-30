import React from 'react';
import { ProductCard } from '../../components';

const products = [
    {
        id: 1,
        name: 'iPhone 11 64 GB',
        rating: 4.5,
        details:
            '2 Yıl Apple Türkiye Garantilidir. Kutu içeriğinde iPhone ve USB-C - ' +
            'Lightning Kablosu bulunmaktadır. Adaptör ve Kulaklık bulunmaz.',
        price: '500',
        image: 'https://bit.ly/3cjqBEG',
        brand: 'Apple',
        campaign: '24 saatte kargoda',
    },
    {
        id: 1,
        name: 'Gaming Notebook',
        description: 'Gaming notebook.',
        price: '$10',
        image: 'https://bit.ly/3crSHOh',
    },
];

const Items = () => (
    <div>
        <ProductCard {...products[0]} />
    </div>
);

export default Items;
