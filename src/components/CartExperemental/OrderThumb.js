import React from 'react'
import { CartIcon } from '../../helper/Icons'
import { RenderCurrency } from '../../helper/Helper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cartActions'


class OrderThumb extends React.Component {
  render() {
    const { order, cartActions, copyView, moveView } = this.props
    return <div className="cartv2_thumb cartv2_thumb_order" >
      { copyView && 
        <div className="cartv2_action_container">
          <div className="btn btn-secondary btn-md"> Копировать </div>
        </div>
      }
      { moveView && 
        <div className="cartv2_action_container">
          <div className="btn btn-secondary btn-md"> Переместить </div>
        </div>
      }
      <div className="cartv2_icon" onClick={()=> console.log(order.id)}>
        <CartIcon />
      </div>
      <div className="cartv2_thumb_content" onClick={()=> cartActions.setOpenedCart(order.id)}>
        <div className="cartv2_thumb_order_title">
          <div className="cartv2_thumb_order_title_text">
          {order.name}
          </div>
        </div>
        <div className="cartv2_thumb_order_content">
        { (!copyView && !moveView) &&
          [<div className="cartv2_thumb_content_block">
          <span className='cartv2_thumb_order_label'>Сумма: </span>
          <span className='cartv2_thumb_order_value'><RenderCurrency price={order.amount} discount={0} /></span>
          </div>,
          <div className="cartv2_thumb_content_block">
          <span className='cartv2_thumb_order_label'>Товаров: </span>
          <span className='cartv2_thumb_order_value'>{order.qty}</span>
          </div>
          ]
        }
        </div>
      </div>
      </div>
  }
}

function mapStateToProps(state) {
  return {
    copyView: state.cart.copyView,
    moveView: state.cart.moveView
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderThumb)