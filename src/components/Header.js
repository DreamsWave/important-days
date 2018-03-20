import React, { Component } from 'react'
import styled from 'styled-components'
import { Button, Row, Col, Icon } from 'antd'

import Navigation from './Navigation'

export default class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Row>
          <Col xs={0} sm={4}>
          </Col>
          <Col xs={24} sm={16}>
            <Navigation />
          </Col>
          <Col xs={0} sm={4}>
            <Logout>
              <Button onClick={() => this.props.signOut()} ><Icon type="logout" />{window.screen.width > 768 ? 'Logout' : null}</Button>
            </Logout>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const Logout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
`

const Wrapper = styled.header`
  width: 100%;
  height: 50px;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

