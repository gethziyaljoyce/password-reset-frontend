import React, { useState,createContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Logged from './components/logged';
import ChangePassword from './components/changePassword';
import ForgotPassword from './components/forgotPassword';
import Email from './components/email';
import PasswordReset from './components/passwordReset';

export const context = createContext();

function App() {
  const [log, setLog] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <context.Provider value={[log,setLog]}>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/logged" component={Logged}></Route>
            <Route exact path="/users/forgot-password/:userid/:token" component={ChangePassword}></Route>
            <Route exact path="/forgot-password" component={ForgotPassword}></Route>
            <Route exact path="/email" component={Email}></Route>
            <Route exact path="/password-reset" component={PasswordReset}></Route>
            <Route exact path="/"><Redirect to="/login"></Redirect></Route>
          </context.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;