import { useState } from 'react';
import MyUserInfo from './mypage_contents/MyUserInfo';
import MyOrder from './mypage_contents/MyOrder';
import MyOrderDetail from './mypage_contents/MyOrderDetail';
import MyReceipt from './mypage_contents/MyReceipt';
import MyReview from './mypage_contents/MyReview';

export default function MyPageContent({userId, onContent, showContent}) {
    const [order, setOrder] = useState([]);

    const handleOrderDetail = (orderDetail) => {
        setOrder(orderDetail);
    }

    return (
        <div className='mypage_content'>
            {showContent==='MyUserInfo' && <MyUserInfo userId={userId}/>}
            {showContent==='MyOrder' && <MyOrder userId={userId} onContent={onContent} onOrderDetail={handleOrderDetail}/>}
            {showContent==='MyOrderDetail' && <MyOrderDetail userId={userId} onContent={onContent} order={order} />}
            {showContent==='MyReceipt' && <MyReceipt userId={userId}/>}
            {showContent==='MyReview' && <MyReview userId={userId} onContent={onContent} />}
        </div>
    ); 
}