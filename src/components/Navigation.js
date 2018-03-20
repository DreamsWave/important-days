import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const Navigation = (props) => {
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '49px', borderBottom: 'none', display: 'flex', justifyContent: 'center' }}
    >
      <Menu.Item key="1"><Link to="/"><Icon type="home" />Dashboard</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/calendar"><Icon type="calendar" />Calendar</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/about"><Icon type="idcard" />About</Link></Menu.Item>
    </Menu>
  )
}

export default Navigation
