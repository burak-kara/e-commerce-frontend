import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product';

//  products will need to be retrieved from the DB.
const products = [
    {
        id: 1,
        name: 'Shoes',
        description: 'Running shoes.',
        price: '$5',
        image: 'https://bit.ly/3cjqBEG',
    },
    {
        id: 1,
        name: 'Gaming Notebook',
        description: 'Gaming notebook.',
        price: '$10',
        image: 'https://bit.ly/3crSHOh',
    },
];

const Products = () => (
    <main>
        <Grid container justify="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} lg={3}>
                    <Product product={product} />
                </Grid>
            ))}
        </Grid>
    </main>
);

export default Products;
