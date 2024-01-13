import MyUserInfo from './mypage_contents/MyUserInfo';
import MyOrder from './mypage_contents/MyOrder';
import MyOrderDetail from './mypage_contents/MyOrderDetail';
import MyQNA from './mypage_contents/MyQNA';
import MyReceipt from './mypage_contents/MyReceipt';
import MyReview from './mypage_contents/MyReview';

export default function MyPageContent({userId, onContent, showContent}) {

    return (
        <div className='mypage_content'>
            {showContent==='MyUserInfo' && <MyUserInfo userId={userId}/>}
            {showContent==='MyOrder' && <MyOrder userId={userId} onContent={onContent} />}
            {showContent==='MyOrderDetail' && <MyOrderDetail userId={userId} />}
            {showContent==='MyQNA' && <MyQNA userId={userId}/>}
            {showContent==='MyReceipt' && <MyReceipt userId={userId}/>}
            {showContent==='MyReview' && <MyReview userId={userId} onContent={onContent} />}
        </div>
    ); 
}