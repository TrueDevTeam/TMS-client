import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter, Link } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/lib/md';
import { graphql } from 'react-apollo';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  compose,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import Helmet from 'react-helmet';
import CircularProgress from 'components/LoadingIndicator';

import { ClientsQuery } from '../graph';

const Columns = [
  {
    Header: 'Номер',
    accessor: 'id',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Назва',
    accessor: 'name',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Телефон',
    accessor: 'number',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Електронна пошта',
    accessor: 'email',
    style: { textAlign: 'left' },
  },
  {
    Header: '',
    sortable: false,
    Cell: () => <MdEdit style={{ cursor: 'pointer' }} />,
    width: 50,
  },
];

const fetchClientsOptions = {
  props: (props) => ({
    clients: props.data.allClients,
    clientsLoading: props.data.loading,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
};

export default compose(
  // history.push(location.state.from.pathname);
  withRouter,
  graphql(ClientsQuery, fetchClientsOptions),
  withHandlers({
    onEditClick: ({ history }) => (state, rowInfo, column) => {
      if (column.Header !== '') {
        return {};
      }
      return {
        onClick: () => {
          history.push(`/clients/${rowInfo.original.id}`);
        },
      };
    },
  }),
  branch(({ clientsLoading }) => clientsLoading, renderComponent(CircularProgress)),
)(({ clients, onEditClick }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>Клієнти</title>
    </Helmet>
    <article className="article">
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="article-title col-sm-9">Клієнти</h2>
        <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <RaisedButton
            containerElement={<Link to="clients/add" />}
            label="Додати клієнта"
            icon={<MdAdd />}
            primary
          />
        </div>
      </div>
      <section className="box box-default">
        <ReactTable
          className="-striped"
          getTdProps={onEditClick}
          style={{ textAlign: 'center' }}
          pageSize={clients.length}
          minRows={10}
          data={clients}
          columns={Columns}
          showPagination={false}
          noDataText="No data"
          manual
        />
      </section>
    </article>
  </section>
));
