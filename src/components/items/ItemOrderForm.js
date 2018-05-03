import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './css/itemorderform.sass'
import OrderButton from '../OrderButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import * as activeOrderActions from '../../actions/activeOrderActions'

class ItemOrderForm extends Component {
  constructor (props) {
    super(props)
    this.state = { orderedItem: this.props.orderedItemQty || '',
      orderedItemCurrent: this.props.orderedItemQty || '',
      orderId: this.props.orderId }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIncrease = this.handleIncrease.bind(this)
    this.label = 'В КОРЗИНУ'
  }

  handleSubmit (event) {
    event.preventDefault()
    let qty
    if (this.state.orderedItemCurrent === '') {
      if (this.state.orderedItem === '') {
        qty = 1
        this.props.activeOrderActions.setItemsRequest(this.props.orderId, this.props.itemId, qty)
      }
      else {
        qty = this.state.orderedItem
        this.props.activeOrderActions.setItemsRequest(this.props.orderId, this.props.itemId, qty)
      }
    } else if (this.state.orderedItemCurrent > 0) {
      if (this.state.orderedItem === '' || this.state.orderedItem === "0") {
        this.props.activeOrderActions.deleteItemFromOrderRequest(this.props.orderId, [String(this.props.itemId)], false)
      }
      else {
        qty = this.state.orderedItem
        this.props.activeOrderActions.setItemsRequest(this.props.orderId, this.props.itemId, qty)
      }
    }
  }
  handleChange (event) {
    this.setState({ orderedItem: event.target.value })
  }
  handleIncrease (i) {
    let qty = parseInt(this.state.orderedItem) || 0
    let newQty = qty + i
    if (newQty < 1) {
      this.setState({ orderedItem: '' })
    } else {
      this.setState({ orderedItem: newQty })
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ orderedItem: nextProps.orderedItemQty, orderedItemCurrent: nextProps.orderedItemQty })
    if (nextProps.orderId !== this.state.orderId) {
      this.setState({ orderId: nextProps.orderId })
    }
  }
  render () {
    const { user } = this.props
    if (user.can_order) {
      return <form onSubmit={this.handleSubmit}>
        <div className='btn-group' role='group'>
          <button type='button' className={`btn btn-default qty-select__button qty-select__button_type_minus ${this.state.orderedItem > 0 ? '' : 'button2__text_disabled'}`} onClick={() => this.handleIncrease(-1)}>
            <span className='button2__text' />
          </button>
          <input type='text'
            value={this.state.orderedItem}
            onChange={this.handleChange}
            className='order-qty form-control'
            placeholder='0' />
          <button type='button' className='btn btn-default qty-select__button qty-select__button_type_plus' onClick={() => this.handleIncrease(1)}>
            <span className='button2__text' />
          </button>
        </div>
          <OrderButton {...this.state} />
      </form>
    } else {
      return <button className='btn btn-xs btn-default btn-order btn-qty' onClick={this.props.modalActions.showModalHowToBuy}>
        КУПИТЬ
        </button>
    }
  }
}




ItemOrderForm.propTypes = {
  activeOrderActions: PropTypes.object,
  setModalBuy: PropTypes.func,
  user: PropTypes.object,
  order: PropTypes.object,
  orderId: PropTypes.number,
  itemId: PropTypes.number
}

export default connect(
  (state, ownProps) => {
    let orderedItem = {}
    if (state.activeOrders.orderList[state.activeOrders.currentOrderId] !== undefined) {
      orderedItem = state.activeOrders.orderList[state.activeOrders.currentOrderId][ownProps.itemId] || {}
    }
    return {
      user: state.user,
      orderId: state.activeOrders.currentOrderId,
      orderedItemQty: orderedItem.qty || ""
    }
  },
  (dispatch) => {
    return {
      modalActions: bindActionCreators(modalActions, dispatch),
      activeOrderActions: bindActionCreators(activeOrderActions, dispatch)
    }
  })(ItemOrderForm)