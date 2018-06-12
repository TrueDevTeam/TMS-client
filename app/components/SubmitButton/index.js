import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ClipLoader } from 'react-spinners';
import {
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose';

export default compose(
    withStateHandlers(
        () => ({
          isPerformingOperation: false,
        }),
      {
        onTogglePerformingState: ({ isPerformingOperation }) => () => ({
          isPerformingOperation: !isPerformingOperation,
        }),
      },
    ),
    withHandlers({
      onSubmitHandler: ({ onClickHandler, onTogglePerformingState }) => async () => {
        onTogglePerformingState();
        await onClickHandler();
      },
    }),
)(({ label, onSubmitHandler, isDisabled, isPerformingOperation }) => (
  <div style={{ display: 'flex' }}>
    <RaisedButton
      label={label}
      primary
      onClick={onSubmitHandler}
      disabled={isDisabled || isPerformingOperation}
    />
    {
      (isPerformingOperation) ?
        <div style={{ marginLeft: '10%' }}>
          <ClipLoader
            size={30}
          />
        </div>
         : null
    }
  </div>
));
