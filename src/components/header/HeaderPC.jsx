import { FaSearch } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';
import CartButton from './CartButton';
import useHeaderSearch from '../../hooks/useHeaderSearch';

export default function HeaderPC ({user, curPage}) {
  const [ handleSearchChange, handleSearchPress ] = useHeaderSearch();
  const navigate = useNavigate();

  return (
    <>
            <div className='header_sticky_wrapper pc_header'>
                <div className='header_top layout_center'>
                    <div className='main_logo' onClick={()=>navigate('/')}>
                        <img src='/assets/images/logo/alcohol_logo.png' alt='술담화 로고 이미지' />
                    </div>
                    <form className='header_search' action="">
                        <label className='hidden_label' htmlFor='header_search'>검색창</label>
                        <FaSearch />
                        <input type="text" placeholder='무엇을 찾고 계신가요?' name='header_search' id='header_search' onChange={handleSearchChange} onKeyPress={handleSearchPress} />
                    </form>
                    <div className='header_user_menu'>
                        {!user.user_id ?
                            <Link className='header_log login_btn' to='/login'> 로그인/회원가입  &gt; </Link>
                            : null}
                        {user.user_id ?
                            <>
                                <Link to={!user.isAdmin ? '/mypage' : '/adminpage'} className='mypage_link'>
                                    {!user.isAdmin ? `${user.user_id} 님` : '관리자 페이지'} &gt;
                                </Link>
                                <button className='header_log logout_btn' to='/login'> 로그아웃 </button>
                            </>
                            : null}
                        {!user.isAdmin ? <CartButton/> : null}
                    </div>
                </div>
            </div>
            {(curPage==='/' || curPage==='/findalcohol') ? <div className='header_static_wrapper pc_header'>
                <HeaderNavbar curPage={curPage}/>
            </div> : null}
        </>
  );
}