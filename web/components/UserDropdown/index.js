import React, { Component } from 'react';
import './index.less';

import { Menu, Dropdown, Icon } from 'antd';

class UserDropdown extends Component {

  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.props.onExit}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown className="user-dropdown" overlay={menu}>
        <a className="user-dropdown__link">
          <span className="user-dropdown__link--username">
            { this.props.userName}
          </span>
          <Icon className="user-dropdown__link--icon" type="caret-down" />
        </a>
      </Dropdown>
    );
  }
}

export default UserDropdown;