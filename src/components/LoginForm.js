import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom'

const FormItem = Form.Item;

class LoginFormNormal extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signIn(values.email, values.password)
          .then(() => {
            console.log('success')
          })
          .catch((err) => {
            console.log(err)
            if (err.code === "auth/user-not-found") {
              this.props.form.setFields({email: {value: values.email, errors: [new Error('email not found')]}})
            }
            if (err.code === "auth/invalid-email") {
              this.props.form.setFields({email: {value: values.email, errors: [new Error('email is invalid')]}})
            }
            if (err.code === "auth/wrong-password") {
              this.props.form.setFields({password: {value: values.password, errors: [new Error('wrong password')]}})
            }
          })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ width: '300px' }}>
        <Form onSubmit={this.handleSubmit} className="login-form" >
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" name="email" placeholder="Email" />
              )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem style={{ marginBottom: '0' }} >
            <Button 
              type="primary" 
              style={{ width: '100%' }} 
              htmlType="submit" 
              className="login-form-button" 
              loading={this.props.auth.signingIn} 
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

const LoginForm = Form.create()(LoginFormNormal)

export default LoginForm