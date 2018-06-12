import React from 'react';
import { MdForward } from 'react-icons/lib/md';
import { withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const logoutLabel = <FormattedMessage {...messages.logout_label} />;

const styles = {
  logoutButton: {
    alignSelf: 'center',
    color: '#000',
  },
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  };

  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  };

  render() {
    return (
      <ul className="list-unstyled float-right">
        <li style={{ marginRight: '10px', display: 'flex' }}>
          <FlatButton
            style={styles.logoutButton}
            label={'Вийти'}
            labelPosition="before"
            onClick={this.logout}
            icon={<MdForward size={30} />}
          />
        </li>
      </ul>
    );
  }
}

export default withRouter(withApollo(NavRightList));
