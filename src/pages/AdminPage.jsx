import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TitleNavbar from '../components/adminpage/TitleNavbar';
import ProductContent from '../components/adminpage/ProductContent';
import { getUserInfo } from '../util/getUserInfo';
import ConfirmModal from '../components/common/ConfirmModal';

export default function AdminPage() {
    const [showContent, setShowContent] = useState('product');
    const navigate = useNavigate();
    const userInfo = getUserInfo();
    const userRole = userInfo.user_role;

    // 모달창 확인 버튼 클릭
    const handleConfirm = (e) => {
        navigate('/login');
    };

    // 모달창 닫기 버튼 클릭
    const handleModal = (e) => {
        navigate('/');
    };


    return (userRole ?
        <main className='admin_contanier'>
            <TitleNavbar showContent={showContent} setShowContent={setShowContent} />
            <div className='admin_content_container'>
                {showContent === 'product' && <ProductContent />}
            </div>
        </main>
        :
        <div className='modal'>
            <ConfirmModal 
                handleModal={handleModal} 
                handleConfirm={handleConfirm} 
                noti_1='관리자 권한이 필요한 서비스입니다' 
                noti_2='로그인 창으로 이동하시겠습니까?' />
        </div>
    );
}