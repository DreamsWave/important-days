import React, { Component } from 'react'
import { Calendar, Card } from 'antd'
import styled from 'styled-components'

class _CalendarShort extends Component {

  render() {
    return (
      <Wrapper>
        <StyledCard>
          <Calendar fullscreen={false} dateFullCellRender={this.props.dateCellRender} />
        </StyledCard>
      </Wrapper>
    )
  }
}

export default _CalendarShort


const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
  }
  .events {
    list-style-type: none;
  }
`

const Wrapper = styled.div`
  max-width: 500px;
  margin: 10px;
`