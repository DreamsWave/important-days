import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'antd'
import CalendarComponent from '../components/Calendar'

class CalendarContainer extends Component {

  getOnlyDates(events) {
    const onlyDates = []
    for (let eventKey in events) {
      onlyDates.push(events[eventKey].date)
    }
    return onlyDates
  }

  getListData(value) {
    const events = this.props.events.events
    const onlyDates = this.getOnlyDates(events)
    const listData = []
    let currentDate = value.format('DD-MM')
    if (onlyDates.includes(currentDate)) {
      for (let eventKey in events) {
        if (events[eventKey].date === currentDate) {
          let event = {
            type: 'success',
            content: events[eventKey].name
          }
          listData.push(event)
        }
      }
    }
    return listData || []
  }

  dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    );
  }

  render() {
    return <CalendarComponent dateCellRender={this.dateCellRender.bind(this)} loading={this.props.events.isFetching} />
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}
function mapDispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)