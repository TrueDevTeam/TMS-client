import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import FontIcon from 'material-ui/FontIcon/FontIcon';
import { withRouter } from 'react-router-dom';
import { MdNotifications } from 'react-icons/lib/md';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px',
  padding: '6px',
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  };

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
          <IconMenu
            iconButtonElement={
              <IconButton
                style={HeaderIconButtonStyle}
                className="md-button header-btn"
              >
                <FontIcon color="#000" className="material-icons"><MdNotifications /></FontIcon>
              </IconButton>
            }
            onChange={this.handleChange}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            menuStyle={{ minWidth: '250px' }}
          >
          </IconMenu>
        </li>
      </ul>
    );
  }
}

export default withRouter(NavLeftList);
