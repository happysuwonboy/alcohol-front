import { useState } from 'react';
import MyPageNavbar from '../components/mypage/MyPageNavbar';
import MyPageContent from '../components/mypage/MyPageContent';
import { useLocation } from 'react-router-dom';
import getUserInfo from '../util/getUserInfo';

export default function MyPage() {
    const userInfo = getUserInfo();
    const location = useLocation();
    const userId = userInfo.id;
    const userName = userInfo.user_name;
    
    let defaultShowContent = new URLSearchParams(location.search).get('showContent') || 'MyUserInfo'
    let [showContent, setShowContent] = useState(defaultShowContent);

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
