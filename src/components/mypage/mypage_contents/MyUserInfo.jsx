import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../util/getUserInfo';
import useToast from '../../../hooks/useToast.jsx';

export default function MyUserInfo() {
    const [AgreeToast, showAgreeToast] = useToast('이벤트 정보 수신에 동의하셨습니다', 'success');
    const [CancelToast, showCancelToast] = useToast('이벤트 정보 수신에 동의 해제 하셨습니다', 'success');
    const [passwordMatch, setPasswordMatch] = useState(true);    
    const [isToggleOn, setIsToggleOn] = useState(false);

    const handleToggleClick = () => {
        if (isToggleOn) {
            cancelAlert();
        } else {
            agreeAlert();
        }
        setIsToggleOn(!isToggleOn);
    };

    const agreeAlert = () => showAgreeToast();
    const cancelAlert = () => showCancelToast();
    
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({
        user_email: '',
        user_phone: '',
        user_name: '',
        user_id: '',
        address: '',
        user_password: '', // 추가: 비밀번호 입력 필드
        user_confirmpassword: '', // 추가: 비밀번호 확인 입력 필드
    });

    useEffect(() => {
        const { id } = getUserInfo();

        if (id) {
            axios.get(`http://localhost:8000/mypage/userinfo/${id}`)
                .then(response => setUserInfo(response.data))
                .catch(error => console.error('서버에서 사용자 정보를 가져오는 중 에러 발생:', error));
        }
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        setEditedUserInfo({
            user_email: userInfo.user_email,
            user_phone: userInfo.user_phone,
            user_name: userInfo.user_name,
            user_id: userInfo.user_id,
            address: userInfo.address,
            user_password: '', // 추가: 비밀번호 초기화
            user_confirmpassword: '', // 추가: 비밀번호 확인 초기화
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'user_email') {
            // 이메일 유효성 검사
            if (value === '' || isValidEmail(value)) {
                setEditedUserInfo(prevState => ({ ...prevState, [name]: value }));
            }
        }
    
        if (name === 'user_phone') {
            // 전화번호 입력 제한
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length > 11) {
                return;
            }
        }
    
        if (name === 'user_password' || name === 'user_confirmpassword') {
            // 비밀번호와 확인 비밀번호가 일치하는지 확인
            const otherField = name === 'user_password' ? 'user_confirmpassword' : 'user_password';
            const match = value === editedUserInfo[otherField];
    
            // 비밀번호 일치 여부 업데이트
            setPasswordMatch(match);
        }
    
        // 입력 내용 업데이트
        setEditedUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleWithdrawalClick = () => {
        const confirmWithdrawal = window.confirm('정말로 회원탈퇴하시겠습니까?');
    
        if (confirmWithdrawal) {
            const { id } = getUserInfo();
    
            if (id) {
                axios.delete(`http://localhost:8000/mypage/userinfo/${id}`)
                    .then(response => {
                        //console.log(response.data);
                        // 쿠키 삭제
                        document.cookie = "x-auth-jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;";
                        // 로컬 스토리지 삭제
                        localStorage.clear();
                        // 페이지 이동
                        navigate('/');
                    })
                    .catch(error => console.error('서버에서 사용자 정보를 삭제하는 중 에러 발생:', error));
            }
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSaveClick = () => {
        const { id } = getUserInfo();

        // 비밀번호 유효성 검사
        if (editedUserInfo.user_password !== editedUserInfo.user_confirmpassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!isValidEmail(editedUserInfo.user_email) || editedUserInfo.user_phone.length !== 11) {
            alert('유효하지 않은 이메일 또는 전화번호입니다.');
            return;
        }

        axios.put(`http://localhost:8000/mypage/userinfo/${id}`, {
            user_email: editedUserInfo.user_email,
            user_phone: editedUserInfo.user_phone,
            rec_phone: editedUserInfo.user_phone,
            user_password: editedUserInfo.user_password, // 추가: 비밀번호 전달
        })
            .then(response => {
                setUserInfo(response.data);
                setEditMode(false);
            })
            .catch(error => console.error('서버에서 사용자 정보를 업데이트하는 중 에러 발생:', error));
    };


    return (
        <div className='my_user_info_whole_frame'>
            <div className='my_user_info'>
                <div className="my_user_title">
                    <span className="user_info_title">회원정보</span>
                    {!editMode && <button className="user_info_edit" onClick={handleEditClick}>수정</button>}
                </div>
                <div>
                    {editMode ? (
                        <>
                            <div className="user_info_name">
                                <span className="user_info_detail_title">회원명</span>
                                <span className="user_info_content">{userInfo.user_name}</span>
                            </div>
                            <div className="user_info_id">
                                <span className="user_info_detail_title">아이디</span>
                                <span className="user_info_content">{userInfo.user_id}</span>
                            </div>
                            <div className="user_info_password">
                                <span className="user_info_detail_title">비밀번호</span>
                                <input
                                    type="password"
                                    name="user_password"
                                    
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="user_info_confirmpassword">
                                <span className="user_info_detail_title">비밀번호확인</span>
                                <div className='confirmpassword_sm_frame'>
                                    <input
                                        type="password"
                                        name="user_confirmpassword"
                                        
                                        onChange={handleInputChange}
                                    />
                                    {!passwordMatch && <p className='confirm_comment'>비밀번호가 일치하지 않습니다.</p>}
                                </div>
                            </div>
                            <div className="user_info_email">
                                <span className="user_info_detail_title">이메일</span>
                                <input
                                    type="text"
                                    name="user_email"
                                    value={editedUserInfo.user_email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="user_info_phone">
                                <span className="user_info_detail_title">전화번호</span>
                                <input
                                    type="text"
                                    name="user_phone"
                                    value={editedUserInfo.user_phone}
                                    onChange={handleInputChange}
                                    maxLength={11}
                                />
                            </div>
                            <div className="user_info_address">
                                <span className="user_info_detail_title">주소</span>
                                <span className="user_info_content">{userInfo.address}</span>
                            </div>
                            <div className='button_flex_frame'>
                                <button className='save_button' onClick={handleSaveClick}>저장</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="user_info_name">
                                <span className="user_info_detail_title">회원명</span>
                                <span className="user_info_content">{userInfo.user_name}</span>
                            </div>
                            <div className="user_info_id">
                                <span className="user_info_detail_title">아이디</span>
                                <span className="user_info_content">{userInfo.user_id}</span>
                            </div>
                            <div className="user_info_email">
                                <span className="user_info_detail_title">이메일</span>
                                <span className="user_info_content">{userInfo.user_email}</span>
                            </div>
                            <div className="user_info_phone">
                                <span className="user_info_detail_title">전화번호</span>
                                <span className="user_info_content">{userInfo.user_phone}</span>
                            </div>
                            <div className="user_info_address">
                                <span className="user_info_detail_title">주소</span>
                                <span className="user_info_content">{userInfo.address}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {!editMode && (
                <div>
                    <div className='user_recommender'>
                        <div className='user_recommender_title'>
                            <span className='user_code_title'>나의 추천인 코드</span>
                            <div className='user_recommender_sm_frame'>
                                <span>abcde</span>
                                <button className='code_copy_button'>복사</button>
                            </div>
                        </div>
                    </div>
                    <div className='user_event_alert'>
                        <div className='user_event_title'>혜택 및 이벤트 알림</div>
                        <div className='user_event_comment'>할인 쿠폰 및 이벤트 정보를 가장 먼저 알려 드려요</div>
                        <div className='user_event_flex_frame flex_frame_top'>
                            <div className='event_content_title'>이메일 수신 동의</div>
                            <div className='toggle_frame'>
                                <input className='toggle_input' type="checkbox" id ="toggle-slider1" />
                                <label onClick={handleToggleClick} className='toggle_label' for="toggle-slider1">on/off</label>
                            </div>
                        </div>
                        <div className='user_event_flex_frame'>
                            <div className='event_content_title'>문자 수신 동의</div>
                            <div className='toggle_frame'>
                                <input className='toggle_input' type="checkbox" id ="toggle-slider2" />
                                <label onClick={handleToggleClick} className='toggle_label' for="toggle-slider2">on/off</label>
                            </div>
                            <CancelToast />
                            <AgreeToast />
                        </div>
                    </div>
                    <div className='cancel_button_frame'>
                            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
                    </div>                    
                </div>
            )}
        </div>
    );
}

