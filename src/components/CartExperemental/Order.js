import React from 'react'
import './css/order.sass'
import OrderBody from './OrderBody'
import OrderFooter from './OrderFooter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cartActions'

class Order extends React.Component {
  render() {
    return <div className='cartv2_order_container'>
        { (this.props.copyView || this.props.moveView) && 
        <div className='cartv2_order_block_container'>
          { this.props.copyView &&
          [<div className='cartv2_order_block_container_label'>
            Выберете корзину для копирования
          </div>,
          <button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.cartActions.setCopyView(false)}>Отменить копирование</button>]
          }
          { this.props.moveView &&
          <button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.cartActions.setMoveView(false)}>Отменить перемещение</button>
          }
        </div>
        }
        <div className='cartv2_order_header'>
          <div className='row'>
          <h5> Корзина: Супер пупер корзина </h5>
          </div>
          <div className='row'>
            <button className='btn btn-outline-secondary btn-sm'><i className="far fa-check-square"></i></button>
            <button className='btn btn-outline-secondary btn-sm'><i className="far fa-square"></i></button>
            <button className='btn btn-outline-danger btn-sm'>Удалить</button>
            <button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.cartActions.setMoveView(true)}>Переместить</button>
            <button className='btn btn-outline-secondary btn-sm' onClick={() => this.props.cartActions.setCopyView(true)}>Копировать</button>
          </div>
          </div>
        <OrderBody />
        <OrderFooter />
      </div>
  }
}

function mapStateToProps(state) {
  return {
    cartId: state.cart.cartId,
    copyView: state.cart.copyView,
    moveView: state.cart.moveView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order)