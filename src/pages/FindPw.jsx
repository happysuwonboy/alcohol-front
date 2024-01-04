import React, { useState } from "react";

const FindPw = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = (email) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid(email)) {
      // TODO: 비밀번호 찾기에 필요한 로직을 수행
      console.log("비밀번호 찾기 버튼이 클릭되었습니다.");
    } else {
      console.log("유효하지 않은 이메일 형식입니다.");
    }
  };

  return (
    <main className="findpw_frame">
      <h1 className="find_title">비밀번호 찾기</h1>
      <form className="find_form" onSubmit={handleSubmit}>
        <label className={`label_email ${email && isEmailValid(email) && "filled"}`} htmlFor="email">
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
          className={`findpw_button ${email && isEmailValid(email) && "enabled"}`}
          type="submit"
          disabled={!isEmailValid(email)}
        >
          본인 인증하기
        </button>
      </form>
    </main>
  );
};

export default FindPw;
