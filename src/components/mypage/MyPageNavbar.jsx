export default function MyPageNavbar({onContent, showContent}) {
  
    const handleClick = (content) => {
        onContent(content);
        window.scrollTo({top : 0});
    }
  
    return (
        <div className='mypage_navbar'>
            <div onClick={() => handleClick('MyUserInfo')} className={showContent==='MyUserInfo' ? 'active nav' : 'nav'}>
                <span>회원 정보</span>
                <span className='mypage_icon'>
                    <img src='assets/images/mypage/user_info.png' alt='mypage_icon' />
                </span>
            </div>
            <div onClick={() => handleClick('MyReview')} className={showContent==='MyReview' ? 'active nav' : 'nav'}>
                <span>리뷰 관리</span>
                <span className='mypage_icon'>
                    <img src='assets/images/mypage/review.png' alt='mypage_icon' />
                </span>
            </div>
            <div onClick={() => handleClick('MyOrder')} className={showContent==='MyOrder' ? 'active nav' : 'nav'}>
                <span>주문 내역</span>
                <span className='mypage_icon'>
                    <img src='assets/images/mypage/order.png' alt='mypage_icon' />
                </span>
            </div>
            <div onClick={() => handleClick('MyReceipt')} className={showContent==='MyReceipt' ? 'active nav' : 'nav'}>
                <span>배송지 관리</span>
                <span className='mypage_icon'>
                    <img src='assets/images/mypage/receipt.png' alt='mypage_icon' />
                </span>
            </div>
            <div onClick={() => handleClick('MyQNA')} className={showContent==='MyQNA' ? 'active nav' : 'nav'}>
                <span>1:1문의</span>
                <span className='mypage_icon'>
                    <img src='assets/images/mypage/QNA.png' alt='mypage_icon' />
                </span>
            </div>
        </div>
    )
  }
  