import React from 'react';
import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from 'moment';
import { MdArrowBack } from 'react-icons/lib/md';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import IconButton from 'material-ui/IconButton';
import { withApollo, graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import SubmitButton from 'components/SubmitButton';
import CircularProgress from 'components/LoadingIndicator';
import SelectPlace from 'components/SelectPlace';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

import { InsertSenderWarehouseQuery } from '../graph';

const ShortField = styled(TextField)`
  width: 10%;
  margin-right: 5%;
`;

const addSenderWarehouseOptions = {
  props: ({ mutate }) => ({
    submit: (warehouse) => mutate({
      variables: { warehouse },
    }),
  }),
};

const mapStateToProps = (state) => ({
  address: state.get('place').address,
  position: state.get('place').position,
});

export default compose(
    withRouter,
    withApollo,
    connect(mapStateToProps, null),
    graphql(InsertSenderWarehouseQuery, addSenderWarehouseOptions),
    withStateHandlers(
      () => ({
        warehouse: {
          title: '',
          area: 0,
          gatesAmount: 0,
        },
        isMapSwitched: false,
      }),
      {
        onSwitchMap: () => (isMapSwitched) => ({
          isMapSwitched,
        }),
        onSetField: (state) => ({ target: { name, value } }) => ({
          warehouse: {
            ...state.warehouse,
            [name]: value,
          },
        }),
      },
    ),
    withHandlers({
      onAddHandler: ({ submit, warehouse, history, address, position }) => async () => {
        const newWarehouse = {
          ...warehouse,
          address,
          gatesAmount: +warehouse.gatesAmount,
          area: +warehouse.area,
          latitude: position.lat,
          longitude: position.lng,
        };
        console.log(newWarehouse);
        // await submit(warehouse);
        // history.push('/warehouses');
      },
      onCancelHandler: ({ history }) => () => {
        history.push('/warehouses');
      },
      validateWarehouse: ({ warehouse }) => () => {
        for (const i in warehouse) {
          if (!warehouse[i]) {
            return false;
          }
        }
        return true;
      },
    }),
    branch(
        ({ isLoadingData }) => isLoadingData,
        renderComponent(CircularProgress)
    ),
)(({ address, position, onSwitchMap, isMapSwitched, warehouse, onSetField, validateWarehouse, onAddHandler }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>Додати склад</title>
    </Helmet>
    <article className="article">
      <div className="row">
        <IconButton className="col-xl-1 col-md-1 col-sm-1" style={{ alignSelf: 'flex-end', display: 'flex' }}>
          <Link to="/clients">
            <FontIcon color="#000" className="material-icons"><MdArrowBack /></FontIcon>
          </Link>
        </IconButton>
        <h2 className="article-title col-xl-9 col-md-9 col-sm-9">
          Додати склад
        </h2>
        <div
          className="col-xl-2 col-md-2 col-sm-2"
          style={{ alignSelf: 'center', display: 'flex', justifyContent: 'flex-end' }}
        >
          {
            (!isMapSwitched) ? (
              <RaisedButton
                labelColor="#fff"
                primary
                onClick={() => onSwitchMap(true)}
                disabled={!address || (!position.lat || !position.lng)}
              >
                  Далі
                </RaisedButton>
            ) : null
          }
        </div>
      </div>
      {
        (isMapSwitched) ? (
          <div className="box box-default col-xl-6">
            <div className="box-body">
              <form>
                <TextField
                  floatingLabelText="Назва"
                  onChange={onSetField}
                  name="title"
                  value={warehouse.title}
                  fullWidth
                />
                <ShortField
                  floatingLabelText="Площа"
                  onChange={onSetField}
                  name="area"
                  value={warehouse.area}
                />
                <ShortField
                  floatingLabelText="Місця розвантаження"
                  onChange={onSetField}
                  name="gatesAmount"
                  value={warehouse.gatesAmount}
                />
              </form>
              <SubmitButton
                label="Зберегти"
                onClickHandler={onAddHandler}
                isDisabled={!validateWarehouse()}
              />
            </div>
          </div>
        ) : <SelectPlace />
      }
    </article>
  </section>
));
