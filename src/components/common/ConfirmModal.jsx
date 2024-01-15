import React from 'react';

export default function ConfirmModal({handleModal, handleConfirm, noti_1, noti_2, btnText}){

  const handleModalBackground = (e) => {
    e.stopPropagation();
  }

  return(
    <div className='modal_box' onClick={handleModalBackground}>
      <div className='modal_info'>
        <div className='img_box'>
          <img src='/assets/images/etc/black_favicon.png' alt='술담화 이미지' />
        </div>
        <div className='info_box'>
          <div className='text_wrap'>
            <p>{noti_1}</p>
            <p>{noti_2}</p>
          </div>
          <div className='btn_wrap'>
            <button type='button' className='close_btn'
                    onClick={handleModal}>닫기</button>
            <button type='button' className='login_btn'
                    onClick={handleConfirm}>{btnText || '확인'}</button>
          </div>
        </div>
      </div>
    </div>    
  );
};