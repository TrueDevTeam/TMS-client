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
import REGIONS from 'constants/regions';

import { InsertDriverQuery } from '../graph';

const addDriverOptions = {
  props: ({ mutate }) => ({
    submit: (driver) => mutate({
      variables: { driver },
    }),
  }),
};

export default compose(
    withRouter,
    withApollo,
    graphql(InsertDriverQuery, addDriverOptions),
    withStateHandlers(
      () => ({
        driver: {
          fullName: '',
          birthday: moment().utc(),
          taxpayerId: '',
          region: '',
          imageUrl: 'exampleImageUrl',
        },
        isLoadingData: false,
      }),
      {
        onSetField: (state) => ({ target: { name, value } }) => ({
          driver: {
            ...state.driver,
            [name]: value,
          },
        }),
        onSetDriver: () => (driver) => ({
          driver,
        }),
        onToggleLoadingState: ({ isLoadingData }) => () => ({
          isLoadingData: !isLoadingData,
        }),
        onSetDate: (state) => (birthday) => ({
          driver: {
            ...state.driver,
            birthday,
          },
        }),
        onSetRegion: (state) => (name, value) => ({
          driver: {
            ...state.driver,
            [name]: value,
          },
        }),
      },
    ),
    withHandlers({
      onAddHandler: ({ submit, driver, history }) => async () => {
        await submit(driver);
        history.push('/drivers');
      },
      onEditHandler: () => () => {

      },
      onCancelHandler: ({ history }) => () => {
        history.push('/drivers');
      },
      validateDriver: ({ driver }) => () => {
        for (const i in driver) {
          if (!driver[i]) {
            return false;
          }
        }
        return true;
      },
    }),
    lifecycle({
      async componentDidMount() {
        const { match: { params: { id } }, onSetClient, client, onToggleLoadingState } = this.props;
        if (id) {
          try {
            onToggleLoadingState();
            const { data } = await client.query({
              query: ClientQuery,
              variables: {
                id,
              },
            });
            onSetClient(data.client);
            onToggleLoadingState();
          } catch (e) {
            console.log(e);
          }
        }
      },
    }),
    branch(
        ({ isLoadingData }) => isLoadingData,
        renderComponent(CircularProgress)
    ),
)((
    { driver, onSetField, onAddHandler, onEditHandler, onCancelHandler, validateDriver,
      onSetDate, onSetRegion,
    }) => (
      <section className="container-fluid with-maxwidth chapter">
        <Helmet>
          <title>{(!driver.id) ? 'Додати водія' : 'Редагувати водія'}</title>
        </Helmet>
        <article className="article">
          <div className="row">
            <IconButton style={{ alignSelf: 'flex-end', display: 'flex' }}>
              <Link to="/clients">
                <FontIcon color="#000" className="material-icons"><MdArrowBack /></FontIcon>
              </Link>
            </IconButton>
            {
          (!driver.id) ?
            <h2 className="article-title col-xl-10 col-md-10 col-sm-10">
              Додати водія
            </h2> :
            <h2 className="article-title col-xl-10 col-md-10 col-sm-10">
              Редагувати водія
            </h2>
        }
          </div>
          <div className="box box-default col-xl-6">
            <div className="box-body">
              <form>
                <TextField
                  floatingLabelText="ПІБ"
                  onChange={onSetField}
                  name="fullName"
                  value={driver.fullName}
                  fullWidth
                />
                <br />
                <TextField
                  floatingLabelText="ІНП"
                  onChange={onSetField}
                  name="taxpayerId"
                  value={driver.taxpayerId}
                  fullWidth
                />
                <br />
                <DatePicker
                  floatingLabelText="Дата народження"
                  name="birthday"
                  container="dialog"
                  defaultDate={driver.birthday.toDate()}
                  onChange={(event, date) => {
                    onSetDate(moment(date).utc());
                  }}
                />
                <br />
                <SelectField
                  onChange={(event, index, value) => onSetRegion('region', value)}
                  fullWidth
                  floatingLabelText="Регіон"
                  className="col-xs-12"
                  value={driver.region}
                >
                  {REGIONS.map((region) => (
                    <MenuItem key={region.shortCode} value={region.name} primaryText={region.name} />
                  ))}
                </SelectField>
                <br />
                <div className="row" style={{ marginTop: 20 }}>
                  <div className="col-xl-4 col-md-3 col-sm-3">
                    {
                 (!driver.id) ?
                   <SubmitButton
                     label="Зберегти"
                     onClickHandler={onAddHandler}
                     isDisabled={!validateDriver()}
                   /> :
                   <SubmitButton
                     label="Редагувати"
                     onClickHandler={onEditHandler}
                     isDisabled={!validateDriver()}
                   />
                }
                  </div>
                  <div className="col-xl-3 col-md-3 col-sm-3">
                    <FlatButton
                      label="Відміна"
                      className="btn-w-md"
                      onClick={onCancelHandler}
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
