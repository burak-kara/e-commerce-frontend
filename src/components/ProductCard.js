import React from 'react';
import { connect, useStore } from 'react-redux';
import { BasketIcon, Delete, Edit, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';
import { logo } from '../_assets';
import { openAlert } from '../_redux/actions';

const ProductCard = (props) => {
    const {
        id,
        image,
        name,
        brand,
        description,
        price,
        campaign,
        handleUpper,
        handleBottom,
        handleCard,
        isPreview,
        mean_rating,
    } = props;
    const { user } = useStore().getState();
    const isPM = user?.is_product_manager;

    const getImageContainer = () => {
        const img = <img src={image || logo} alt="product" className={image ? 'image' : 'logo'} />;
        return isPreview ? (
            <div className="image-container">{img}</div>
        ) : (
            <div
                className="image-container"
                role="button"
                tabIndex="0"
                onClick={() => handleCard(id)}
                onKeyDown={() => {}}
            >
                {img}
            </div>
        );
    };

    const UpperIcon = () => {
        if (isPreview) {
            return null;
        }
        return isPM ? <Delete size="2em" /> : <Favorite size="2em" />;
    };

    const BottomIcon = () => {
        if (isPreview) {
            return null;
        }
        return isPM ? <Edit size="2em" /> : <BasketIcon size="2em" />;
    };

    return (
        <div className="product-card">
            {getImageContainer()}
            <div className="details">
                <div className="star-container">
                    <StarMaker rating={mean_rating || 0} />
                </div>
                <div className="upper-container">
                    <button
                        className={`btn ${isPM ? 'pm-delete' : 'fav'}`}
                        type="button"
                        onClick={() => handleUpper(id)}
                    >
                        <UpperIcon />
                    </button>
                </div>
                <div className="name-container">{name || 'Not Found'}</div>
                <div className="brand-container">{brand || 'Not Found'}</div>
                <div className="desc-container">{description || 'Not Found'}</div>
                <div className="price-container">
                    <span>{price || 'Not Found'}</span>
                    <span className="ml-1 currency">TL</span>
                </div>
                <div className="bottom-container">
                    <button
                        className={`btn ${isPM ? 'pm-edit' : 'basket'}`}
                        type="button"
                        onClick={() => handleBottom(id)}
                    >
                        <BottomIcon />
                    </button>
                </div>
                <div className="campaign-container">{campaign}</div>
            </div>
        </div>
    );
};

export default connect(null, { openAlert })(ProductCard);
