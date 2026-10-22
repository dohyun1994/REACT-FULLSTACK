import React, {useState} from 'react'
import axios from "axios";

// 입력한 계정 정보로 서버에 로그인을 요청합니다.
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 서버의 로그인 결과를 사용자에게 알립니다.
  const login = () => {

    const data = { username: username, password: password };
    
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      alert("Login Successful");
      console.log(response.data);

    }).catch((error) => {
      console.error('Login error:', error);
      alert("Login Failed");
    });
  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
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
