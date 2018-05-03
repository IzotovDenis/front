import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../actions/modalActions'
import * as modalBackdropActions from '../actions/modalBackdropActions'
import { withRouter } from 'react-router-dom'

class Modals extends Component {
  componentWillReceiveProps(nextProps) {
    if( this.props.location !== nextProps.location) {
      this.props.modalActions.hideAllModals()
    }
  }
  render () {
    const listModals = this.props.modal.components.map((modal, index) => {
      return (<ModalDialog modalId={index} {...this.props} key={index} />)
    })
    return (<div>{listModals}</div>)
  }
  }

class ModalDialog extends Component {
  constructor (props) {
    super(props)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }
  handleOutsideClick (e) {
    if (e.target.id === 'modal-dialog') {
      this.props.modalActions.hideModal(this.props.modalId)
    }
  }
  handleCloseModal () {
    this.props.modalActions.closeModal()
  }
  componentDidMount() {
    this.props.modalBackdropActions.addModal()
  }
  componentWillUnmount() {
    this.props.modalBackdropActions.destroyModal()
  }
  render () {
    const divStyle = {
      zIndex: 1080 + this.props.modalId * 10
    }
    const renderComponent = () => {
      let component = this.props.modal.components[this.props.modalId]
      let data = this.props.modal.data[this.props.modalId]
      return React.createElement(component, { ...data, modalId: this.props.modalId })
    }
    return <div id='modal-dialog' className='modal' onClick={this.handleOutsideClick} style={divStyle}>
      {renderComponent()}
    </div>
  }
}

ModalDialog.propTypes = {
  modalActions: PropTypes.object,
  modal: PropTypes.object
}

function mapStateToProps (state) {
  return {
    modal: state.modal
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    modalBackdropActions: bindActionCreators(modalBackdropActions,dispatch)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Modals))