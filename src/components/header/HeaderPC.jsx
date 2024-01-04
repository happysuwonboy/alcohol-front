import { FaSearch } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HeaderNavbar from './HeaderNavbar';

export default function HeaderPC ({user, curPage}) {
  const navigate = useNavigate();
  
  return (
    <>
            <div className='header_sticky_wrapper pc_header'>
                <div className='header_top layout_center'>
                    <div className='main_logo' onClick={()=>navigate('/')}>
                        <img src="/assets/images/main-logo.png" alt="" />
                    </div>
                    <form className='header_search' action="">
                        <label className='hidden_label' htmlFor="">검색창</label>
                        <FaSearch />
                        <input type="text" placeholder='무엇을 찾고 계신가요?' />
                    </form>
                    <div className='header_user_menu'>
                        {!user.user_id ?
                            <Link className='header_log login_btn' to='/login'> 로그인/회원가입  &gt; </Link>
                            : null}
                        {user.user_id ?
                            <>
                                <Link to='/mypage' className='mypage_link'>
                                    {user.user_id} 님 &gt;
                                </Link>
                                <button className='header_log logout_btn' to='/login'> 로그아웃 </button>
                            </>
                            : null}
                        <button className='cart_btn'>
                            <RiShoppingBagLine />
                        </button>
                    </div>
                </div>
            </div>
            {(curPage==='/' || curPage==='/findalcohol') ? <div className='header_static_wrapper pc_header'>
                <HeaderNavbar curPage={curPage}/>
            </div> : null}
        </>
  );
}