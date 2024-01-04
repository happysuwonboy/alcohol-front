import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import ReactDOM from 'react-dom';

const DaumPost = ({ onAddressChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCompletePost = (data) => {
    const { address, bname, buildingName } = data;
  
    let fullAddr = address;
    if (data.addressType === 'R') {
      const extraAddr = [bname, buildingName].filter(Boolean).join(', ');
      fullAddr += extraAddr ? ` (${extraAddr})` : '';
    }
  
    onAddressChange(fullAddr);
    handleClosePopup();
  };
  
  

  useEffect(() => {
    if (isPopupOpen) {
      const popupWindow = window.open('', 'find_address', 'width=500,height=600');
      popupWindow.document.body.innerHTML = '<div id="daum-post"></div>';
      ReactDOM.render(
        <DaumPostcode autoClose onComplete={handleCompletePost} />,
        popupWindow.document.getElementById('daum-post')
      );
  
      return () => {
        popupWindow.close();
      };
    }
  }, [isPopupOpen]);
  

  return (
    <>
      <button className='address_button' type="button" onClick={handleOpenPopup}>주소 찾기</button>
    </>
  );
};

export default DaumPost;
