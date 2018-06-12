import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, setPropTypes } from 'recompose';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const labelSubmit = <FormattedMessage {...messages.save_button} />;

const SaveButton = styled(RaisedButton)`
  width: 130px;
`;

export default compose(
  setPropTypes({
    onClick: PropTypes.func,
  }),
)(({ onClick }) => (
  <SaveButton label={labelSubmit} onClick={onClick} primary />
));
