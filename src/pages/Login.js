import React from 'react'
import LoginFormContainer from '../containers/LoginFormContainer'
import styled from 'styled-components'

const Login = () => {
  return (
    <Wrapper>
      <LoginFormContainer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Login
