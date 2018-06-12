import React from 'react';
import { graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter, Link } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/lib/md';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  compose,
  setPropTypes,
  withStateHandlers,
  withHandlers,
  branch,
  renderComponent,
} from 'recompose';
import Helmet from 'react-helmet';
import moment from 'moment';
import CircularProgress from 'components/LoadingIndicator';

import { DriversQuery } from '../graph';

const Columns = [
  {
    Header: 'ПІБ',
    accessor: 'fullName',
    style: { textAlign: 'left' },
  },
  {
    id: 'birthday',
    Header: 'Дата народження',
    accessor: (d) => moment(d.birthday).format('DD-MM-YYYY'),
    style: { textAlign: 'left' },
  },
  {
    Header: 'ІНП',
    accessor: 'taxpayerId',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Регіон',
    accessor: 'region',
    style: { textAlign: 'left' },
  },
  {
    Header: '',
    sortable: false,
    Cell: () => <MdEdit />,
    width: 50,
  },
];

const fetchDriversOptions = {
  props: (props) => ({
    drivers: props.data.allDrivers,
    driversLoading: props.data.loading,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
};

export default compose(
  // history.push(location.state.from.pathname);
  withRouter,
  graphql(DriversQuery, fetchDriversOptions),
  withHandlers({
    onEditClick: ({ history }) => (state, rowInfo, column) => {
      if (column.Header !== '') {
        return {};
      }
      return {
        onClick: () => {
          history.push(`/production/groups/${rowInfo.original._id}`);
        },
      };
    },
  }),
  branch(({ driversLoading }) => driversLoading, renderComponent(CircularProgress)),
)(({ drivers, onEditClick }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>Водії</title>
    </Helmet>
    <article className="article">
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="article-title col-sm-9">Водії</h2>
        <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <RaisedButton
            containerElement={<Link to="drivers/add" />}
            label="Додати водія"
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
          pageSize={drivers.length}
          minRows={10}
          data={drivers}
          columns={Columns}
          showPagination={false}
          noDataText="No data"
          manual
        />
      </section>
    </article>
  </section>
));
