import React, { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';

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
      // DaumPostcode 컴포넌트를 포함하는 모달 또는 다른 방식의 팝업을 구현하면 더 좋습니다.
      // 여기서는 간단히 state를 사용한 예시를 제시했습니다.
      // 실제 프로젝트에서는 이를 개선하거나 커스터마이징할 수 있습니다.
      return () => {
        // 팝업을 닫을 때 추가적인 정리 작업이 필요하다면 여기에 추가합니다.
      };
    }
  }, [isPopupOpen]);

  return (
    <>
      {isPopupOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <DaumPostcode autoClose onComplete={handleCompletePost} />
            <button className="address_close_button" onClick={handleClosePopup}>
              닫기
            </button>
          </div>
        </div>
      )}
      <button className='address_button' type="button" onClick={handleOpenPopup}>
        주소 찾기
      </button>
    </>
  );
};

export default DaumPost;
