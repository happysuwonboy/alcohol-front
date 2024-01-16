import { useState, useEffect } from 'react';
import useReceipt from '../../../hooks/useReceipt';
import RecAddModal from '../../../components/receipt/RecAddModal';
import RecUpdateModal from '../../../components/receipt/RecUpdateModal';
import useToast from '../../../hooks/useToast';
import getUserInfo from '../../../util/getUserInfo';

export default function Receipt() {
    const userInfo = getUserInfo();
    const userId = userInfo.id;
    const [recList, getRecList, insertRec, updateRec, deleteRec] = useReceipt(userId);
    
    const [selectedRecId, setSelectedRecId] = useState('');
    const [isRecAddModal, setIsRecAddModal] = useState(false);
    const [isRecUpdateModal, setIsRecUpdateModal] = useState(false);

    const [Toast, showToast] = useToast('배송지가 삭제되었습니다.', 'success');

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
     * 배송지 삭제
     */
    const handleDeleteRec = (recId) => {
        deleteRec(recId);
        showToast();
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
     * 취소 버튼 클릭
     */
    const handleCloseRecAddModal = () => {
        setIsRecAddModal(false);
    }
    const handleCloseRecUpdateModal = () => {
        setIsRecUpdateModal(false);
    }

    return(
        <main className='myreceipt'>
            <div className='reclist_container'>
                <div className='reclist_content'>
                    <div className='reclist'>
                        <div className='list_title'>
                            <span>배송지 목록</span>
                        </div>
                        <div className='recs'>
                        {recList.map((rec, index) => 
                            <div className='rec' key={index}>
                                <div className='rec_info'>
                                    <p className='rec_name'>
                                        <span>{rec.rec_name}</span>
                                    </p>
                                    <p className='rec_phone'>{rec.rec_phone}</p>
                                    <p className='rec_address'>{rec.rec_address}</p>
                                </div>
                                <div className='rec_btns'>
                                    <div className='btns'>
                                        <button type='button' className='update_btn' onClick={() => handleUpdateRec(rec.rec_id)}>수정</button>
                                        <button type='button' className='delete_btn' onClick={() => handleDeleteRec(rec.rec_id)}>삭제</button>
                                    </div>
                                    {rec.rec_default? <span className='default_rec'>기본배송지</span> : ''}
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
                <Toast />
            </div>
        </main>
    );
}