import React from 'react';
import StarMaker from './StarMaker';
import { placeholder } from '../_assets';

const ProductCard = () => {
    const getImageContainer = () => (
        <div className="image-container" role="button">
            <img src={placeholder} alt="product" className="image" />
        </div>
    );

    return (
        <div className="product-card">
            {getImageContainer()}
            <div className="details">
                <div className="star-container">
                    <StarMaker rating={0} />
                </div>
                <div className="name-container">Recommend New Product</div>
                <div className="brand-container">Recommend Bew Brand</div>
            </div>
        </div>
    );
};

export default ProductCard;
