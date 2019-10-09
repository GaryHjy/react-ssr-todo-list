import React, { Component } from 'react';
import './index.less';
import LoginLayout from '@/layout/login/index';
import LoginCard from '@/components/LoginCard/index';
import { letterNumberDashUnderlinePattern } from '@/utils/pattern';

import {
  Form,
  Input,
  Button,
  Row,
  Col
} from 'antd';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur(e) {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  validateToUserName(rule, value, callback) {
    if(value && value.length < 6) {
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

  compareToFirstPassword(rule, value, callback){
    const { form } = this.props;
    if (value && value.length < 6) {
      callback('密码长度不能小于6');
    }
    if (value && value !== form.getFieldValue('password')) {
      callback('输入的密码不一致！');
    } else {
      callback();
    }
  };

  
  handleLogin() {
    const { history } = this.props;
    history.push({
      pathname: '/login'
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form  onSubmit={(e) => this.handleSubmit(e)} className='register-form'>
        <Form.Item hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '请输入正确的格式！',
              },
              {
                required: true,
                message: '请输入邮箱！',
              },
            ],
          })(<Input placeholder='请输入邮箱' />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名', whitespace: true },
              {
                validator: (...arg) => this.validateToUserName(...arg),
              }
            ],
          })(
            <Input placeholder="请输入用户名" />,
          )}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码！',
                whitespace: true
              },
              {
                validator: (...arg) => this.validateToNextPassword(...arg),
              },
            ],
          })(<Input.Password placeholder='请输入密码' />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入密码！',
              },
              {
                validator: (...arg) => this.compareToFirstPassword(...arg),
              },
            ],
          })(<Input.Password placeholder='请输入密码' onBlur={(e) => this.handleConfirmBlur(e)} />)}
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('captcha', {
                rules: [
                  { required: true, message: '请输入验证码！', whitespace: true }
                ],
              })(<Input placeholder='请输入验证码' />)}
            </Col>
            <Col span={8}>
              
            </Col>
          </Row>
        </Form.Item>
        <Form.Item className="register-form__buttons">
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <Button onClick={() => this.handleLogin()}>
            已有账号，登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

RegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

class Register extends Component {
  render() {
    return (
      <div className="register-container center">
        <LoginCard title="用户注册">
          <RegistrationForm {...this.props} />
        </LoginCard>
      </div>
    );
  }
}

Register.Layout = LoginLayout;

export default Register;
