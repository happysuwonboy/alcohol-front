import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useState, useRef } from "react";
import Cookies from 'js-cookie';

export default function Login() {
    const navigate = useNavigate();
    const inputId = useRef(null);
    const inputPass = useRef(null);

    const [loginForm, setLoginForm] = useState({id:'', pass:''});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/login', loginForm);
    
            if (response.data.login_result) {
                alert("로그인에 성공하셨습니다");
    
                // 성공 시에 상태 초기화
                setLoginForm(prevLoginForm => ({ ...prevLoginForm, id: '', pass: '' }));
    
                // 토큰 및 사용자 정보 저장
                Cookies.set("x-auth-jwt", response.data.token);
                const userInfo = jwtDecode(response.data.token);
                const { id, user_role, user_name } = userInfo;
                localStorage.setItem("userInfo", JSON.stringify({id, user_role, user_name}));
    
                const sproduct = Cookies.get("sproduct");
                if (sproduct === undefined) {
                    navigate("/");
                } else {
                    navigate(sproduct);
                }
            } else {
                if (response.data.cnt === 1) {
                    alert("패스워드가 다릅니다. 다시 확인해주세요");
                    setLoginForm(prevLoginForm => ({ ...prevLoginForm, pass: '' }));
                    return inputPass.current.focus();
                } else {
                    alert("아이디와 비밀번호가 다릅니다. 다시 확인해주세요");
                    setLoginForm({ id: '', pass: '' });
                    return inputId.current.focus();
                }
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            alert("로그인 중 오류가 발생했습니다");
        }
    }
    

    return(
        <>
            <main className="login_container">
                <div className="login_title">반가워요!🎉</div>
                <div className="login_intro">찾아오는 인생술, 술담입니다.</div>
                <form onSubmit={handleSubmit}>
                        <input className="id_input"
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            required
                            name="id"
                            value={loginForm.id}
                            ref={inputId}
                            onChange={handleChange}
                        />
                        <input className="pass_input"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            required
                            name="pass"
                            value={loginForm.pass}
                            ref={inputPass}
                            onChange={handleChange}
                        />
                        <div><button className="login_button" type="submit">로그인</button></div>
                        <div><button onClick={() => navigate("/join")} className="join_button" type="button">회원가입</button></div>
                </form>
                <div className="find_container">
                    <Link className="link_findid" to ="/find/id"><div>아이디 찾기</div></Link>
                    <Link className="link_findpw" to ="/find/pw"><div>비밀번호 찾기</div></Link>
                </div>
            </main>
        </>
    );
}