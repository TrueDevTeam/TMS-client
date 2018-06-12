import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, setPropTypes } from 'recompose';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const labelCancel = <FormattedMessage {...messages.cancel_button} />;

const CancelButton = styled(RaisedButton)`
  width: 130px;
`;

export default compose(
  setPropTypes({
    onClick: PropTypes.func,
  }),
)(({ onClick }) => (
  <CancelButton label={labelCancel} onClick={onClick} secondary />
));
