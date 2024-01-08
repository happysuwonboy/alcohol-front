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
            <Link to='/mypage' className='mypage_link'>
              {user.user_id} 님 &gt;
            </Link>
            : 
            <Link to='/adminpage' className='mypage_link'>
              관리자 페이지 &gt;
            </Link>}
            <button className='header_log logout_btn' to='/login'> 로그아웃 </button>
            <ul className='mypage_submenus'>
              <li>
                <FaUserEdit />
                <span>회원정보</span>
              </li>
              <li>
                <IoDocumentTextOutline />
                <span>주문내역</span>
              </li>
              <li>
                <MdRateReview />
                <span>리뷰관리</span>
              </li>
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