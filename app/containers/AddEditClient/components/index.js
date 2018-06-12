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
import RaisedButton from 'material-ui/RaisedButton';
import { MdArrowBack } from 'react-icons/lib/md';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import IconButton from 'material-ui/IconButton';
import { withApollo, graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import SubmitButton from 'components/SubmitButton';
import CircularProgress from 'components/LoadingIndicator';

import { InsertClientQuery, ClientQuery } from '../graph';

const addClientOptions = {
  props: ({ mutate }) => ({
    submit: (client) => mutate({
      variables: { client },
    }),
  }),
};

export default compose(
    withRouter,
    withApollo,
    graphql(InsertClientQuery, addClientOptions),
    withStateHandlers(
      () => ({
        clientData: {
          name: '',
          number: '',
          email: '',
        },
        isLoadingData: false,
      }),
      {
        onSetField: (state) => ({ target: { name, value } }) => ({
          clientData: {
            ...state.clientData,
            [name]: value,
          },
        }),
        onSetClient: () => (clientData) => ({
          clientData,
        }),
        onToggleLoadingState: ({ isLoadingData }) => () => ({
          isLoadingData: !isLoadingData,
        }),
      },
    ),
    withHandlers({
      onAddHandler: ({ submit, clientData, history }) => async () => {
        await submit(clientData);
        history.push('/clients');
      },
      onEditHandler: () => () => {

      },
      onCancelHandler: ({ history }) => () => {
        history.push('/clients');
      },
      validateClient: ({ clientData }) => () => {
        for (const i in clientData) {
          if (!clientData[i]) {
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
)(({ clientData, onSetField, onAddHandler, onEditHandler, onCancelHandler, validateClient }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>{(!clientData.id) ? 'Додати клієнта' : 'Редагувати клієнта'}</title>
    </Helmet>
    <article className="article">
      <div className="row">
        <IconButton style={{ alignSelf: 'flex-end', display: 'flex' }}>
          <Link to="/clients">
            <FontIcon color="#000" className="material-icons"><MdArrowBack /></FontIcon>
          </Link>
        </IconButton>
        {
          (!clientData.id) ?
            <h2 className="article-title col-xl-10 col-md-10 col-sm-10">
              Додати клієнта
            </h2> :
            <h2 className="article-title col-xl-10 col-md-10 col-sm-10">
              Редагувати клієнта
            </h2>
        }
      </div>
      <div className="box box-default col-xl-6">
        <div className="box-body">
          <form>
            <TextField
              floatingLabelText="Назва"
              onChange={onSetField}
              name="name"
              value={clientData.name}
              fullWidth
            />
            <br />
            <TextField
              floatingLabelText="Телефон"
              onChange={onSetField}
              name="number"
              value={clientData.number}
              fullWidth
            />
            <br />
            <TextField
              floatingLabelText="Email"
              onChange={onSetField}
              name="email"
              type="email"
              value={clientData.email}
              fullWidth
            />
            <br />
            <div className="row" style={{ marginTop: 20 }}>
              <div className="col-xl-4 col-md-3 col-sm-3">
                {
                 (!clientData.id) ?
                   <SubmitButton
                     label="Зберегти"
                     onClickHandler={onAddHandler}
                     isDisabled={!validateClient()}
                   /> :
                   <SubmitButton
                     label="Редагувати"
                     onClickHandler={onEditHandler}
                     isDisabled={!validateClient()}
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
