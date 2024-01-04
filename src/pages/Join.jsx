import React from "react";
import {useState, useRef} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DaumPost from "../components/common/DaumPost";

export default function Join(){  
  const navigate = useNavigate();
  const [form, setForm ] = useState({name:'',userid:'', password:'',confirmpassword:'', phone:'',birthdate:'',email:'',selectedAddress:'',detailaddress:''});
  const [showAddressFields, setShowAddressFields] = useState(false);
  const onAddressChange = (address) => {
    setForm((prevForm) => ({
      ...prevForm,
      selectedAddress: address,
    }));
    // 주소가 선택되면 입력 필드 나타나게 설정
    setShowAddressFields(true);
  };
  //아이디 중복체크 결과출력 메시지
  const [checkError, setCheckError] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;  // {id:'hong'} , {name:'홍길동'}
    setForm({...form, [name]:value});

    //아이디 중복체크
    if(name === "id" && value !== ""){
      axios({
        method : "GET",
        url : `http://localhost:8000/join/${value}`
      })
      .then((result) => {
        if(result.data.cnt === 1){
          setCheckError('이미 사용중인 아이디 입니다.');
        }else{
          setCheckError('사용이 가능합니다.');
        }
      })
      .catch();
    }
  }

  const inputName = useRef(null); 
  const inputUserId = useRef(null); 
  const inputPassword = useRef(null); 
  const inputConfirmPassword = useRef(null); 
  const inputPhone = useRef(null); 
  const inputEmail = useRef(null); 
  const inputBirthdate = useRef(null); 
  const inputSelectedAddress = useRef(null); 
  const inputDetailAddress = useRef(null); 


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (checkError !== '사용이 가능합니다.') {
      alert('아이디 중복을 확인해주세요.');
      return;
    }

    //validationCheck(유효성체크)
    if(form.name === ""){
      alert("이름을 입력해주세요");
      return inputName.current.focus();
    }
    if(form.userid === ""){
      alert("아이디를 입력해주세요");
      return inputUserId.current.focus();
    }
    if(form.pass === ""){
      alert("패스워드를 입력해주세요");
      return inputPassword.current.focus();
    }
    if(form.confirmpassword === ""){
      alert("패스워드를 다시 입력해주세요");
      return inputConfirmPassword.current.focus();
    }
    if(form.phone === ""){
      alert("폰번호를 입력해주세요");
      return inputPhone.current.focus();
    }
    if(form.email === ""){
      alert("이메일를 입력해주세요");
      return inputEmail.current.focus();
    }
    if(form.selectedAddress === ""){
      alert("주소를 입력해주세요");
      return inputSelectedAddress.current.focus();
    }
    if(form.detailaddress === ""){
      alert("상세주소를 입력해주세요");
      return inputDetailAddress.current.focus();
    }


    axios({
      method:'post',
      url:'http://localhost:8000/join',
      data: form,
    })
    .then((result) =>{
      if(result.data === 'ok'){
        alert("회원등록이 완료되었습니다.");
        navigate("/login");
      }
    })
    .catch((err) => console.log(err));
  }


  const handleIdCheck = () => {
    axios
      .get(`http://localhost:8000/join/${form.userid}`)
      .then((result) => {
        if (result.data.cnt === 1) {
          setCheckError('이미 사용중인 아이디 입니다.');
        } else {
          setCheckError('사용이 가능합니다.');
        }
      })
      .catch((error) => {
        console.error('ID 확인 중 오류 발생:', error);
        // 오류 처리 (예: 오류 상태 설정)
      });
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
  <button className='join_button' type="submit">
    회원 가입하기
  </button>
</form>
</main>
    );
}