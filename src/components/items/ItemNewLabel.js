import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ItemNewLabel extends Component {
  render () {
    const { newLabel } = this.props
    if (newLabel === true) {
      return <div className='label label-green label-new'>новинка</div>
    } else {
      return null
    }
  }
}

ItemNewLabel.propTypes = {
  newLabel: PropTypes.bool
}
