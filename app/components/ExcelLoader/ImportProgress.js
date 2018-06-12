import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { MdCheck } from 'react-icons/lib/md';
import styled from 'styled-components';
import ImportNotification from './ImportNotification';
import { messageTypes } from './constants';

const OkButton = styled(RaisedButton)`
  margin-top: 5%;
  margin-left: 2%;
`;

export default ({ notifications, isImported, onRequestClose }) => (
  <Dialog
    title={`Imported ${notifications.filter((notification) => notification.type === messageTypes.SUCCESS).length} of ${notifications.length}`}
    modal={false}
    open={isImported}
    onRequestClose={onRequestClose}
    autoScrollBodyContent
  >
    {notifications.map((notification) => (
      <ImportNotification className="row" color={notification.type} key={Math.random() * 1000}>
        <div className="col-lg-6 col-md-6">{notification.title}</div>
        <div className="col-lg-6 col-md-6">{notification.error || <MdCheck />}</div>
      </ImportNotification>
    ))}
    <div className="row">
      <OkButton
        label="Ok"
        primary
        className="btn-w-md"
        onClick={onRequestClose}
      />
    </div>
  </Dialog>
);
