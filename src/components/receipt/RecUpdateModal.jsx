import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { PiWarning } from "react-icons/pi";
import axios from 'axios';

export default function RecUpdateModal({updateRec, recId, onClose}){
    const [recName, setRecName] = useState('');
    const [recPhone, setRecPhone] = useState('');
    const [recAddress, setRecAddress] = useState('');
    const [isRecAddress, setIsRecAddress] = useState(false);
    const [recDetailAddress, setRecDetailAddress] = useState('');

    const [isAddressModal, setIsAddressModal] = useState(false);
    const [isDefaultCheck, setIsDefaultCheck] = useState(0);

    /**
     * 선택한 배송지 조회
     */
    const getSelectedRec = () => {
        axios({
            method : "get",
            url : `http://127.0.0.1:8000/receipt/rec/${recId}`
        })
        .then((result) => {
            setRecName(result.data[0].rec_name);
            setRecPhone(result.data[0].rec_phone);
            setRecAddress(result.data[0].rec_address);
            setIsDefaultCheck(result.data[0].rec_default);
        })
        .catch((err) => {
            console.error('axios 선택한 배송지 정보 가져오는 중 에러 발생 => ' + err);
        });
    }

    useEffect(() => {
        getSelectedRec();
    }, [])

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
        setIsRecAddress(true);
        setIsAddressModal(false);
        document.querySelector('.open_address_modal').value = data.address;
        document.querySelector('.cancel').style.marginBottom = '0px';
        setRecAddress(data.address);
    }

    /**
     * 기본 배송지로 저장 체크
     */
    const handleCheckDefault = () => {
        if(isDefaultCheck===0){
            setIsDefaultCheck(1);
        }else{
            setIsDefaultCheck(0);
        }
    }

    /**
     * 수정완료 버튼 클릭
     */
    const handleSave = () => {
        if(!recName || !recPhone || !recAddress || (isRecAddress && !recDetailAddress)){
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
            if(isRecAddress){
                if (!recDetailAddress) {
                    document.getElementById('rec_detail_address').style.border = '1px solid red';
                }else{
                    document.getElementById('rec_detail_address').style.border = '1px solid #CCC'
                }
            }
            if (!recAddress || isRecAddress && !recDetailAddress){
                document.querySelector('.required_address').style.display = 'flex';
            }else{
                document.querySelector('.required_address').style.display = 'none';
            }
        }else{
            updateRec(recId, recName, recPhone, recAddress, recDetailAddress, isDefaultCheck);
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
                    <span>배송지 수정</span>
                </div>
                <div className='modal_content'>
                    <div className='rec_name'>
                        <label htmlFor='rec_name'>수령인</label>
                        <input type='text' id='rec_name' placeholder='성함을 입력해 주세요' onChange={(e) => handleNameChange(e)} value={recName} />
                        <p className='required_name'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                    <div className='rec_phone'>
                        <label htmlFor='rec_phone'>연락처</label>
                        <input type='text' id='rec_phone' placeholder="'-'을 제외한 숫자만 입력해 주세요" onChange={(e) => handlePhoneChange(e)} value={recPhone} />
                        <p className='required_phone'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                    <div className='rec_address'>
                        <label htmlFor='rec_address'>배송지</label>
                        <input type='text' id='rec_address' className='open_address_modal' placeholder='주소를 입력해 주세요' onClick={openAddressModal} value={recAddress} readOnly />
                        {isAddressModal && <div className='address_modal'><DaumPostcode onComplete={handleComplete}/></div>}
                        {isRecAddress
                            ?<input type='text' id='rec_detail_address' placeholder='상세주소를 입력해 주세요' onChange={(e) => handleDetailAddressChange(e)} />
                            :''
                        }
                        <p className='required_address'><PiWarning /> <span>필수 입력 항목입니다</span></p>
                    </div>
                </div>  
                <div className='modal_footer'>
                    <button type='button' onClick={handleCheckDefault} className='default_check'>
                        <div className='default_check_img'>
                            {isDefaultCheck === 1
                            ? <img src='/assets/images/etc/check_on.png' alt='default_check' />
                            : <img src='/assets/images/etc/check_off.png' alt='default_none_check' />}
                        </div>
                        <p>기본 배송지로 등록</p>
                    </button>
                    <button type='button' className='save' onClick={handleSave}>수정완료</button>
                    <button type='button' className='cancel' onClick={handleClose}>취소</button>
                </div>
            </div>
        </div>
    );
}