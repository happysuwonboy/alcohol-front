import React, { useState } from "react";

const FindId = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, "");
    let formattedPhoneNumber = "";

    if (inputPhoneNumber.length <= 3) {
      formattedPhoneNumber = inputPhoneNumber;
    } else if (inputPhoneNumber.length <= 7) {
      formattedPhoneNumber = `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3)}`;
    } else {
      formattedPhoneNumber = `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3, 7)}-${inputPhoneNumber.slice(7, 11)}`;
    }

    setPhone(formattedPhoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 아이디 찾기에 필요한 로직을 수행
    console.log("아이디 찾기 버튼이 클릭되었습니다.");
  };

  return (
    <main className="findid_frame">
      <h1 className="find_title">아이디 찾기</h1>
      <form className="find_form" onSubmit={handleSubmit}>
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
          onChange={handlePhoneChange}
          required
        />
        <button
          className={`findid_button ${name && phone.length === 13 && "enabled"}`}
          type="submit"
        >
          아이디 찾기
        </button>
      </form>
    </main>
  );
};

export default FindId;
