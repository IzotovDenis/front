import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modalActions'
import * as activeOrderActions from '../../actions/activeOrderActions'

class NewOrderModal extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.activeOrderActions.createNewOrderRequest(this.state.name)
  }
  handleChange (event) {
    this.setState({ name: event.target.value })
  }
  render () {
    return <div className='modal-dialog modal-xs'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>Создать новую корзину</h4>
        </div>
        <div className='modal-body'>
          <form onSubmit={this.handleSubmit}>
            <input type='text'
              value={this.state.name}
              onChange={this.handleChange}
              className='form-control'
              placeholder='Название корзины' />
            <input type='submit' value='Создать корзину' className='btn btn-default ' />
          </form>
        </div>
      </div>
    </div>
  }
}

NewOrderModal.propTypes = {
  activeOrderActions: PropTypes.object
}

function mapStateToProps (state) {
  return {
    discount: state.discount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    activeOrderActions: bindActionCreators(activeOrderActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewOrderModal)
