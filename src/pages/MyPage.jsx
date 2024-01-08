import { useState } from 'react';
import MyPageNavbar from '../components/mypage/MyPageNavbar';
import MyPageContent from '../components/mypage/MyPageContent';
import { useLocation } from 'react-router-dom';

export default function MyPage() {
    const location = useLocation();
    
    let defaultShowContent = new URLSearchParams(location.search).get('showContent') || 'MyUserInfo'
    let [showContent, setShowContent] = useState(defaultShowContent);

    const userId = 'user123';
    const userName = '유저일이삼';

    const handleContent = (content) => {
        setShowContent(content);
    }

    return userId && (
        <main className='mypage'>
            <div className='mypage_container'>
                <div className='mypage_header'>
                    <div className='user_name'>
                        <span>{userName}</span>
                        <span>님</span>
                    </div>
                    <MyPageNavbar onContent={handleContent} showContent={showContent} />
                </div>
                <MyPageContent userId={userId} onContent={handleContent} showContent={showContent} />
            </div> 
        </main>
    ) 
}
