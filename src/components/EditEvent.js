import React, { Component } from 'react'
import { Input, Button, DatePicker, Form } from 'antd'
import moment from 'moment'

export default class EditEvent extends Component {
  render() {
    let { id, name, date } = Object.values(this.props.event)[0]
    return (
      <div>
        <form onSubmit={(e) => { this.props.handleEditSubmit(id, this.eventDate.picker.input.value, this.eventName.input.value); e.preventDefault() }}>
          <Form.Item>
            <Input placeholder="Event name" defaultValue={name} name="name" ref={(ref) => { this.eventName = ref }} />
          </Form.Item>
          <Form.Item>
            <DatePicker autoFocus={true} defaultValue={moment(`${date}-${moment().year()}`, 'DD-MM')} format="DD-MM" name="date" placeholder="Choose date" ref={(ref) => { this.eventDate = ref }} style={{ width: '100%' }} />
          </Form.Item>
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>Edit</Button>
        </form>
      </div>
    )
  }
}
