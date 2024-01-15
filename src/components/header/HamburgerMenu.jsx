import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import HeaderNavbar from './HeaderNavbar';

const HamburgerMenu = forwardRef(({user, show, hideHamburgerMenu, curPage}, ref) => {

  useEffect(()=>{
    hideHamburgerMenu();
  },[curPage]) // 페이지 이동 성공하면 햄버거 메뉴 닫힘

  const navigateMyContent = e => 
  window.location.href = `/mypage?showContent=${e.currentTarget.dataset.content}`
  
  const navigateAdminContent = e => 
  window.location.href = `/adminpage?showContent=${e.currentTarget.dataset.content}`


  return (
    <div onClick={hideHamburgerMenu} ref={ref} className={`hamburger_menu_wrapper mobile_header ${show ? 'show' : ''}`}>
      <div onClick={e => e.stopPropagation()} className='hamburger_menu'>
        <div className='ham_header'>
          <button className='close_btn' onClick={hideHamburgerMenu}>
            <IoMdClose />
          </button>
        </div>
        {user.user_id ?
          <div className='ham_member_loggedin'>
            {!user.isAdmin 
            ?
            <a href='/mypage?showContent=MyUserInfo' className='mypage_link'>
              {user.user_id} 님 &gt;
            </a>
            : 
            <a href='/adminpage?showContent=product' className='mypage_link'>
              관리자 페이지 &gt;
            </a>}
            <button className='header_log logout_btn'
                      onClick={() => {
                        // 'userInfo'라는 키로 저장된 사용자 정보를 제거합니다.
                        localStorage.removeItem('userInfo');
                        // 페이지를 다시 로드합니다.
                        window.location.reload();
                      }}
            > 로그아웃 </button>
            <ul className='mypage_submenus'>

              {!user.isAdmin ? <> {/** 일반 유저 */}
              <li onClick={navigateMyContent} data-content='MyUserInfo'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/user_info.png" alt="" />
                </div>
                <span>회원정보</span>
              </li>
              <li onClick={navigateMyContent} data-content='MyReview'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/review.png" alt="" />
                </div>
                <span>리뷰관리</span>
              </li>
              <li onClick={navigateMyContent} data-content='MyOrder'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/order.png" alt="" />
                </div>
                <span>주문내역</span>
              </li>
              <li onClick={navigateMyContent} data-content='MyReceipt'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/receipt.png" alt="" />
                </div>
                <span>배송지관리</span>
              </li>
              </> 
              : 
              <> {/** 관리자 */}
              <li onClick={navigateAdminContent} data-content='member'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/user_info.png" alt="" />
                </div>
                <span>회원관리</span>
              </li>
              <li onClick={navigateAdminContent} data-content='product'>
                <div className='mypage_icon'>
                  <img src="/assets/images/home/gwasilju.png" alt="" />
                </div>
                <span>상품관리</span>
              </li>
              <li onClick={navigateAdminContent} data-content='order'>
                <div className='mypage_icon'>
                  <img src="/assets/images/mypage/receipt.png" alt="" />
                </div>
                <span>주문관리</span>
              </li>
              </>}

            </ul>
          </div> : null}
        {!user.user_id ? <div className='ham_member_unloggedin'>
          <Link className='header_log login_btn' to='/login'> 로그인/회원가입  &gt; </Link>
          {!user.isAdmin ?<div className='join_event_noti'>
            <p>
              <span>지금 회원가입 하면</span>
            </p>
            <p>
              <b>신규 회원 쿠폰 & 최대 4,000 포인트</b><span> 적립!</span>
            </p>
          </div> : null}
        </div> : null}
        {!user.isAdmin ? <div className='mini_banner'>
          <img src="/assets/images/etc/hamburger_banner.jpg" alt="" />
        </div> : <div style={{background:'#EEE', height:'1px'}}></div>}
        <div className='page_links'>
          <h2>메뉴</h2>
          <HeaderNavbar curPage={curPage} />
        </div>
      </div>
      <div className='black_bg'></div>
    </div>
  );
}
)

export default HamburgerMenu;