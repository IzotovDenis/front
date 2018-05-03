import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserBlock from './UserBlock'
import LogoImage from '../../images/logo.png'
import Header from '../Header'
import PropTypes from 'prop-types'
import './css/index.sass'

class Head extends Component {
  render () {
    return <div id='head'>
      <div id='head-wrap'>
        <Header />
      </div>
    </div>
  }
}

Head.propTypes = {
  user: PropTypes.object,
  modalActions: PropTypes.object,
  discount: PropTypes.object,
  discountActions: PropTypes.object
}

export default Head

class HeadOld extends Component {
  render () {
    return <div id='head'>
      <div id='head-wrap'>
        <div id='content' />
        <div id='right-side'>
          <UserBlock />
        </div>
      </div>
      <Header />
    </div>
  }
}