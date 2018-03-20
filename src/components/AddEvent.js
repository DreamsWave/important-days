import React, { Component } from 'react'
import { Input, Button, DatePicker, Form } from 'antd'

class AddEvent extends Component {
  componentDidMount() {
    setTimeout(() => this.eventName.focus(), 0)
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.props.handleSubmit(this.eventDate.picker.input.value, this.eventName.input.value); e.preventDefault() }}>
          <Form.Item>
            <Input placeholder="Event name" name="name" ref={(ref) => { this.eventName = ref }} />
          </Form.Item>
          <Form.Item>
            <DatePicker autoFocus={true} format="DD-MM" name="date" placeholder="Choose date" ref={(ref) => { this.eventDate = ref }} style={{width: '100%'}} />
          </Form.Item>
          <Button htmlType="submit" type="primary" style={{width: '100%'}}>Add</Button>
        </form>
      </div>
    )
  }
}

export default AddEvent