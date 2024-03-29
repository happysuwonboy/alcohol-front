import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { GrFormPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import { useEffect, useRef, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import usePageTitle from '../../hooks/usePageTitle';
import CartButton from './CartButton';
import HeaderMobileSearch from './HeaderMobileSearch';

export default function HeaderMobile({ user, curPage }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [showHamb, setShowHamb] = useState(false);
  const pageTitle = usePageTitle();
  const [ showSearch, setShowSearch ] = useState(false);

  const showHamburgerMenu = () => setShowHamb(true)
  const hideHamburgerMenu = () => setShowHamb(false)
  
  const movePrevPage = () => navigate(-1)

  
  const handelResize = () => {
    if (window.innerWidth >= 880) {
        hideHamburgerMenu();
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', handelResize)
    return () => window.removeEventListener('resize', handelResize)
  },[])

  const handleClickSearch = (e) => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <div className='header_sticky_wrapper mobile_header'>
        <div className='header_top'>
          {!pageTitle 
          ?
            <div className='main_logo' onClick={() => navigate('/')}>
              <img src='/assets/images/logo/alcohol_logo.png' alt='술담화 로고 이미지' />
            </div>
          :
          <button className='prev_page_btn' onClick={()=>navigate(-1)}>
            <GrFormPrevious/>
          </button>}
          {pageTitle 
          ? <span className='page_title'>{pageTitle}</span> : null}
          <div className='header_user_menu'>
            {(curPage==='/' || curPage==='/findalcohol')
            ? <button className='user_menu_btn search_btn'>
                <FaSearch onClick={handleClickSearch} />
                { showSearch && <HeaderMobileSearch setShowSearch={setShowSearch} />}
              </button> 
            : null}
              {!user.isAdmin ? <CartButton/> : null}
            <button onClick={showHamburgerMenu} className='user_menu_btn hamburger_btn'>
              <RxHamburgerMenu />
            </button>
          </div>
        </div>
        {(curPage==='/' || curPage==='/findalcohol') ? <HeaderNavbar curPage={curPage}/> : null}
      </div>
      {/* 햄버거 메뉴 */}
      <HamburgerMenu user={user} show={showHamb} ref={ref} 
                    curPage={curPage} hideHamburgerMenu={hideHamburgerMenu}/>
    </>
  );
}