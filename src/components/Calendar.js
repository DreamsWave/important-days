import React, { Component } from 'react'
import { Calendar, Card } from 'antd'
import styled from 'styled-components'

class _Calendar extends Component {
  render() {
    return (
      <Wrapper>
        <Card>
          <Calendar dateCellRender={this.props.dateCellRender} loading={this.props.loading} />
        </Card>
      </Wrapper>
    )
  }
}

export default _Calendar

const Wrapper = styled.div`
  margin: 10px;
  .events {
    list-style-type: none;
  }
`