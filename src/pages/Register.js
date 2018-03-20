import React from 'react'
import styled from 'styled-components'
import RegisterFormContainer from '../containers/RegisterFormContainer'

const Register = () => {
  return (
    <Wrapper>
      <RegisterFormContainer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Register
