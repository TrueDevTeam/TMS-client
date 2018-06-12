import React from 'react';
import {
  compose,
  setPropTypes,
  withStateHandlers,
  mapProps,
} from 'recompose';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/lib/md';
import { FormattedMessage } from 'react-intl';
import { CirclePicker } from 'react-color';
import {
  colors,
} from '../../../graph/data/database';
import messages from './messages';
import { generateAbbr } from './utils';

const labelCancel = <FormattedMessage {...messages.cancel_button} />;
const labelSave = <FormattedMessage {...messages.save_button} />;
const formTitle = <FormattedMessage {...messages.form_title} />;
const firstnamePlaceholder = <FormattedMessage {...messages.firstname_placeholder} />;
const phonePlaceholder = <FormattedMessage {...messages.phone_placeholder} />;
const rolePlaceholder = <FormattedMessage {...messages.role_placeholder} />;
const terminalPasswordPlaceholder = <FormattedMessage {...messages.terminalPassword_placeholder} />;

export default compose(
    setPropTypes({
      onRoleChange: PropTypes.func,
      onChangeTextFiled: PropTypes.func,
      onCancelHandler: PropTypes.func,
      onSaveHandler: PropTypes.func,
      storesLoading: PropTypes.bool,
      rolesLoading: PropTypes.bool,
      user: PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.string,
        terminalPassword: PropTypes.string,
        role: PropTypes.shape({
          id: PropTypes.string,
        }),
        placesOfWork: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
        })),
      }),
    }),
    withStateHandlers(
      ({ fetchedUser }) => (
        (fetchedUser && fetchedUser.name) ? { user: fetchedUser } :
        {
          user: {
            name: '',
            abbr: '',
            color: '',
            phone: '',
            pin: '',
            roles: [],
          },
        }
      ),
      {
        onRoleChange: ({ user }) => (event, index, values) => ({
          user: {
            ...user,
            roles: values,
          },
        }),
        onChangeTextFiled: ({ user }) => ({ target: { value, name } }) => ({
          user: {
            ...user,
            [name]: value,
          },
        }),
        onNameFilled: ({ user }) => ({ target: { value } }) => ({
          user: {
            ...user,
            name: value,
            abbr: generateAbbr(value),
          },
        }),
      }
    ),
    mapProps(
      ({ roles, user, onRoleChange, onChangeTextFiled, onNameFilled, controls }) => ({
        roles: roles.filter((role) => role === 'client:manager' || role === 'client:viewer'),
        user,
        controls: {
          ...controls,
          onRoleChange,
          onChangeTextFiled,
          onNameFilled,
        },
      })
    ),
)(({ user, controls, roles }) => (
  <section className="container-fluid with-maxwidth chapter">
    <article className="article row">
      <IconButton
        style={{ alignSelf: 'flex-end', display: 'flex', padding: 0 }}
      >
        <Link to="/employees">
          <FontIcon color="#000" className="material-icons"><MdArrowBack /></FontIcon>
        </Link>
      </IconButton>
      <h2 className="article-title col-xl-10">
        {formTitle}
      </h2>
      <div className="box box-default col-xl-6">
        <div className="box-body">
          <form>
            <TextField
              floatingLabelText={firstnamePlaceholder}
              name="name"
              type="text"
              value={user.name}
              onChange={controls.onNameFilled}
              fullWidth
            />
            <TextField
              floatingLabelText={phonePlaceholder}
              name="phone"
              type="text"
              value={user.phone}
              onChange={controls.onChangeTextFiled}
              fullWidth
            />
            <SelectField
              value={user.roles}
              onChange={controls.onRoleChange}
              floatingLabelText={rolePlaceholder}
              fullWidth
              multiple
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role} primaryText={role} insetChildren />
             ))}
            </SelectField>
            <TextField
              floatingLabelText={terminalPasswordPlaceholder}
              name="pin"
              type="text"
              value={user.pin}
              style={{ width: '20%' }}
              onChange={controls.onChangeTextFiled}
              maxLength={4}
            />
            <br />
            <h4>Background color</h4>
            <CirclePicker
              colors={colors}
              color={user.color}
              onChangeComplete={({ hex }) => controls.onChangeTextFiled({ target: { value: hex, name: 'color' } })}
            />
            <br />
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-xl-3">
                <RaisedButton
                  label={labelSave}
                  primary
                  className="btn-w-md"
                  onClick={() => controls.onSaveHandler(user)}
                />
              </div>
              <div className="col-xl-3">
                <RaisedButton
                  label={labelCancel}
                  className="btn-w-md"
                  onClick={controls.onCancelHandler}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </article>
  </section>
));
