import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TableComponent from './components/table-component/TableComponent';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

function App() {
  return (
    <div className="App container mt-10">
      <Router>
          <Route path="/" component={TableComponent} exact />
          <Route path="/user/:id" component={Posts} exact />
          <Route path="/post/:id" component={Post} exact />
          {/* <Route path="/homepage" render={() => this.isLoggedIn() ? (<Homepage />):( <Redirect to="/" />)} exact /> */}
        </Router>
    </div>
  );
}

export default App;
