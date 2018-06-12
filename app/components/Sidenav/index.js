import React from 'react';
import logo from 'assets/logo.svg';
import SidenavContent from './SidenavContent';

class Sidebar extends React.Component {
  render() {
    return (
      <nav className="app-sidebar bg-color-dark">
        <section className="sidebar-header bg-color-light">
          <img src={logo} alt="swevo" />
          <h3 style={{ margin: '5% 0 0 0', color: 'teal' }}>TMS</h3>
        </section>

        <section className="sidebar-content">
          <SidenavContent />
        </section>
      </nav>
    );
  }
}

export default Sidebar;
