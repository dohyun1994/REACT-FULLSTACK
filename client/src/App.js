import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';

// 페이지 경로와 공통 내비게이션을 구성합니다.
function App() {
  return (  
  <div className="App">
    <Router>
      <Link to="/createPost">Create A Post</Link>
      <Link to="/">Home Page</Link>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createPost" exact component={CreatePost} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
