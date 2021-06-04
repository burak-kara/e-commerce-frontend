import React, { useEffect, useState } from 'react';
import { connect, useStore } from 'react-redux';
import { BasketIcon, Delete, Edit, Favorite } from '../_utilities/icons';
import StarMaker from './StarMaker';
import { logo } from '../_assets';
import { openAlert } from '../_redux/actions';
import { getCampaignByID } from '../_requests';

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
    const [campaigns, setCampaigns] = useState([]);
    const { user } = useStore().getState();
    const isPM = user?.is_product_manager;

    useEffect(() => {
        if (campaign.length !== 0) {
            campaign.forEach((item) => {
                getCampaignByID(item)
                    .then((response) => {
                        // eslint-disable-next-line no-shadow
                        setCampaigns((campaigns) => [...campaigns, response.data.name]);
                    })
                    .catch(() => {
                        props.openAlert({
                            message: 'Something went wrong while getting ad.',
                            severity: 'error',
                        });
                    });
            });
        }
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

    const Campaigns = () => {
        const content = [];
        if (campaigns.length !== 0) {
            campaigns.forEach((item) => {
                content.push(<span className="span">{item}</span>);
            });
        }
        return content;
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
                        name="Favorite or Delete"
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
                        name="Edit or Add to Basket"
                        type="button"
                        onClick={() => handleBottom(id)}
                    >
                        <BottomIcon />
                    </button>
                </div>

                <div className="campaign-container">
                    <Campaigns />
                </div>
            </div>
        </div>
    );
};

export default connect(null, { openAlert })(ProductCard);
