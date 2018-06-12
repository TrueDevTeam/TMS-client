import React from 'react';
import PropTypes from 'prop-types';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import logo from 'assets/logo.svg';
import {
  compose,
  setPropTypes,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import Helmet from 'react-helmet';

export default compose(
  withRouter,
  setPropTypes({
    onLogin: PropTypes.func,
    onSetField: PropTypes.func,
  }),
  withStateHandlers(
    () => ({
      login: '',
      password: '',
    }),
    {
      onSetField: () => ({ target: { name, value } }) => ({
        [name]: value,
      }),
    }
  ),
  withHandlers({
    onLogin: ({ login, password, history, location }) => async () => {
      try {
        // email: 'haistler@211.com',
        // password: '1234',
        console.log(login);
        console.log(password);
        const { data: { token } } = await axios.post(`${APPCONFIG.authUrl}/login`, {
          email: login,
          password,
        });
        console.log(token);
        if (token) {
          localStorage.setItem('token', token);
          if (location.state) {
            history.push(location.state.from.pathname);
          } else {
            history.push('/');
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  })
)(({ login, password, onLogin, onSetField }) => (
  <div className="page-login">
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="main-body">
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">
            <section className="logo text-center">
              <img src={logo} alt="swevo" />
            </section>
            <form className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    name="login"
                    onChange={onSetField}
                    value={login}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    name="password"
                    onChange={onSetField}
                    type="password"
                    value={password}
                    fullWidth
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <RaisedButton
              onClick={onLogin}
              label="Log in"
              primary
            />
          </div>
        </div>
        {/* <div className="additional-info"> */}
        {/* <a href="#/sign-up">Sign up</a> */}
        {/* <span className="divider-h" /> */}
        {/* <a href="#/forgot-password">Forgot your password?</a> */}
        {/* </div> */}
      </div>
    </div>
  </div>
));
