import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { ComponentLoading } from './Loading';
import { BasketIcon, Delete, Edit, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';
import { logo } from '../_assets';
import { getAllReviewsByItem } from '../_requests';

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
    } = props;
    const { user } = useStore().getState();
    const isPM = user?.is_product_manager;
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);

    const calculateRating = (rev) => {
        if (rev) {
            let sum = 0;
            let count = 0;
            rev.forEach((review) => {
                if (review.is_approved) {
                    sum += parseInt(review.rating, 10);
                    count += 1;
                }
            });
            setRating(sum / count);
        }
    };

    useEffect(() => {
        setLoading(true);
        getAllReviewsByItem(id)
            .then((response) => {
                calculateRating(response.data);
                setLoading(false);
            })
            .catch(() => {
                props.openAlert({
                    message: 'Error while fetching item reviews!',
                    severity: 'error',
                });
                setLoading(false);
            });
    }, []);

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

    const getUpperIcon = () => {
        if (isPreview) {
            return null;
        }
        return isPM ? <Delete size="2em" /> : <Favorite size="2em" />;
    };

    const getBottomIcon = () => {
        if (isPreview) {
            return null;
        }
        return isPM ? <Edit size="2em" /> : <BasketIcon size="2em" />;
    };

    return loading ? (
        <ComponentLoading />
    ) : (
        <div className="product-card">
            {getImageContainer()}
            <div className="details">
                <div className="star-container">
                    <StarMaker rating={rating || 0} />
                </div>
                <div className="upper-container">
                    <button
                        className={`btn ${isPM ? 'pm-delete' : 'fav'}`}
                        type="button"
                        onClick={() => handleUpper(id)}
                    >
                        {getUpperIcon()}
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
                        {getBottomIcon()}
                    </button>
                </div>
                <div className="campaign-container">{campaign}</div>
            </div>
        </div>
    );
};

export default ProductCard;
