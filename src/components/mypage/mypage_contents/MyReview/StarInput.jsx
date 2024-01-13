import { useState } from "react";
import { FaStar } from 'react-icons/fa';

export default function StarInput({ star, fillstart, setStar }) {
  const [rating, setRating] = useState(star);
  const [clickedRating, setClickedRating] = useState(star);

  const handleMouseOver = (index) => {
    setRating(index + 1);
  };

  const handleMouseOut = () => {
    setRating(clickedRating);
    setStar(clickedRating);
  };

  const handleClick = (index) => {
    setClickedRating(index + 1);
  };

  return (
    <>
      <div className='star_input'>
        {[0, 1, 2, 3, 4].map((index) => (
          <FaStar
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            onClick={() => handleClick(index)}
            style={{
              cursor: 'pointer',
              color: index < rating ? `${fillstart}` : 'gray',
            }}
          />
        ))}
      </div>
      <p>{clickedRating}</p>
    </>
  );
};