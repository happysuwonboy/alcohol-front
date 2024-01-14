import React, { useState } from "react";
import axios from 'axios';


const FindPw = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const isEmailValid = (email) => {
    // 간단한 이메일 유효성 검사 정규식 사용
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isEmailValid(email) && userId.trim() !== "") {
      try {
        const response = await axios.post('http://localhost:8000/find/pw', { email, userId }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // 쿠키를 전송하기 위해 credentials를 true로 설정합니다.
        });
  
        const data = response.data;
  
        if (response.status === 200) {
          console.log(data.message);
          // 비밀번호 찾기가 시작되었을 때, 성공 메시지를 표시하거나 사용자를 리디렉션시킬 수 있습니다.
        } else {
          console.log(data.message);
          // 사용자를 찾지 못하거나 다른 오류가 발생한 경우, 이에 따라 처리할 수 있습니다.
        }
      } catch (error) {
        console.error('비밀번호 찾기 중 오류 발생:', error);
      }
    } else {
      console.log('이메일 또는 아이디가 유효하지 않습니다.');
    }
  };

  return (
    <main className="findpw_frame">
      <h1 className="find_title">비밀번호 찾기</h1>
      <form className="find_form" onSubmit={handleSubmit}>
        <label className={`label_userid ${userId && "filled"}`}>
          아이디
        </label>
        <input
          className="input_userid"
          type="text"
          id="userid"
          name="userid"
          placeholder="아이디를 입력해주세요"
          value={userId}
          onChange={handleUserIdChange}
          required
        />
        <label className={`label_email ${email && isEmailValid(email) && "filled"}`}>
          이메일
        </label>
        <input
          className="input_email"
          type="text"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={handleEmailChange}
          required
        />


        <button
          className={`findpw_button ${email && isEmailValid(email) && userId.trim() !== "" && "enabled"}`}
          type="submit"
          disabled={!isEmailValid(email) || userId.trim() === ""}
        >
          본인 인증하기
        </button>
      </form>
    </main>
  );
};

export default FindPw;
