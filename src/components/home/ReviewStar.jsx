import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function ReviewStar({ rating }) {
  const stars = Array.from({ length: 5 }).map((_, index) => {
    const starValue = index + 1;

    if (starValue <= rating) {
      return <FaStar key={index} />;
    } else {
      return <FaRegStar key={index} />;
    }
  });


  return <div className='star_wrap'>{stars}</div>
}