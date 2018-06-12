import React from 'react';
import {
  compose,
  setPropTypes,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { FormattedMessage } from 'react-intl';
import * as XLSX from 'xlsx';

import Configurator from './Configurator';
import messages from './messages';

const fields = [
  'name',
  'group',
  'sku',
  'price',
  'measure',
  'tax',
];

export default compose(
    setPropTypes({
      getRandomColor: PropTypes.func,
      removeDuplicates: PropTypes.func,
      addGroupOnDemand: PropTypes.func,
      buildImportArray: PropTypes.func,
      onFileSelected: PropTypes.func,
    }),
    withStateHandlers(
      () => ({
        formedProducts: [],
        files: [],
        showConfigurator: false,
      }),
      {
        onToggleConfigurator: ({ showConfigurator }) => (formedProducts) => ({
          showConfigurator: !showConfigurator,
          formedProducts,
          files: [],
        }),
      },
    ),
    withHandlers({
      buildImportArray: ({ products }) => async (rawData) => (
          rawData
              // form an array of objects
              .map((element) => {
                const row = {};
                for (const key in element) {
                  row[fields[key]] = element[key];
                }
                return row;
              })
              // filter duplicates
              // .filter((element) => !products.length ||
              // !products.some((product) => product.name === element.name))
      ),
    }),
    withHandlers({
      onFileSelected: ({ buildImportArray, onToggleConfigurator }) => (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          const workSheetName = wb.SheetNames[0];
          const workSheet = wb.Sheets[workSheetName];
          const data = XLSX.utils.sheet_to_json(workSheet, { blankrows: false, header: 1 });
          const formedProducts = await buildImportArray(data);
          onToggleConfigurator(formedProducts);
        };
        reader.readAsBinaryString(file);
      },
    }),
)(({ onFileSelected, onToggleConfigurator, showConfigurator, formedProducts, files, products }) => (
  <RaisedButton
    label="Import from Excel"
    labelPosition="before"
    containerElement="label"
    primary
  >
    <input
      type="file"
      style={{
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }}
      value={files}
      onChange={onFileSelected}
    />
    {
      (showConfigurator) ?
        <Configurator
          showConfigurator={showConfigurator}
          toggleDialog={onToggleConfigurator}
          formedProducts={formedProducts}
          allProducts={products}
        /> : null
    }
  </RaisedButton>
));
