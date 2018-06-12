import React from 'react';
import PropTypes from 'prop-types';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ImagePreview from 'react-image-preview';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import logo from 'assets/logo.svg';
import {
  compose,
  setPropTypes,
  withStateHandlers,
  withHandlers,
} from 'recompose';
import Helmet from 'react-helmet';

const PreviewWrapper = styled.div`
  margin-top: 50px;
  & img {
    width: 100%;
  }
`;

export default compose(
  withRouter,
  setPropTypes({
    onLogin: PropTypes.func,
    onSetField: PropTypes.func,
  }),
  withStateHandlers(
    () => ({
      user: {
        email: '',
        fullName: '',
        password: '',
        phoneNumber: '',
        avatarUrl: 'testUrl',
        company: {
          type: '',
          name: '',
        },
      },
    }),
    {
      onSetField: (state) => ({ target: { name, value } }) => ({
        user: {
          ...state.user,
          [name]: value,
        },
      }),
      onSetUserName: (state) => ({ target: { name, value } }) => ({
        user: {
          ...state.user,
          fullName: value,
          company: {
            ...state.user.company,
            name: value,
          },
        },
      }),
      onSetCompanyRole: (state) => (value) => ({
        user: {
          ...state.user,
          company: {
            ...state.user.company,
            type: value,
          },
        },
      }),
    }
  ),
  withHandlers({
    onRegister: ({ history, location, user }) => async () => {
      console.log(user);
      try {
        // email: 'haistler@211.com',
        // password: '1234',
        const { data: { token } } = await axios.post(`${APPCONFIG.authUrl}/register`, user);
        if (token) {
          localStorage.setItem('token', token);
          // localStorage.setItem('client', client);
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
    validateUser: ({ user }) => () => {
      for (const i in user) {
        if (i === 'company') {
          if (!user.company.name || !user.company.type) {
            return false;
          }
        }
        if (!user[i]) {
          return false;
        }
      }
      return true;
    },
  })
)(({ user, onRegister, onSetField, onSetCompanyRole, onSetUserName, validateUser }) => (
  <div className="page-login">
    <Helmet>
      <title>Реєстрація</title>
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
                    floatingLabelText="Назва"
                    name="fullName"
                    onChange={onSetUserName}
                    value={user.fullName}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Телефон"
                    name="phoneNumber"
                    onChange={onSetField}
                    value={user.phoneNumber}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    name="email"
                    onChange={onSetField}
                    type="email"
                    value={user.email}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Пароль"
                    name="password"
                    onChange={onSetField}
                    type="password"
                    value={user.password}
                    fullWidth
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    onChange={(event, index, value) => onSetCompanyRole(value)}
                    fullWidth
                    floatingLabelText="Тип компанії"
                    className="col-xs-12"
                    value={user.company.type}
                  >
                    <MenuItem key="1" value="COMPANY_SENDER" primaryText="Вантажовідправник" />
                    <MenuItem key="2" value="COMPANY_CARRIER" primaryText="Вантажоперевізник" />
                  </SelectField>
                </div>
                <div className="form-group" style={{ marginTop: 30 }}>
                  <ImagePreview
                    onChange={async (images) => {
                      const res = await axios.get(images[0]);
                      console.log(res);
                    }}
                    wrapper={(e) => (
                      <PreviewWrapper key={+new Date()}>{e}</PreviewWrapper>
                    )}
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="card-action no-border text-right">
            <RaisedButton
              onClick={onRegister}
              label="Зареєструватись"
              disabled={!validateUser()}
              primary
            />
          </div>
        </div>
      </div>
    </div>
  </div>
));
