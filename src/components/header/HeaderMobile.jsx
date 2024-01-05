import { FaSearch } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import { useEffect, useRef, useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

export default function HeaderMobile({ user, curPage }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [showHamb, setShowHamb] = useState(false);

  const showHamburgerMenu = () => setShowHamb(true)
  const hideHamburgerMenu = () => setShowHamb(false)
  
  const handelResize = () => {
    if (window.innerWidth >= 880) {
        hideHamburgerMenu();
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', handelResize)
    return () => window.removeEventListener('resize', handelResize)
  },[])

  return (
    <>
      <div className='header_sticky_wrapper mobile_header'>
        <div className='header_top'>
          <div className='main_logo' onClick={() => navigate('/')}>
            <img src="/assets/images/main-logo.png" alt="" />
          </div>
          <div className='header_user_menu'>
            <button className='user_menu_btn search_btn'>
              <FaSearch />
            </button>
            <button className='user_menu_btn cart_btn'>
              <RiShoppingBagLine />
            </button>
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