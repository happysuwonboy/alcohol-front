// PasswordReset.jsx
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const PasswordReset = ({ match }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatching, setIsMatching] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    checkMatchingPasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkMatchingPasswords(newPassword, e.target.value);
  };

  const checkMatchingPasswords = (newPassword, confirmPassword) => {
    setIsMatching(newPassword === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
  
    if (newPassword === confirmPassword) {
      try {
        console.log("Sending request to server...");
        const response = await axios.post(`http://localhost:3000/find/pw/${match.params.id}`, { userId: match.params.id, newPassword });
        
        console.log("Server response:", response.data);
  
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setMessage("비밀번호 재설정에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error sending request to server:", error);
        setMessage("서버 오류가 발생했습니다.");
      }
    } else {
      setMessage("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");const response = await axios.post(`http://localhost:3000/find/pw/${id}`, { userId: id, newPassword });
    }
  };
  

  return (
    <main className="passwordreset_frame">
      <h1 className="passwordreset_title">비밀번호 재설정</h1>
      <form className="passwordreset_form" onSubmit={handleSubmit}>
        <label className="label_password">새로운 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="input_password"
          required
        />
        <label className="label_confirmpassword">비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="input_confirmpassword"
          required
        />
        {(!isMatching || !newPassword || !confirmPassword) && (newPassword || confirmPassword) && <p className="error_message">비밀번호가 일치하지 않습니다.</p>}
        <button 
        className={`edit_pass_button ${newPassword && confirmPassword && isMatching ? "enabled" : ""}`} 
        type="submit" 
        disabled={!isMatching}
        onClick={handleSubmit}
        >
          비밀번호 재설정
        </button>
      </form>
    </main>
  );
};

export default PasswordReset;
