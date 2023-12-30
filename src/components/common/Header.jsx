import { FaSearch } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function Header() {
    const user = {user_id: null, isAdmin : false}

    return(
        <div className='pc_header_wrapper'>
            <div className='header_top'>
                <div className='main_logo'>
                    <img src="assets/images/main-logo.png" alt="" />
                </div>
                <form className='header_search' action="">
                    <label className='hidden_label' htmlFor="">검색창</label>
                    <FaSearch />
                    <input type="text" placeholder='무엇을 찾고 계신가요?'/>
                </form>
                <div className='header_user_menu'>
                    { !user.user_id ? 
                        <Link className='header_log login_btn' to='/login'> 로그인/회원가입  &gt; </Link>
                     : null}
                    { user.user_id ?
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
            <ul className='header_navbar'>
                
            </ul>
        </div>
    );
}