import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
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
    Header: 'Номер',
    accessor: 'name',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Початкова вартість',
    accessor: 'square',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Дата пулікації',
    accessor: 'unloadingPlaces',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Дата відправлення',
    accessor: 'address',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Замовник',
    accessor: 'address',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Тип вантажу',
    accessor: 'address',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Регіон',
    accessor: 'address',
    style: { textAlign: 'left' },
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
      <title>Замовлення</title>
    </Helmet>
    <article className="article">
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="article-title col-sm-9">Замовлення</h2>
      </div>
      <section className="box box-default">
        <Tabs>
          <Tab label="Відкриті замовлення" >
            <h4 style={{ marginLeft: '2%' }}>Відкриті замовлення</h4>
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
          </Tab>
          <Tab label="Закриті замовлення" >
            <h4 style={{ marginLeft: '2%' }}>Закриті замовлення</h4>
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
          </Tab>
        </Tabs>
      </section>
    </article>
  </section>
));
