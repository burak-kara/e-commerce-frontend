import React from 'react';
import { Basket, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';

const ProductCard = (props) => {
    const { image, rating, name, brand, details, handleFav, price, campaign, handleBasket } = props;

    return (
        <div className="product-card">
            <div className="image-container">
                <img src={image} alt="product" className="image" />
            </div>
            <div className="details">
                <div className="star-container">
                    <StarMaker rating={rating} />
                </div>
                <div className="fav-container">
                    <button className="btn" type="button" onClick={handleFav}>
                        <Favorite size="2em" />
                    </button>
                </div>
                <div className="name-container">{name}</div>
                <div className="brand-container">{brand}</div>
                <div className="desc-container">{details}</div>
                <div className="price-container">{price} ₺</div>
                <div className="basket-container">
                    <button className="btn" type="button" onClick={handleBasket}>
                        <Basket size="2em" />
                    </button>
                </div>
                <div className="campaign-container">{campaign}</div>
            </div>
        </div>
    );
};

export default ProductCard;
