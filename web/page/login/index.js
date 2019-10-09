import React, { Component } from 'react'
import { Form, Icon,  Input, Button } from 'antd';

import './index.less'
import LoginLayout from '@/layout/login/index';
import LoginCard from '@/components/LoginCard/index';
import { letterNumberDashUnderlinePattern } from '@/utils/pattern';
import { Link } from 'react-router-dom';

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

  validateToUserName(rule, value, callback) {
    if (value && value.length < 6) {
      callback('用户名长度不能小于6');
    }
    if (value && !letterNumberDashUnderlinePattern.test(value)) {
      callback('用户名只能包含数字、字母、中划线、下划线');
    }
    callback();
  }

  validateToNextPassword(rule, value, callback) {
    const { form } = this.props;
    if (value && value.length < 6) {
      callback('密码长度不能小于6');
    }
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
        <Form.Item hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名', whitespace: true },
              {
                validator: (...arg) => this.validateToUserName(...arg),
              }
            ],
          })(
          <Input
            prefix={withIcon('user')}
            placeholder="用户名" />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码', whitespace: true },
              {
                validator: (...arg) => this.validateToNextPassword(...arg),
              },
            ],
          })(
          <Input
            prefix={withIcon('lock')}
            type="password"
            placeholder="密码" />,
          )}
        </Form.Item>
        <div className='login-form__links'>
          <Link to='/retrieve-password'>忘记密码</Link>
        </div>
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
        <LoginCard title="用户登录">
          <LoginForm {...this.props} />
        </LoginCard>
      </div>
    )
  }
}

Login.Layout = LoginLayout;

export default Login
