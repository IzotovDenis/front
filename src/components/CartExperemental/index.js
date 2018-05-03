import React from 'react'
import './css/index.sass'
import Orders from './Orders'
import OrderContainer from './OrderContainer'
import {ArrowLeftIcon} from '../../helper/Icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as cartActions from '../../actions/cartActions'

class CartExperemental extends React.Component {
  state = {shown: true, orderId: 0}
  handleBack() {
    if (this.props.location.state.fromApp) {
      this.props.history.goBack()
    }
    else {
      this.props.history.replace("/")
    }
  }
  componentWillMount() {
    const { orderId } = this.props.location.state || false
    if (orderId) {
      this.props.cartActions.setOpenedCart(orderId)
    }
  }
  componentWillUnmount() {
  }
  render () {
    const { copyView, moveView, modalBackdropShown } = this.props
    return <div className='cartv2_wrapper'>
        { ((copyView || moveView) && !modalBackdropShown) &&
        <div className='cartv2_fade'/> }
        <div className='cartv2_header' onClick={() => this.handleBack()}>
          <ArrowLeftIcon/>
          Вернуться в каталог
        </div>
        <div className='cartv2_container'>
          <OrderContainer />
        <div className='cartv2_orders_wrapper'>
          <Orders selectOrder={this.selectOrder} />
        </div>
        </div>
       </div>
  }
}

export default connect(
  state=>{
    return {
      copyView: state.cart.copyView,
      moveView: state.cart.moveView,
      modalBackdropShown: state.modalBackdrop.shown
    }
  }, 
  dispatch=> {
    return {
      cartActions: bindActionCreators(cartActions, dispatch)
    }
})(withRouter(CartExperemental))