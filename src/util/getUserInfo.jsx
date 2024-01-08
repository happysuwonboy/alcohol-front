export const getUserInfo = () => {
  try {
      // localStorage에서 userInfo 가져오기
      const userInfoString = localStorage.getItem("userInfo");
      
      // userInfo가 없는 경우 빈 객체 반환
      if (!userInfoString) {
          return {};
      }

      // JSON 파싱 후 반환
      const userInfo = JSON.parse(userInfoString);
      return userInfo;
  } catch (error) {
      console.error("getUserInfo 오류:", error);
      return {};
  }
};

export default getUserInfo;

/*         

        // Call getUserInfo to get user information
        const userInfo = getUserInfo();

        console.log("로그인된 정보 :", userInfo);


        <div>
            <p>ID: {userInfo.id}</p>
            <p>User Role: {userInfo.user_role}</p>
        </div> 


        */
