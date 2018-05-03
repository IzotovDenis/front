import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ModalIndex extends Component {
  constructor (props) {
    super(props)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }
  componentDidMount () {
    document.body.className += 'modal-open'
    document.getElementById('modal-backdrop').style.display = 'block'
  }
  componentWillUnmount () {
    document.body.className = ''
    document.getElementById('modal-backdrop').style.display = 'none'
  }
  handleOutsideClick (e) {
    if (e.target.id === 'modal-dialog') {
      this.props.modalActions.hideModal()
    }
  }
  render () {
    return <div id='modal-dialog' className='modal fade in' onClick={this.handleOutsideClick}>
      {React.createElement(this.props.modal.modal_component, this.props)}
    </div>
  }
}

ModalIndex.propTypes = {
  modalActions: PropTypes.object,
  modal: PropTypes.object
}

export default ModalIndex
