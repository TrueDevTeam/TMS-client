import React from 'react';
import { Link } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';

class Header extends React.Component {
  render() {
    return (
      <section className="app-header">
        <div className="app-header-inner bg-color-light">
          <div className="d-lg-none d-xl-none float-left">
            <a href="javascript:;" className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2>
              <Link to="/">{APPCONFIG.brand}</Link>
            </h2>
          </div>

          <div className="top-nav-left d-none d-lg-inline-block d-xl-inline-block">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
            <NavRightList />
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
