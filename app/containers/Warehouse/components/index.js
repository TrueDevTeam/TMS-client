import React from 'react';
import PropTypes from 'prop-types';
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
} from 'recompose';
import Helmet from 'react-helmet';

const Columns = [
  {
    Header: 'Назва',
    accessor: 'name',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Площа',
    accessor: 'square',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Місця розвантаження',
    accessor: 'unloadingPlaces',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Адреса',
    accessor: 'address',
    style: { textAlign: 'left' },
  },
  {
    Header: '',
    sortable: false,
    Cell: () => <MdEdit />,
    width: 50,
  },
];

export default compose(
  // history.push(location.state.from.pathname);
  withRouter,
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
)(({ warehouses, onEditClick }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>Склади</title>
    </Helmet>
    <article className="article">
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="article-title col-sm-9">Склади</h2>
        <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <RaisedButton
            containerElement={<Link to="warehouses/add" />}
            label="Додати склад"
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
          defaultPageSize={10}
          data={warehouses}
          columns={Columns}
          showPagination={false}
          noDataText="No data"
          manual
        />
      </section>
    </article>
  </section>
));
