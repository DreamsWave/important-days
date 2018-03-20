import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Timeline } from 'antd'
import TimelineComponent from '../components/Timeline'
import moment from 'moment'

const prevDatesCount = 1
const nextDatesCount = 3

class TimelineContainer extends Component {
  state = {
    timelineList: {}
  }

  componentWillMount() {
    this.createTimeline()
  }

  getCurrentDate(timelineList) {
    let currentDateEvents = []
    let currentDate = moment().format('DD-MM-YYYY')
    timelineList.forEach((date) => {
      if (date.date === currentDate) {
        currentDateEvents.push(date)
      }
    })
    return currentDateEvents
  }

  getPrevDates(timelineList) {
    const prevDates = []
    let currentDate = moment().subtract(1, 'days')
    let stopDate = moment().subtract(1, 'years')
    while (currentDate >= stopDate) {
      timelineList.forEach((date) => {
        if (date.date === currentDate.format('DD-MM-YYYY')) {
          prevDates.push(date)
        }
      })
      if (prevDates.length >= prevDatesCount) {
        break
      } else {
        currentDate.subtract(1, 'days')
      }
    }
    return prevDates
  }

  getNextDates(timelineList) {
    const nextDates = []
    let currentDate = moment().add(1, 'days')
    let stopDate = moment().add(1, 'years')
    while (currentDate <= stopDate) {
      timelineList.forEach((date) => {
        if (date.date === currentDate.format('DD-MM-YYYY')) {
          nextDates.push(date)
        }
      })
      if (nextDates.length >= nextDatesCount) {
        break
      } else {
        currentDate.add(1, 'days')
      }
    }
    return nextDates
  }

  createTimeline(events) {
    const fullTimelineArray = []
    const currentYear = (new Date()).getFullYear()

    // Pushing prev, curr, next years date to array
    for (let eventKey in events) {
      let event = events[eventKey]
      let prevDate = `${event.date}-${currentYear - 1}`
      let currDate = `${event.date}-${currentYear}`
      let nextDate = `${event.date}-${currentYear + 1}`
      fullTimelineArray.push({ ...event, date: prevDate }, { ...event, date: currDate }, { ...event, date: nextDate })
    }

    // // Sorting by date
    // const sortedTimelineArray = fullTimelineArray.sort((a, b) => {
    //   let aDate = moment(`${a.date}-${currentYear}`, 'DD-MM-YYYY')
    //   let bDate = moment(`${b.date}-${currentYear}`, 'DD-MM-YYYY')
    //   return aDate.isAfter(bDate)
    // })
    
    const timelineList = {
      prevDates: this.getPrevDates(fullTimelineArray),
      currentDate: this.getCurrentDate(fullTimelineArray),
      nextDates: this.getNextDates(fullTimelineArray)
    }
    
    return timelineList
  }

  renderTimeline() {
    const timelineList = this.createTimeline(this.props.events.events)

    const renderedPrev = timelineList.prevDates.map((date) => {
      return <Timeline.Item color="grey" key={Math.random()}><StyledI>{date.date}</StyledI> {date.name}</Timeline.Item>
    })

    let renderedCurrent
    if (timelineList.currentDate.length > 0) {
      renderedCurrent = timelineList.currentDate.map((date) => {
        return <Timeline.Item color="green" key={Math.random()}><StyledI>{date.date}</StyledI> <strong>{date.name}</strong></Timeline.Item>
      })
    } else {
      renderedCurrent = [<Timeline.Item color="green" key={Math.random()}><StyledI>{moment().format('DD-MM-YYYY')}</StyledI> No events today</Timeline.Item>]
    }
    const renderedNext = timelineList.nextDates.map((date) => {
      return <Timeline.Item key={Math.random()}><StyledI>{date.date}</StyledI> {date.name}</Timeline.Item>
    })
    return [...renderedPrev, ...renderedCurrent, ...renderedNext]
  }

  render() {
    return <TimelineComponent renderTimeline={this.renderTimeline.bind(this)} isFetching={this.props.events.isFetching} />
  }
}

const StyledI = styled.i`
  font-size: 12px;
  margin-right: 10px;
`

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)