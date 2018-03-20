import React, { Component } from 'react'
import { Timeline, Card } from 'antd'
import styled from 'styled-components'

class _Timeline extends Component {
  render() {
    return (
      <Wrapper>
        <Card title="Timeline" loading={this.props.isFetching}>
          <Timeline>
            {this.props.renderTimeline()}
          </Timeline>
        </Card>
      </Wrapper>
    )
  }
}

export default _Timeline

const Wrapper = styled.div`
  margin: 10px;

  .ant-timeline-item-last {
    padding-bottom: 0;
  }
  .ant-timeline-item-last .ant-timeline-item-content {
    min-height: auto;
  }
`