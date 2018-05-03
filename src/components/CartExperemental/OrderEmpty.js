import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cartActions'

class OrderEmpty extends React.Component {
  render() {
    const { cartId } = this.props
    return <div className='cartv2_order_body cart_bg cartv2_empty'>
        <div className='row cartv2_empty_label'>
          Корзина пустая
        </div>
        <div className='row cartv2_empty_buttons'>
        <button type="button" className="btn btn-outline-danger btn-lg" onClick={() => this.props.cartActions.deleteCart(cartId)}>Удалить корзину</button>
        </div>
        </div>
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderEmpty)