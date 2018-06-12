import React from 'react';
import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { MdArrowBack } from 'react-icons/lib/md';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import IconButton from 'material-ui/IconButton';
import { withApollo, graphql } from 'react-apollo';
import Helmet from 'react-helmet';

import { InsertCarQuery, CarQuery } from '../graph';

const addCarOptions = {
  props: ({ mutate }) => ({
    submit: (car) => mutate({
      variables: { car },
    }),
  }),
};

export default compose(
    withRouter,
    withApollo,
    graphql(InsertCarQuery, addCarOptions),
    withStateHandlers(
      () => ({
        car: {
          brand: '',
          model: '',
          carryingCapacity: 0,
          fuelConsumption: 0,
          stateNumber: '',
          cargoType: 'any',
        },
      }),
      {
        onInfoFilled: ({ car }) => ({ target: { name, value } }) => ({
          car: {
            ...car,
            [name]: value,
          },
        }),
        onSetCar: () => (editedCar) => ({
          car: editedCar,
        }),
      },
    ),
    withHandlers({
      onAddHandler: ({ submit, car, history }) => async () => {
        await submit(car);
        history.push('/cars');
      },
      onEditHandler: () => () => {

      },
      onCancelHandler: ({ history }) => () => {
        history.push('/cars');
      },
      validateClient: ({ car }) => () => {
        for (const i in car) {
          if (!car[i]) {
            return false;
          }
        }
        return true;
      },
    }),
    lifecycle({
      async componentDidMount() {
        const { match: { params: { id } }, onSetCar, client } = this.props;
        if (id) {
          try {
            const { data } = await client.query({
              query: CarQuery,
              variables: {
                id,
              },
            });
            onSetCar(data.car);
          } catch (e) {
            console.log(e);
          }
        }
      },
    }),
)(({ car, onInfoFilled, onAddHandler, onCancelHandler }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>{(!car._id) ? 'Додати автомобіль' : 'Редагувати автомобіль'}</title>
    </Helmet>
    <article className="article">
      <div className="row">
        <IconButton style={{ alignSelf: 'flex-end', display: 'flex' }}>
          <Link to="/cars">
            <FontIcon color="#000" className="material-icons"><MdArrowBack /></FontIcon>
          </Link>
        </IconButton>
        {
          (!car._id) ?
            <h2 className="article-title col-xl-10">
              Додати автомобіль
            </h2> :
            <h2 className="article-title col-xl-10">
              Редагувати автомобіль
            </h2>
        }
      </div>
      <div className="box box-default col-xl-6">
        <div className="box-body">
          <form>
            <TextField
              floatingLabelText="Марка"
              name="brand"
              onChange={onInfoFilled}
              value={car.brand}
              fullWidth
            />
            <br />
            <TextField
              floatingLabelText="Модель"
              name="model"
              onChange={onInfoFilled}
              value={car.model}
              fullWidth
            />
            <br />
            <TextField
              floatingLabelText="Державний номер"
              name="stateNumber"
              onChange={onInfoFilled}
              value={car.stateNumber}
              fullWidth
            />
            <br />
            <div className="row">
              <div className="col-md-6">
                <TextField
                  floatingLabelText="Вантажопідйомність"
                  name="carryingCapacity"
                  style={{ width: '60%' }}
                  onChange={onInfoFilled}
                  value={car.carryingCapacity}
                />
                <span>т.</span>
              </div>
              <div className="col-md-6">
                <TextField
                  floatingLabelText="Витрати палива"
                  name="fuelConsumption"
                  style={{ width: '60%' }}
                  onChange={onInfoFilled}
                  value={car.fuelConsumption}
                />
                <span>л/км</span>
              </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-xs-3">
                {
                 (!car._id) ?
                   <RaisedButton
                     label="Зберегти"
                     onClick={onAddHandler}
                     primary
                     className="btn-w-md"
                   /> :
                   <RaisedButton
                     label="Редагувати"
                     primary
                     className="btn-w-md"
                   />
                }
              </div>
              <div className="col-xs-3">
                <FlatButton
                  label="Відміна"
                  onClick={onCancelHandler}
                  className="btn-w-md"
                />
              </div>
            </div>
            <div className="divider" />
          </form>
        </div>
      </div>
    </article>
  </section>
));
