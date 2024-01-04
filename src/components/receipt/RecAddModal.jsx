import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { PiWarning } from "react-icons/pi";

export default function RecAddModal({insertRec, onClose}){
    const [recName, setRecName] = useState('');
    const [recPhone, setRecPhone] = useState('');
    const [recAddress, setRecAddress] = useState('');
    const [recDetailAddress, setRecDetailAddress] = useState('');

    const [isAddressModal, setIsAddressModal] = useState(false);

    /**
     * input에 입력
     */
    const handleNameChange = (e) => {
        setRecName(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setRecPhone(e.target.value);
    }
    const handleDetailAddressChange = (e) => {
        setRecDetailAddress(e.target.value);
    }

    /**
     * 우편번호 검색 모달
     */
    const openAddressModal = () => {
        if(isAddressModal===false){
            setIsAddressModal(true);
            document.querySelector('.cancel').style.marginBottom = '100px';
        }else{
            setIsAddressModal(false);
            document.querySelector('.cancel').style.marginBottom = '0px';
        }
    }

    /**
     * 주소 검색 후 선택
     */
    const handleComplete = (data) => {
        setIsAddressModal(false);
        document.querySelector('.open_address_modal').value = data.address;
        document.querySelector('.cancel').style.marginBottom = '0px';
        setRecAddress(data.address);
    }

    /**
     * 저장 버튼 클릭
     */
    const handleSave = () => {
        if(!recName || !recPhone || !recAddress || !recDetailAddress){
            if (!recName) {
                document.getElementById('rec_name').style.border = '1px solid red';
                document.querySelector('.required_name').style.display = 'flex';
            }else{
                document.getElementById('rec_name').style.border = '1px solid #CCC';
                document.querySelector('.required_name').style.display = 'none';
            }
            if (!recPhone) {
                document.getElementById('rec_phone').style.border = '1px solid red';
                document.querySelector('.required_phone').style.display = 'flex';
            }else{
                document.getElementById('rec_phone').style.border = '1px solid #CCC'
                document.querySelector('.required_phone').style.display = 'none';
            }
            if (!recAddress) {
                document.getElementById('rec_address').style.border = '1px solid red';
            }else{
                document.getElementById('rec_address').style.border = '1px solid #CCC';
            }
            if (!recDetailAddress) {
                document.getElementById('rec_detail_address').style.border = '1px solid red';
            }else{
                document.getElementById('rec_detail_address').style.border = '1px solid #CCC'
            }
            if (!recAddress || !recDetailAddress){
                document.querySelector('.required_address').style.display = 'flex';
            }else{
                document.querySelector('.required_address').style.display = 'none';
            }
        }else{
            insertRec(recName, recPhone, recAddress, recDetailAddress);
            onClose();
        }
    }

    /**
     * 취소 버튼 클릭
     */
    const handleClose = () => {
        onClose();
    }

    return(
        <div className='receipt_modal'>
            <div className='modal_background' />
            <div className='modal_container'>
                <div className='modal_header'>
                    <span>배송지 추가</span>
                </div>
                <div className='modal_content'>
                    <div className='rec_name'>
                        <label htmlFor='rec_name'>수령인</label>
                        <input type='text' id='rec_name' placeholder='성함을 입력해 주세요' onChange={(e) => handleNameChange(e)} />
                        <p className='required_name'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                    <div className='rec_phone'>
                        <label htmlFor='rec_phone'>연락처</label>
                        <input type='text' id='rec_phone' placeholder="'-'을 제외한 숫자만 입력해 주세요" onChange={(e) => handlePhoneChange(e)} />
                        <p className='required_phone'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                    <div className='rec_address'>
                        <label htmlFor='rec_address'>배송지</label>
                        <input type='text' id='rec_address' className='open_address_modal' placeholder='주소를 입력해 주세요' onClick={openAddressModal} readOnly />
                        {isAddressModal && <div className='address_modal'><DaumPostcode onComplete={handleComplete}/></div>}
                        <input type='text' id='rec_detail_address' placeholder='상세주소를 입력해 주세요' onChange={(e) => handleDetailAddressChange(e)} />
                        <p className='required_address'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                </div>  
                <div className='modal_footer'>
                    <button type='button' className='save' onClick={handleSave}>저장</button>
                    <button type='button' className='cancel' onClick={handleClose}>취소</button>
                </div>
            </div>
        </div>
    );
}