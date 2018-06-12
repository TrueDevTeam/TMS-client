import React from 'react';
import { graphql } from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import { withRouter, Link } from 'react-router-dom';
import { MdAdd, MdEdit } from 'react-icons/lib/md';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  compose,
  branch,
  renderComponent,
  withHandlers,
} from 'recompose';
import Helmet from 'react-helmet';

import CircularProgress from 'components/LoadingIndicator';
import { CarsQuery } from '../graph';

const Columns = [
  {
    Header: 'Марка',
    accessor: 'brand',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Модель',
    accessor: 'model',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Вантажопідйомність',
    accessor: 'carryingCapacity',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Типи вантажів',
    accessor: 'cargoType',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Витрати палива',
    accessor: 'fuelConsumption',
    style: { textAlign: 'left' },
  },
  {
    Header: 'Державний номер',
    accessor: 'stateNumber',
    style: { textAlign: 'left' },
  },
  {
    Header: '',
    sortable: false,
    Cell: () => <MdEdit />,
    width: 50,
  },
];

const fetchCarsOptions = {
  props: (props) => ({
    cars: props.data.allCars,
    carsLoading: props.data.loading,
  }),
  options: {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
};

export default compose(
  // history.push(location.state.from.pathname);
  withRouter,
  graphql(CarsQuery, fetchCarsOptions),
  withHandlers({
    onEditClick: ({ history }) => (state, rowInfo, column) => {
      if (column.Header !== '') {
        return {};
      }
      return {
        onClick: () => {
          history.push(`/cars/${rowInfo.original.id}`);
        },
      };
    },
  }),
  branch(({ carsLoading }) => carsLoading, renderComponent(CircularProgress)),
)(({ cars, onEditClick }) => (
  <section className="container-fluid with-maxwidth chapter">
    <Helmet>
      <title>Автопарк</title>
    </Helmet>
    <article className="article">
      <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <h2 className="article-title col-sm-9">Автопарк</h2>
        <div className="col-sm-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <RaisedButton
            containerElement={<Link to="cars/add" />}
            label="Додати авто"
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
          pageSize={cars.length}
          minRows={10}
          data={cars}
          columns={Columns}
          showPagination={false}
          noDataText="No data"
          manual
        />
      </section>
    </article>
  </section>
));
