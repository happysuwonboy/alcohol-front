import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    return(
        <>
            <main className="login_container">
                <div className="login_title">반가워요!🎉</div>
                <div className="login_intro">찾아오는 인생술, 술담입니다.</div>
                <form>
                        <input className="id_input"
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            required
                        />
                        <input className="pass_input"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            required
                        />
                        <div><button className="login_button" type="button">로그인</button></div>
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