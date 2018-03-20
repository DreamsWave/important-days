import React from 'react'
import { Row, Col, Card, Button } from 'antd'
import Timeline from '../containers/TimelineContainer'
import CalendarShort from '../containers/CalendarShortContainer'
import EventList from '../containers/EventListContainer'

import { firebaseMessaging } from '../firebase'

class Dashboard extends React.Component {
  handleSubscribe(e) {
    firebaseMessaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        firebaseMessaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              console.log(currentToken)
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
          });

      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
  }
  render() {
    return (
      <div>
        <Card style={{margin: '10px'}}>
          <Button type="primary" onClick={this.handleSubscribe.bind(this)}>Subscribe to notifications</Button>
        </Card>

        <Row>
          <Col md={6}>
            <Timeline />
          </Col>
          <Col md={12}>
            <EventList />
          </Col>
          <Col md={6}>
            <CalendarShort />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
