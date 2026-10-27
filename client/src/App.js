import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect} from "react";
import axios from "axios";


// 페이지 경로를 구성하고 인증 상태를 앱 전체에 제공합니다.
function App() {
  const [authState, setAuthState] = useState(false);

  // 저장된 JWT를 서버에서 검증해 새로고침 후에도 로그인 상태를 복원합니다.
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  return (  
  <div className="App">
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="navbar">
          <Link to="/">Home Page</Link>
          <Link to="/createPost">Create A Post</Link>
          {!authState && (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              )}
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createPost" exact component={CreatePost} />
          <Route path="/post/:id" exact component={Post} />
          <Route path="/login" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  </div>
  );
}

export default App;
