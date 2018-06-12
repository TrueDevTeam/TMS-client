/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import WarehousePage from 'containers/Warehouse/Loadable';
import AddWarehousePage from 'containers/AddWarehouse/Loadable';
import DriverPage from 'containers/Driver/Loadable';
import ClientPage from 'containers/Client/Loadable';
import CarPage from 'containers/Car/Loadable';
import TransportationPage from 'containers/Transportation/Loadable';
import OrderPage from 'containers/Order/Loadable';
import AddEditCarPage from 'containers/AddEditCar/Loadable';
import AddEditClientPage from 'containers/AddEditClient/Loadable';
import AddEditDriverPage from 'containers/AddEditDriver/Loadable';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';

export default function App() {
  const apolloClient = (localStorage.getItem('token')) ? require('../../apollo').apolloClient : null;
  // nav-collapsed
  return (localStorage.getItem('token') ? (
    <ApolloProvider client={apolloClient}>
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height">
                <Switch>
                  <Redirect from="/" exact to="/warehouses" />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/register" component={RegisterPage} />
                  <PrivateRoute exact path="/warehouses" component={WarehousePage} />
                  <PrivateRoute exact path="/warehouses/add" component={AddWarehousePage} />
                  <PrivateRoute exact path="/drivers" component={DriverPage} />
                  <PrivateRoute exact path="/drivers/add" component={AddEditDriverPage} />
                  <PrivateRoute exact path="/drivers/:id" component={AddEditDriverPage} />
                  <PrivateRoute exact path="/transportations" component={TransportationPage} />
                  <PrivateRoute exact path="/orders" component={OrderPage} />
                  <PrivateRoute exact path="/cars" component={CarPage} />
                  <PrivateRoute exact path="/cars/add" component={AddEditCarPage} />
                  <PrivateRoute exact path="/cars/:id" component={AddEditCarPage} />
                  <PrivateRoute exact path="/clients" component={ClientPage} />
                  <PrivateRoute exact path="/clients/add" component={AddEditClientPage} />
                  <PrivateRoute exact path="/clients/:id" component={AddEditClientPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </div>
            </div>

            <Footer />
          </div>
        </section>
      </div>
    </ApolloProvider>
      ) : (
        <Switch>
          <Redirect from="/" exact to="/warehouses" />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute exact path="/warehouses" component={WarehousePage} />
          <PrivateRoute exact path="/warehouses/add" component={AddWarehousePage} />
          <PrivateRoute exact path="/drivers" component={DriverPage} />
          <PrivateRoute exact path="/drivers/add" component={AddEditDriverPage} />
          <PrivateRoute exact path="/drivers/:id" component={AddEditDriverPage} />
          <PrivateRoute exact path="/transportations" component={TransportationPage} />
          <PrivateRoute exact path="/orders" component={OrderPage} />
          <PrivateRoute exact path="/cars" component={CarPage} />
          <PrivateRoute exact path="/cars/add" component={AddEditCarPage} />
          <PrivateRoute exact path="/cars/:id" component={AddEditCarPage} />
          <PrivateRoute exact path="/clients" component={ClientPage} />
          <PrivateRoute exact path="/clients/add" component={AddEditClientPage} />
          <PrivateRoute exact path="/clients/:id" component={AddEditClientPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )
  );
}
