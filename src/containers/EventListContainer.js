import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addEvent, deleteEvent, editEvent, getEvent } from '../actions/events'
import { Icon, Modal, Button, List, Card } from 'antd'
import AddEvent from '../components/AddEvent'
import EditEvent from '../components/EditEvent'
import ShowEvent from '../components/ShowEvent';

const confirm = Modal.confirm

class EventListContainer extends Component {
  state = {
    showAddModal: false, 
    showDeleteModal: false, 
    showEditModal: false,
    openedEventId: null
  }

  handleSubmit(date, name) {
    if (date && name) {
      const event = {
        date, 
        name,
        id: ID()
      }
  
      this.props.addEvent(event)
        .then((result) => {
          this.setState({ showAddModal: false })
        })
        .catch(err => {
          console.log(err)
        })
  
      function ID() {
        return Math.random().toString(36).substr(2, 9)
      }
    }
  }

  handleEditSubmit(id, date, name) {
    if (id && date && name) {
      const event = {
        date, 
        name,
        id
      }
      this.props.editEvent(event)
        .then((result) => {
          this.setState({ showEditModal: false })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  showEventModal(e) {
    this.setState({ showEventModal: true })
  }
  showAddModal(e) {
    this.setState({ showAddModal: true })
  }
  showEditModal(e) {
    let eventId = e.target.dataset.eventId
    this.props.getEvent(eventId)
    this.setState({ showEditModal: true, openedEventId: eventId })
  }
  showDeleteModal(e) {
    const eventId = e.target.dataset.eventId
    const that = this
    confirm({
      title: 'Are you sure delete this event?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        that.props.deleteEvent(eventId).then(() => console.log('success'))
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }
  handleCancel(e) {
    this.setState({ showEventModal: false, showAddModal: false, showDeleteModal: false, showEditModal: false, openedEventId: null });
  }

  render() {
    const that = this

    function renderList(_events) {
      let { events, isFetching } = _events

      if (isFetching) {
        return <Icon type="loading" />
      } else {
        return <List
          itemLayout="horizontal"
          dataSource={events ? Object.values(events) : []}
          renderItem={item => (
            <List.Item actions={[<a onClick={(e) => that.showEditModal(e)}><Icon data-event-id={item.id} type="edit" style={{ color: 'orange' }} /></a>, <a onClick={(e) => that.showDeleteModal(e)}><Icon data-event-id={item.id} type="delete" style={{color: 'red'}} /></a>]}>
              <List.Item.Meta
                title={<a onClick={(e) => that.showEditModal(e)} data-event-id={item.id}>{item.date}</a>}
                description={item.name}
              />
            </List.Item>
          )}
        />
      }
    }

    return (
      <Wrapper>
        <Modal
          title="Event"
          visible={this.state.showEventModal}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose
          width="300px"
          footer={[
            <Button key="back" onClick={this.handleCancel.bind(this)}>Cancel</Button>
          ]}
        >
          <ShowEvent event={this.props.events.openedEvent} />
        </Modal>
        <Modal
          title="Add Event"
          visible={this.state.showAddModal}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose
          width="300px"
          footer={[
            <Button key="back" onClick={this.handleCancel.bind(this)}>Cancel</Button>
          ]}
        >
          <AddEvent handleSubmit={this.handleSubmit.bind(this)} />
        </Modal>
        <Modal
          title="Edit Event"
          visible={this.state.showEditModal}
          onCancel={this.handleCancel.bind(this)}
          destroyOnClose
          width="300px"
          footer={[
            <Button key="back" onClick={this.handleCancel.bind(this)}>Cancel</Button>
          ]}
        >
          <EditEvent event={this.props.events.openedEvent} handleEditSubmit={this.handleEditSubmit.bind(this)} />
        </Modal>

        <Card title="Events" loading={this.props.events.isFetching} extra={<Button type="primary" onClick={this.showAddModal.bind(this)}>Add Event</Button>}>
          {renderList(this.props.events)}
        </Card>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: 10px;
  .ant-card-head-title {
    display: flex;
    align-items: center;
  }
`

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addEvent: (event) => dispatch(addEvent(event)),
    deleteEvent: (eventId) => dispatch(deleteEvent(eventId)),
    editEvent: (event) => dispatch(editEvent(event)),
    getEvent: (eventId) => dispatch(getEvent(eventId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListContainer)