import React from 'react';
import { Basket, Delete, Edit, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';
import { PM } from '../_constants';

const ProductCard = (props) => {
    const {
        image,
        rating,
        name,
        brand,
        details,
        price,
        campaign,
        handleUpper,
        handleBottom,
        handleCard,
        role,
    } = props;

    return (
        <div className="product-card">
            <div
                className="image-container"
                role="button"
                tabIndex="0"
                onClick={handleCard}
                onKeyDown={handleCard}
            >
                <img src={image} alt="product" className="image" />
            </div>
            <div className="details">
                <div className="star-container">
                    <StarMaker rating={rating || 0} />
                </div>
                <div className="upper-container">
                    <button
                        className={`btn ${role === PM ? 'pm-delete' : 'fav'}`}
                        type="button"
                        onClick={handleUpper}
                    >
                        {role === PM ? <Delete size="2em" /> : <Favorite size="2em" />}
                    </button>
                </div>
                <div className="name-container">{name || 'Not Found'}</div>
                <div className="brand-container">{brand || 'Not Found'}</div>
                <div className="desc-container">{details || 'Not Found'}</div>
                <div className="price-container">
                    <span>{price || 'Not Found'} ₺</span>
                </div>
                <div className="bottom-container">
                    <button
                        className={`btn ${role === PM ? 'pm-edit' : 'basket'}`}
                        type="button"
                        onClick={handleBottom}
                    >
                        {role === PM ? <Edit size="2em" /> : <Basket size="2em" />}
                    </button>
                </div>
                <div className="campaign-container">{campaign}</div>
            </div>
        </div>
    );
};

export default ProductCard;
