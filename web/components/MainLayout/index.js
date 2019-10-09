import React, { Component } from 'react';
import './index.less';

import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import UserDropdown from '@/components/UserDropdown';
import SideMenu from '../SideMenu/index';

class MainLayout extends Component {

  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  handleExit() {
    console.log('handleExit')
  }

  onCollapse(collapsed) {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout className="main-layout">
        <Header className="main-layout__header">
          <div className="main-layout__header--logo">
            <h1>TodoList</h1>
          </div>
          <div className="main-layout__header--user">
            <UserDropdown userName="黄童冰" onExit={this.handleExit} />
          </div>
        </Header>
        <Layout style={{ width: '100%', height: '100%'}} >
          <Sider className="main-layout__sider" collapsible collapsed={this.state.collapsed} onCollapse={(...arg) => this.onCollapse(...arg)}>
            <SideMenu />
          </Sider>
          <Layout className="main-layout__content">
            <Header className="main-layout__content--header">Header</Header>
            <Content className="main-layout__content--content">
              <div style={{ minHeight:'100%', padding: 20,  backgroundColor: '#fff' }}>
                {this.props.children}
              </div>
            </Content>
            <Footer className="main-layout__content--footer">TodoList ©2019 Created by Gary</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;