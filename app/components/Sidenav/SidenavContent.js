import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {
  MdStoreMallDirectory,
  MdLocalShipping,
  MdSupervisorAccount,
  MdCompareArrows,
  MdExtension,
  MdEuroSymbol,
} from 'react-icons/lib/md';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  compose,
  setPropTypes,
  withStateHandlers,
} from 'recompose';

const MenuItems = [
  {
    title: 'Перевезення',
    link: '/transportations',
    icon: <MdCompareArrows />,
    subMenu: [],
  },
  {
    title: 'Клієнти',
    link: '/clients',
    icon: <MdEuroSymbol />,
    subMenu: [],
  },
  {
    title: 'Замовлення',
    link: '/orders',
    icon: <MdExtension />,
    subMenu: [],
  },
  {
    title: 'Склади',
    link: '/warehouses',
    icon: <MdStoreMallDirectory />,
    subMenu: [],
  },
  {
    title: 'Автопарк',
    link: '/cars',
    icon: <MdLocalShipping />,
    subMenu: [],
  },
  {
    title: 'Водії',
    link: '/drivers',
    icon: <MdSupervisorAccount />,
    subMenu: [],
  },
];

const openSubmenuOnDemand = (history) => {
  const pathname = history.location.pathname;
  if (pathname.split('/').length !== 3) {
    return 0;
  }
  return MenuItems.indexOf(
      MenuItems
        .filter((mi) => mi.subMenu.length > 0)
        .find((mi) => mi.subMenu.find((smi) => smi.link === pathname))
  );
};

export default compose(
    withRouter,
    setPropTypes({
      onClick: PropTypes.func,
    }),
    withStateHandlers(
      ({ history }) => ({
        currentNavItemIndex: openSubmenuOnDemand(history),
      }),
      {
        onClickHandler: ({ currentNavItemIndex }) => (currentIndex) => ({
          currentNavItemIndex: (currentIndex !== currentNavItemIndex) ? currentIndex : null,
        }),
      },
    ),
)(({ history }) => (
  <ul className="nav">
    {MenuItems.map((item, key) => (
      <li key={key} className={(history.location.pathname === item.link) ? 'active' : ''}>
        <FlatButton containerElement={<Link to={item.link} />}>{item.icon}<span
          className="nav-text"
        >{item.title}</span></FlatButton>
      </li>
    ))}
  </ul>
));
