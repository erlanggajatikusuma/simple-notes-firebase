import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Dashboard from '../Dashboard';
import Register from '../Register';
import Login from '../Login';
import { Provider } from 'react-redux';
import {store} from '../../../config/redux';


function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
