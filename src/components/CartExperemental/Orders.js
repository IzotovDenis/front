import React from 'react'
import './css/orders.sass'
import AddOrder from './AddOrder'
import {connect} from 'react-redux'
import OrderThumb from './OrderThumb'

class Orders extends React.Component {
  render() {
    const { orders} = this.props.activeOrders
    const { copyView, moveView } = this.props
    let classes = ['cartv2_orders_list_container']
    if (copyView || moveView) {
      classes.push('cartv2_orders_list_container_active')
    }
    return <div className={classes.join(' ')}>
      <div className='cartv2_order_header'>
      <AddOrder />
      </div>
      <div className='cartv2_order_body lovely_scroll'>
      {Object.keys(orders).map((orderId, index) => {
      return <OrderThumb order={orders[orderId]} key={index} />
    })
      }
      </div>
      <div className='cartv2_order_footer'>
      </div>
      </div>
  }
}

function mapStateToProps(state) {
  return {
    activeOrders: state.activeOrders,
    copyView: state.cart.copyView,
    moveView: state.cart.moveView
  }
}

export default connect(mapStateToProps)(Orders)
