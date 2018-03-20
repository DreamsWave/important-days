import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Card, Icon } from 'antd';
const FormItem = Form.Item

class RegistrationFormNormal extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createUser(values.email, values.password)
          .then(() => {
            console.log('success')
          })
          .catch(err => {
            console.log(err)
            let { code } = err
            if (code === 'auth/email-already-in-use') {
              this.props.form.setFields({ email: { value: values.email, errors: [new Error('email already in use')] } })
            }
            if (code === 'auth/invalid-email') {
              this.props.form.setFields({ email: { value: values.email, errors: [new Error('email is invalid')] } })
            }
            if (code === 'auth/weak-password') {
              this.props.form.setFields({ password: { value: values.password, errors: [new Error('weak password')] } })
            }
          })
      }
    });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Card style={{ width: '300px' }} >
        <Form onSubmit={this.handleSubmit} >
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
              )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: `Password should be at least 6 characters`, min: 6
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
              )}
          </FormItem>
          <FormItem>
            <Button type="primary" style={{ width: '100%' }} htmlType="submit" loading={this.props.auth.signingIn} >Register</Button>
          </FormItem>
          Already have an account? <Link to="/login">Log in!</Link>
        </Form>
      </Card>
    );
  }
}

const RegisterForm = Form.create()(RegistrationFormNormal)

export default RegisterForm