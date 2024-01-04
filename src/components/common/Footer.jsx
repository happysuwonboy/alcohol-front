import { AiFillInstagram } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";

export default function Footer() {
    return (
        <div className='footer_wrapper'>
            <div className='footer'>
                <div className='company_info'>
                    <ul className='sns_links'>
                        <li>
                            <AiFillInstagram />
                        </li>
                        <li>
                            <RiKakaoTalkFill />
                        </li>
                        <li>
                            <FaYoutube />
                        </li>
                        <li>
                            <FaFacebookF />
                        </li>
                        <li>
                            <SiNaver className='naver'/>
                        </li>
                    </ul>
                    <h5 className='company_name'>담화컴퍼니 주식회사</h5>
                    <small className='company_tel'>고객센터 : 070-1234-5718</small>
                    <small className='company_businessday'>평일 10:00 ~ 18:00, 주말 휴무</small>
                </div>
                <ul className='term_links'>
                    <li>이용약관</li>
                    <li>개인정보처리방침</li>
                    <li>입점문의</li>
                </ul>
                <div className='representative_info'>
                    <div>
                        <p>대표 : 김대표 </p>
                        <p>사업자등록번호 : 123-45-67890</p>
                        <p>통신판매 신고번호: 1234-서울서초-5678</p>
                        <p>주소 : 서울특별시 강남구 역삼동 831-3 한국빌딩 4층</p>
                    </div>
                    <div>
                        <p>정보보호 책임자 : 김정보</p>
                        <p>대표 전화 : 123-4567-8901</p>
                        <p>이메일 : teamone@portfolio.com</p>
                    </div>
                </div>
                <div className='pay_noti'>
                    <p>
                        술담화는 통신판매중개자로서 통신판매 당사자가 아니며, 판매자가 등록한 상품정보 및 거래에 대해 술담화는 책임을 지지 않습니다.
                    </p>
                    <p>
                        고객님의 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서 가입한 NICE구매안전 (에스크로) 서비스를 이용하실 수 있습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}