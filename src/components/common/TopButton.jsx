import { SlArrowUp } from 'react-icons/sl';
import { useState } from 'react';
import { useEffect } from 'react';

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  // window.scrollTo({top,left,behavior}) 최상단으로 이동
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // 스크롤의 길이에 따라 state값을 true나 false로 반환
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    };
    
    window.addEventListener('scroll', handleShowButton);

    // clean-up function
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return  (
    <div className={`top_btn ${showButton && 'active'}`}>
      <button type='button' onClick={handleScrollToTop}><SlArrowUp /></button>
    </div>
  );
};