import React, { Component } from 'react'
import { Form, Icon,  Input, Button } from 'antd';

import './index.less'
import LoginLayout from '@/layout/login/index';

const withIcon = (type) => {
  return <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />
}

class LoginForm extends Component {

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      console.log(values)
    });
  };

  handleRegister() {
    const { history } = this.props;
    history.push({
      pathname: '/register'
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名', whitespace: true }
            ],
          })(
          <Input
            prefix={withIcon('user')}
            placeholder="用户名" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码', whitespace: true }
            ],
          })(
          <Input
            prefix={withIcon('lock')}
            type="password"
            placeholder="密码" />,
          )}
        </Form.Item>
        <Form.Item className="login-form__buttons">
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button onClick={() => this.handleRegister()}>
            注册
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

LoginForm = Form.create({ name: 'login-form' })(LoginForm);

class Login extends Component {
  render() {
    return (
      <div className='login-container center'>
        <h3 className='login-container_title'>用户登录</h3>
        <LoginForm {...this.props}/>
      </div>
    )
  }
}

Login.Layout = LoginLayout;

export default Login
