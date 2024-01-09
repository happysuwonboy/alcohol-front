import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const FindId = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [foundIds, setFoundIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, "");
    setPhone(inputPhoneNumber);
  };

  const handleFindId = async () => {
    try {
      const response = await axios.post("http://localhost:8000/find/id", {
        name,
        phone,
      });
  
      if (response.status === 200) {
        const foundData = response.data.data;
  
        if (foundData.length === 0) {
          setFoundIds([]);
          setErrorMessage("No matching user found.");
          alert("해당 회원 정보가 없습니다");
        } else {
          setFoundIds(foundData);
          setErrorMessage("");
        }
      } else {
        setFoundIds([]);
        setErrorMessage("No matching user found.");
        alert("해당 회원 정보가 없습니다");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFoundIds([]);
      alert("해당 회원 정보가 없습니다");
    }
  };
  
  const handleLoginClick = () => {
    // 로그인 버튼 클릭 시 /login 경로로 이동
    navigate("/login"); // 수정
  };

  const handlePasswordClick = () => {
    // 비밀번호 찾기 버튼 클릭 시 /find/pw 경로로 이동
    navigate("/find/pw"); // 수정
  };

  return (
    <main className="findid_frame">
      <h1 className="find_title">아이디 찾기</h1>
      <form className="find_form" onSubmit={(e) => e.preventDefault()}>
        <label className={`label_name ${name && "filled"}`} htmlFor="name">
          이름
        </label>
        <input
          className="input_name"
          type="text"
          id="name"
          name="name"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={handleNameChange}
          required
        />
        <label className={`label_phone ${phone.length === 11 && "filled"}`} htmlFor="phone">
          휴대전화번호
        </label>
        <input
          className="input_phone"
          type="tel"
          id="phone"
          name="phone"
          placeholder="휴대전화번호를 입력해주세요(-)빼고"
          value={phone}
          maxLength={11}
          onChange={handlePhoneChange}
          required
        />
        <button
          className={`findid_button ${name && phone.length === 11 && "enabled"}`}
          type="button"
          onClick={handleFindId}
        >
          아이디 찾기
        </button>
      </form>

      {foundIds.length > 0 && (
  <div className="found_ids">
    <h2 className="found_ids_title">찾은 아이디</h2>
    <ul>
      {foundIds.map((idObject) => (
        <li className="found_ids_list" key={idObject.user_id}>{idObject.user_id}</li>
      ))}
    </ul>
    <div><button className="found_button_login" type="button" onClick={handleLoginClick}>로그인</button></div>
    <div><button className="found_button_password" type="button"  onClick={handlePasswordClick}>비밀번호찾기</button></div>
  </div>
)}

      {errorMessage && <p className="error_message">{errorMessage}</p>}
    </main>
  );
};

export default FindId;
