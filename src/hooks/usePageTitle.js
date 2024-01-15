import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BASE_URL from '../constants/baseurl';


const usePageTitle = () => {
    const [pageTitle, setPageTitle] = useState('');
    const location = useLocation();
    const curPage = location.pathname;

    useEffect(()=>{
        if (curPage ==='/mypage') {
          const content = new URLSearchParams(location.search).get('showContent');
          switch (content) {
            case 'MyUserInfo' : return setPageTitle('회원정보');
            case 'MyReview' : return setPageTitle('리뷰관리');
            case 'MyOrder' : return setPageTitle('주문내역');
            case 'MyReceipt' : return setPageTitle('배송지관리');
            default : return setPageTitle('마이페이지')
          }
        } else if (curPage==='/adminpage') {
          const content = new URLSearchParams(location.search).get('showContent');
          switch (content) {
            case 'member' : return setPageTitle('회원관리');
            case 'product' : return setPageTitle('상품관리');
            case 'order' : return setPageTitle('주문관리');
            default : return setPageTitle('관리자 페이지')
         } 
        } else if (curPage.slice(0,13)==='/findalcohol/') {
          axios.get(`${BASE_URL}/alcoholdetail/${curPage.slice(13)}`)
          .then(res=> setPageTitle(res.data.alcohol_name))
          .catch(err => console.log(err))
        } else if (curPage === '/cart') {
          setPageTitle('장바구니')
        } else if (curPage==='/payment') {
          setPageTitle('주문/결제')
        } else if (curPage === '/adminpage') {
          setPageTitle('관리자 페이지')
        } else if (curPage === '/login') {
          setPageTitle('로그인')
        } else if (curPage === '/join') {
          setPageTitle('회원가입')
        } else {
          setPageTitle('')
        }
      },[curPage])


      return pageTitle
}

export default usePageTitle;