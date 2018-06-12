import React from 'react';
import Loadable from 'react-loadable';
import CircularProgress from '../../components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: () => <CircularProgress />,
});
