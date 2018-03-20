import React, { Component } from 'react'
import { Layout } from 'antd'

import HeaderInner from './components/Header'
import Routes from './Routes'

const { Header, Content, Footer } = Layout

class _Layout extends Component {
  render() {
    const { signed, user } = this.props.auth
    let headerHeight = signed ? 50 : 0;
    return (
      <Layout>
        {signed ?
          <Header style={{ position: 'fixed', width: '100%', height: `${headerHeight}px`, background: '#fff', zIndex: 999 }} >
            <HeaderInner signOut={this.props.signOut} signed={signed} user={user} />
          </Header>
          :
          null
        }
        <Content style={{ marginTop: headerHeight, height: signed ? `calc(100vh - ${headerHeight}px)` : '100vh' }} >
          <Routes signed={signed} />
        </Content>
        <Footer>
          For any questions: <a href="mailto:idreamzzer@gmail.com">idreamzzer@gmail.com</a>
        </Footer>
      </Layout>
    );
  }
}

export default _Layout
