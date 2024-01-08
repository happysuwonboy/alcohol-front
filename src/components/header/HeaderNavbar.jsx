import { Link } from 'react-router-dom';
import useToast from './../../hooks/useToast';

export default function HeaderNavbar({curPage}) {
  const [Toast, showToast] = useToast('준비중입니다...', 'warning')
  const preparingNoti = () => showToast()
  
  return (
    <ul className='header_navbar layout_center'>
      <li className={curPage === '/' ? 'active' : ''}>
        <Link to='/'>홈</Link>
      </li>
      <li className={curPage === '/findalcohol' ? 'active' : ''}>
        <Link to='/findalcohol'>전체상품</Link>
      </li>
      <li onClick={preparingNoti}>
        <Link to='#'>신상품</Link>
      </li>
      <li onClick={preparingNoti}>
        <Link to='#'>베스트</Link>
      </li>
      <li onClick={preparingNoti}>
        <Link to='#'>담화배송</Link>
      </li>
      <li onClick={preparingNoti}>
        <Link to='#'>이벤트</Link>
      </li>
      <Toast/>
    </ul>
  );
}