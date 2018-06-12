import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TableRowColumn } from 'material-ui/Table';
import { compose, setPropTypes } from 'recompose';

const StyledTableRowColumn = styled(TableRowColumn) `
  text-align: right !important;
`;

// const StyledIconPencil = styled(IconPencil) `
//   cursor: pointer;
// `;

export default compose(
  setPropTypes({
    handleOnClick: PropTypes.func,
  }),
)(({ handleOnClick }) => (
  <StyledTableRowColumn>
    {/*<StyledIconPencil onClick={handleOnClick} />*/}
  </StyledTableRowColumn>
));
