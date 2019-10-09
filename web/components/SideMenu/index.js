import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;


class SideMenu extends Component {

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        onClick={(...arg) => this.handleClick(...arg)}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="carry-out" theme="twoTone" />
              <span>代办事件</span>
            </span>
          }
        >
          <Menu.Item key="1">列表</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="setting" theme="twoTone" />
              <span>设置</span>
            </span>
          }
        >
          <Menu.Item key="5">个人信息</Menu.Item>
          <Menu.Item key="6">提醒设置</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SideMenu;