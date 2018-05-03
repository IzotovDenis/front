import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ModalBackDrop extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.modal > 0) {
      //document.body.classList.toggle('modal-open', true)
      //document.getElementById('modal-backdrop').style = 'display: block'
    }
    if (nextProps.modal === 0) {
      //document.body.classList.toggle('modal-open', false)
      //document.getElementById('modal-backdrop').style = 'display: none'
    }
  }
  componentWillMount () {
    // document.body.classList.toggle('modal-open', true)
    // document.getElementById('modal-backdrop').style = 'display: block'
  }
  componentWillUnmount () {
    // document.body.classList.toggle('modal-open', false)
    // document.getElementById('modal-backdrop').style = 'display: none'
  }
  render () {
    return null
  }
}

function mapStateToProps (state) {
  return {
    modal: state.modal.components.length
  }
}

export default connect(mapStateToProps)(ModalBackDrop)
