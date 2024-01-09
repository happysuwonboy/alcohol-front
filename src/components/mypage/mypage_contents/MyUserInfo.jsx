import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../util/getUserInfo';

export default function MyUserInfo() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({
        user_email: '',
        user_phone: '',
        user_name: '',
        user_id: '',
        address: '',
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
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'user_email') {
            if (value === '' || isValidEmail(value)) {
                setEditedUserInfo(prevState => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        }

        if (name === 'user_phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length > 11) {
                return;
            }
        }

        setEditedUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleWithdrawalClick = () => {
        const confirmWithdrawal = window.confirm('정말로 회원탈퇴하시겠습니까?');
    
        if (confirmWithdrawal) {
            const { id } = getUserInfo();
    
            if (id) {
                axios.delete(`http://localhost:8000/mypage/userinfo/${id}`)
                    .then(response => {
                        console.log(response.data);
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

        if (!isValidEmail(editedUserInfo.user_email) || editedUserInfo.user_phone.length !== 11) {
            alert('유효하지 않은 이메일 또는 전화번호입니다.');
            return;
        }

        axios.put(`http://localhost:8000/mypage/userinfo/${id}`, {
            user_email: editedUserInfo.user_email,
            user_phone: editedUserInfo.user_phone,
            rec_phone: editedUserInfo.user_phone,
        })
            .then(response => {
                setUserInfo(response.data);
                setEditMode(false);
            })
            .catch(error => console.error('서버에서 사용자 정보를 업데이트하는 중 에러 발생:', error));
    };

    return (
        <>
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
                            <button className='save_button' onClick={handleSaveClick}>저장</button>
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
                            <span className='user_code_title'>추천인코드</span>
                            <div className='user_recommender_sm_frame'>
                                <span>abcde</span>
                                <button className='code_copy_button'>복사</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='user_event_alert'>
                            <div className='user_event_title'></div>
                            <div className='user_event_comment'></div>
                            <div className='user_event_flex_frame'>
                                <div className='event_content_title' ></div>
                                <input type="text" />
                            </div>
                            <div className='user_event_flex_frame'>
                                <div className='event_content_title'></div>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <button onClick={handleWithdrawalClick}>회원탈퇴</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
