import React, { Component } from 'react'
import { connect } from 'react-redux'
import CalendarShort from '../components/CalendarShort'
import styled from 'styled-components'


class CalendarShortContainer extends Component {
  getOnlyDates(events) {
    const onlyDates = []
    for (let eventKey in events) {
      onlyDates.push(events[eventKey].date)
    }
    return onlyDates
  }

  getListData(value) {
    const onlyDates = this.getOnlyDates(this.props.events.events)
    const listData = []
    let currentDate = value.format('DD-MM')
    if (onlyDates.includes(currentDate)) {
      listData.push(currentDate)
    }
    return listData || []
  }

  dateCellRender(value) {
    const listData = this.getListData(value)

    return (
      <div className="ant-fullcalendar-date">
        {
          listData.map((item, i) => (
            <EventDay key={i} />
          ))
        }
        <CalVal className="ant-fullcalendar-value">{value.date()}</CalVal>
      </div>
    );
  }

  render() {
    return this.props.events.isFetching ? <CalendarShort /> : <CalendarShort dateCellRender={this.dateCellRender.bind(this)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarShortContainer)


const EventDay = styled.div`
  background: #52C41A;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
`
const CalVal = styled.div`
  position: relative;
  z-index: 1;
`