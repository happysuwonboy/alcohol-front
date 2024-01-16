import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useReceipt from "../hooks/useReceipt";
import RecAddModal from "../components/receipt/RecAddModal";
import RecUpdateModal from '../components/receipt/RecUpdateModal';

export default function Receipt() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const userId = state.userId;
    const cartData = state.cartData;
    const checked = cartData.checked;
    const totalPrice = cartData.totalPrice;
    const totalDcPrice = cartData.totalDcPrice;
    const deliveryPrice = cartData.deliveryPrice;

    const [recList, getRecList, insertRec, updateRec] = useReceipt(userId);
    
    const [selectedRecId, setSelectedRecId] = useState('');
    const [isRecUpdateModal, setIsRecUpdateModal] = useState(false);
    const [isRecAddModal, setIsRecAddModal] = useState(false);

    /**
     * 배송지 수정 모달
     */
    const handleUpdateRec = (recId) => {
        if(isRecUpdateModal === false){
            setSelectedRecId(recId);
            setIsRecUpdateModal(true);
        }else{
            setIsRecUpdateModal(false);
        }
    }

    /**
     * 배송지 추가 모달
     */
    const handleAddRec = () => {
        if(isRecAddModal === false){
            setIsRecAddModal(true);
        }else{
            setIsRecAddModal(false);
        }
    }

    /**
     * 배송지 선택
     */
    const handleSelectRec = (name, phone, address, recId) => {
        navigate(`/payment`, { state: {
            userId: userId,
            checked : checked,
            totalPrice : totalPrice,
            totalDcPrice : totalDcPrice,
            deliveryPrice : deliveryPrice,
            name: name,
            phone: phone,
            address: address,
            recId: recId
        }});
    }

    /**
     * 취소 버튼 클릭
     */
    const handleCloseRecAddModal = () => {
        setIsRecAddModal(false);
    }
    const handleCloseRecUpdateModal = () => {
        setIsRecUpdateModal(false);
    }

    return(
        <main className='main_reclist'>
            <div className='reclist_container'>
            <p className='reclist_title'>배송지 목록</p>
                <div className='reclist_content'>
                    <div className='reclist'>
                        <div className='list_title'>
                            <span>배송지를 선택해 주세요.</span>
                        </div>
                        <div className='recs'>
                        {recList.map((rec, index) => 
                            <div className='rec' key={index}>
                                <div className='rec_info'>
                                    <p className='rec_name'>{rec.rec_name}</p>
                                    <p className='rec_phone'>{rec.rec_phone}</p>
                                    <p className='rec_address'>{rec.rec_address}</p>
                                </div>
                                <div className='btns'>
                                    <button type='button' className='update_btn' onClick={() => handleUpdateRec(rec.rec_id)}>수정</button>
                                    <button type='button' className='select_btn' onClick={() => handleSelectRec(rec.rec_name, rec.rec_phone, rec.rec_address, rec.rec_id)}>선택</button>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className='add_rec'>
                            <button type='button' className='add_btn' onClick={handleAddRec}>새 배송지 추가하기 +</button>
                        </div>
                    </div>
                </div>
                {isRecUpdateModal?<RecUpdateModal updateRec={updateRec} recId={selectedRecId} onClose={handleCloseRecUpdateModal} />:''}
                {isRecAddModal?<RecAddModal insertRec={insertRec} onClose={handleCloseRecAddModal} />:''}
            </div>
        </main>
    );
}