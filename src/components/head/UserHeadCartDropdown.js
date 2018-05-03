import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import * as activeOrderActions from '../../actions/activeOrderActions'
import Dropdown from '../../helper/dropdown/Dropdown'
import DropdownHead from '../../helper/dropdown/DropdownHead'
import DropdownBodyContainer from '../../helper/dropdown/DropdownBodyContainer'
import {CartIcon} from '../../helper/Icons'
import { RenderCurrency } from '../../helper/Helper'
import { Link } from 'react-router-dom'
import './css/UserHeadCartDropdown.sass'

class UserHeadCartDropdown extends Component {
  constructor (props) {
    super(props)
    this.handleNewOrder = this.handleNewOrder.bind(this)
  }
  handleNewOrder () {
    this.props.modalActions.setModalNewOrder()
  }
  render () {
    const { activeOrders, modalActions, activeOrderActions, discount } = this.props
    const currentOrder = activeOrders.currentOrder
    const listOrders = Object.keys(activeOrders.orders).map((orderKey, index) =>
      <OrderDropdown key={orderKey}
        order={activeOrders.orders[orderKey]}
        orderId={parseInt(orderKey)}
        activeId={activeOrders.currentOrderId}
        modalActions={modalActions}
        activeOrderActions={activeOrderActions}
        discount={discount} />
    )
    if (activeOrders.currentOrderId) {
      return <Dropdown className='user-head-cart-dropdown'>
        <DropdownHead className='user-head-cart-dropdown-head'>
          <div id='cart-wrapper'>
            <div className='cart-icon'>
              <CartIcon/>
            </div>
            <div className='cart-content' onClick={this.handleOpenOrder}>
              <div className='cart-name'>{`${currentOrder.name || 'Корзина ' + currentOrder.id}`}</div>
              <div className='cart-amount'><RenderCurrency price={currentOrder.amount} discount={discount} /></div>
            </div>
            <div className='cart-icon-down'>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
        </DropdownHead>
        <DropdownBodyContainer>
          <div className='dropdown-orders-container'>
            <div className='dropdown-orders'>
              <ul className='cart-dropdown-list lovely_scroll'>
                {listOrders}
              </ul>
              <div className='dropdown-add-cart' onClick={this.handleNewOrder}>
                <span className='glyphicon glyphicon-plus' aria-hidden='true' />
                <span className='title'>Создать новую корзину</span>
              </div>
            </div>
          </div>
        </DropdownBodyContainer>
      </Dropdown>
    } else {
      return null
    }
  }
}

UserHeadCartDropdown.defaultProps = {
  activeOrders: { order: {} }
}

class OrderDropdown extends Component {
  constructor (props) {
    super(props)
    this.handleChangeOrder = this.handleChangeOrder.bind(this)
    this.handleOpenOrder = this.handleOpenOrder.bind(this)
  }
  handleChangeOrder () {
    this.props.activeOrderActions.setActiveOrderRequest(this.props.orderId)
  }
  handleOpenOrder () {
    this.props.modalActions.showOrderModal(this.props.orderId)
  }
  render () {
    const { order, discount, orderId } = this.props
    return <li key={order.id} className={'cart-dropdown-item ' + (this.props.orderId === this.props.activeId ? 'shopping-cart' : 'shopping-cart-gray')}>
      <Link to={{ pathname: `/cart`, state: { fromApp: true, orderId: order.id }}}>
        <div className='cart-dropdown-name cursor-pointer'>
          {order.name || `Корзина ${orderId}`}
        </div>
      </Link>
      <div className='cart-dropdown-info'>
        <div className='cart-dropdown-amount' >
          <span className='cart-dropdown-info-label'>Сумма </span>
          <span className='cart-dropdown-info-value'>
            <RenderCurrency price={order.amount} discount={discount.val} />
          </span>
        </div>
        <div className='cart-dropdown-items'>
          <span className='cart-dropdown-info-label'>Товаров:</span>
          <span className='cart-dropdown-info-value'>{this.props.order.qty} </span>
        </div>
        <div className='cart-dropdown-controls'>
          <button onClick={this.handleChangeOrder}
            className={'btn btn-xs btn-defaul ' + (this.props.orderId === this.props.activeId ? 'btn-primary' : '')} >
            {(this.props.orderId === this.props.activeId ? 'Активная' : 'Активировать')}
          </button>
        </div>
      </div>
    </li>
  }
}

export default connect(
  (state) => {
    return {
      activeOrders: state.activeOrders,
      discount: state.discount }
  },
  (dispatch) => {
    return {
      modalActions: bindActionCreators(modalActions, dispatch),
      activeOrderActions: bindActionCreators(activeOrderActions, dispatch)
    }
  })(UserHeadCartDropdown)
