import React, { useState, useContext } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

// 입력한 계정 정보로 서버에 로그인을 요청합니다.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const history = useHistory();

  // 로그인 API를 호출하고 성공하면 JWT와 인증 상태를 저장한 뒤 홈으로 이동합니다.
  const login = () => {

    const data = { username: username, password: password };
    
    axios.post("http://localhost:3001/auth/login", data).then((response) => {

      if (response.data.error) {
        alert(response.data.error);

      } else {
        localStorage.setItem("accessToken", response.data);
        alert("로그인 성공!");
        setAuthState(true);
        history.push("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        name="username"
        autoComplete="username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
}
  
export default Login
