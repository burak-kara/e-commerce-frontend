import React from 'react';
import { Basket, Delete, Edit, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';
import { PM } from '../_constants';
import { logo } from '../_assets';

const ProductCard = (props) => {
    const {
        image,
        rating,
        name,
        brand,
        description,
        price,
        campaign,
        handleUpper,
        handleBottom,
        handleCard,
        role,
        isPreview,
    } = props;

    const getUpperIcon = () => {
        if (isPreview) {
            return null;
        }
        if (role === PM) {
            return <Delete size="2em" />;
        }
        return <Favorite size="2em" />;
    };

    const getBottomIcon = () => {
        if (isPreview) {
            return null;
        }
        if (role === PM) {
            return <Edit size="2em" />;
        }
        return <Basket size="2em" />;
    };

    return (
        <div className="product-card">
            <div
                className="image-container"
                role="button"
                tabIndex="0"
                onClick={handleCard}
                onKeyDown={handleCard}
            >
                <img src={image || logo} alt="product" className={image ? 'image' : 'logo'} />
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
                        {getUpperIcon()}
                    </button>
                </div>
                <div className="name-container">{name || 'Not Found'}</div>
                <div className="brand-container">{brand || 'Not Found'}</div>
                <div className="desc-container">{description || 'Not Found'}</div>
                <div className="price-container">
                    <span>{price || 'Not Found'} ₺</span>
                </div>
                <div className="bottom-container">
                    <button
                        className={`btn ${role === PM ? 'pm-edit' : 'basket'}`}
                        type="button"
                        onClick={handleBottom}
                    >
                        {getBottomIcon()}
                    </button>
                </div>
                <div className="campaign-container">{campaign}</div>
            </div>
        </div>
    );
};

export default ProductCard;
