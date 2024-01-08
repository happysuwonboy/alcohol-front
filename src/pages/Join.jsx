import React from "react";
import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DaumPost from "../components/common/DaumPost";

export default function Join(){  
  const navigate = useNavigate();
  const [idErrorMessage, setIdErrorMessage] = useState('');
  const [form, setForm ] = useState({name:'',userid:'', password:'',confirmpassword:'', phone:'',birthdate:'',email:'',selectedAddress:'',detailaddress:''});
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false); // 상태 정의 추가
  const onAddressChange = (address) => {
    setForm((prevForm) => ({
      ...prevForm,
      selectedAddress: address,
    }));
    // 주소가 선택되면 입력 필드 나타나게 설정
    setShowAddressFields(true);
  };
  useEffect(() => {
    // 모든 필수 입력 필드가 채워졌는지 확인
    const requiredFields = ['name', 'userid', 'password', 'confirmpassword', 'phone', 'birthdate', 'email', 'selectedAddress', 'detailaddress'];
    const isFilled = requiredFields.every(field => form[field]);

    setIsFormFilled(isFilled);
  }, [form]);

  const handleIdCheck = async () => {
    try {
      const inputValue = inputUserId.current.value;
  
      const response = await axios.get(`http://localhost:8000/join/${inputValue}`);
      const responseData = response.data;
      
      if (responseData.cnt === 1) {
        // 아이디가 이미 사용 중인 경우
        // 다른 동작을 수행하거나 상태를 업데이트할 수 있음
        alert('이미 사용중인 아이디 입니다.');
      } else {
        // 아이디 사용 가능한 경우
        // 다른 동작을 수행하거나 상태를 업데이트할 수 있음
        alert('사용이 가능합니다.');
      }
    } catch (error) {
      console.error('ID 확인 중 오류 발생:', error);
      // 오류 처리 (예: 오류 상태 설정)
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
        // 이름, 아이디, 이메일은 알파벳과 숫자만 허용
        if (name === 'name' || name === 'userid' || name === 'email' || name === 'password' || name === 'confirmpassword' || name === 'detailaddress') {
          setForm({ ...form, [name]: value });
        }
            // 비밀번호와 비밀번호 확인이 다를 경우 에러 메시지 설정
        if (name === 'password' || name === 'confirmpassword') {
          if (form.password !== value) {
            setPasswordMatchError('비밀번호가 일치하지 않습니다.');
          } else {
            setPasswordMatchError('');
          }
        }
        else if (name === 'phone' || name === 'birthdate') {
          // 전화번호, 생일은 숫자만 허용
          const numericValue = value.replace(/\D/g, '');
          const limitedValue = numericValue.slice(0, (name === 'phone') ? 11 : 8);
    
          // 전화번호 형식 변환 (00000000000 -> 000-0000-0000)
          // 생일 형식 변환 (YYYYMMDD -> YYYY-MM-DD)
          const formattedValue = (name === 'phone')
            ? limitedValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            : limitedValue.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    
          setForm({ ...form, [name]: formattedValue });
        }
          

  };


  const inputName = useRef(null); 
  const inputUserId = useRef(null); 
  const inputPassword = useRef(null); 
  const inputConfirmPassword = useRef(null); 
  const inputPhone = useRef(null); 
  const inputEmail = useRef(null); 
  const inputBirthdate = useRef(null); 
  const inputSelectedAddress = useRef(null); 
  const inputDetailAddress = useRef(null); 


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 폼 입력값 가져오기
      const {
        name,
        userid,
        password,
        phone,
        birthdate,
        email,
        selectedAddress,
        detailaddress,
      } = form;
  
      // selectedAddress와 detailaddress를 띄어쓰기로 구분된 하나의 문자열로 합치기
      const fullAddress = `${selectedAddress} ${detailaddress}`;
      
      //console.log('폼 데이터:', {
      //  name,
      //  userid,
      //  password,
      //  phone,
      //  birthdate,
      //  email,
      //  fullAddress,
      //});

      // 현재 연도 가져오기
      const currentYear = new Date().getFullYear();

      // 사용자의 태어난 연도 가져오기
      const birthYear = parseInt(form.birthdate.substring(0, 4), 10);
      
      // 미성년자인지 확인
      if (currentYear - birthYear < 19) {
        const isConfirmed = window.confirm('미성년자는 회원 가입이 제한됩니다. 계속 진행하시겠습니까?');
        if (!isConfirmed) {
          // 미성년자이면서 확인을 누르지 않으면 아무런 처리도 하지 않음
          return;
        }
      } else {
        // 미성년자가 아닌 경우에만 서버로 회원 가입 요청 보내기
        const response = await axios.post('http://localhost:8000/join/', {
          name,
          userid,
          password,
          phone,
          birthdate,
          email,
          fullAddress,
        });
  
        // 회원 가입 성공 시의 처리 (예: 리다이렉트, 알림 메시지 등)
        //console.log('회원 가입 성공:', response.data);
        // 리다이렉트
        navigate('/login');
      }
  
      // 미성년자인 경우 리다이렉션
      if (currentYear - birthYear < 19) {
        navigate('/');
      }
    } catch (error) {
      // 회원 가입 실패 시의 처리 (예: 에러 메시지 표시, 상태 업데이트 등)
      console.error('회원 가입 실패:', error);
    }
  };
  


  return(
    <main className="join_frame">
      <h1 className="join_title">환영합니다! 🥂</h1>
      <form className="join_form" onSubmit={handleSubmit}>
  <label className='label_name'>이름</label>
  <input 
    className='input_name' type="text" id="name" 
    name="name" placeholder="이름을 입력해주세요" 
    value={form.name} ref={inputName} required onChange={handleChange} />

  <label className='label_userid'>아이디</label>
  <input className='input_userid' type="text" id="userid" 
  name="userid" placeholder="아이디를 입력해주세요" 
  value={form.userid} ref={inputUserId} required onChange={handleChange} />
  <button type='button' className='idcheck_button' onClick={handleIdCheck}>중복확인</button>
  
  <label className='label_password'>비밀번호</label>
  <input className='input_password' type="password" id="password" 
  name="password" placeholder="비밀번호를 입력해주세요" 
  value={form.password} ref={inputPassword} required onChange={handleChange} />

  <label className='label_confirmpassword'>비밀번호 확인</label>
  <input className='input_confirmpassword' type="password" id="confirmpassword" 
  name="confirmpassword" placeholder="비밀번호를 다시 입력해주세요" 
  value={form.confirmpassword} ref={inputConfirmPassword} required onChange={handleChange} />
  {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>}

  <label className='label_phone'>전화번호</label>
  <input className='input_phone' type="text" id="phone" 
  name="phone" placeholder="전화번호를 입력해주세요" 
  value={form.phone} ref={inputPhone} required onChange={handleChange} />

  <label className='label_birthdate'>생년월일</label>
  <input className='input_birthdate' type="text" id="birthdate" 
  name="birthdate" placeholder="생년월일을 입력해주세요 (YYYYMMDD)" 
  value={form.birthdate} ref={inputBirthdate} required onChange={handleChange} />

  <label className='label_email'>이메일</label>
  <input className='input_email' type="text" id="email" 
  name="email" placeholder="이메일을 입력해주세요" 
  value={form.email} ref={inputEmail} required onChange={handleChange} />
      {showAddressFields && (
        <>
          {/* 주소 입력 필드가 나타날 때만 렌더링 */}
          <label className="label_selectedaddress">주소</label>
          <input
            className="input_selectedaddress"
            placeholder="주소를 입력하세요"
            type="text"
            id="selectedaddress"
            name="selectedaddress"
            value={form.selectedAddress}
            ref={inputSelectedAddress}
            onChange={handleChange}
            disabled
          />
            <label className="label_detailaddress">상세주소</label>
          <input
            className="input_detailaddress"
            placeholder="상세주소를 입력하세요"
            type="text"
            id="detailaddress"
            name="detailaddress"
            ref={inputDetailAddress}
            value={form.detailaddress}
            onChange={handleChange}
          />
        </>
      )}
  <DaumPost onAddressChange={onAddressChange} />    
  <button className={`join_button ${isFormFilled ? 'join_button_filled' : ''}`} type="submit">
    회원 가입하기
  </button>
</form>
</main>
    );
}