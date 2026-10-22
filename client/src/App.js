import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';


// 페이지 경로와 공통 내비게이션을 구성합니다.
function App() {
  return (  
  <div className="App">
    <Router>
      <div className="navbar">
        <Link to="/">Home Page</Link>
        <Link to="/createPost">Create A Post</Link>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createPost" exact component={CreatePost} />
        <Route path="/post/:id" exact component={Post} />
        <Route path="/login" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
