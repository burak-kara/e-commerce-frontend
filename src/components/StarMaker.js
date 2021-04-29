import React from 'react';
import { STAR_COUNT } from '../_constants';
import { EmptyStar, FilledStar, HalfStar } from '../_utilities/icons';

const StarMaker = (props) => {
    const { rating, size } = props;
    const fullCount = parseInt(rating, 10);
    const halfCount = (rating * 100) % 100 < 50 ? 0 : 1;
    const emptyCount = STAR_COUNT - fullCount - halfCount;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < fullCount; i += 1) {
            stars.push(<FilledStar key={`${i}-full`} size={size || "18px"} />);
        }
        for (let i = 0; i < halfCount; i += 1) {
            stars.push(<HalfStar key={`${i}-half`} size={size || "18px"} />);
        }
        for (let i = 0; i < emptyCount; i += 1) {
            stars.push(<EmptyStar key={`${i}-empty`} size={size || "18px"} />);
        }
        return stars;
    };

    return <div className="star-maker">{renderStars()}</div>;
};

export default StarMaker;
