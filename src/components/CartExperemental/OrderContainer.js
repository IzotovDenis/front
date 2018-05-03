import React from 'react'
import {connect} from 'react-redux'
import Order from './Order'

class OrderContainer extends React.Component {
  render() {
    const { loaded } = this.props
    if (loaded) {
    return <Order />
    }
    return <div className='cartv2_order_container'>
      SELECT ORDER
      </div>
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.cart.loaded
  }
}

export default connect(mapStateToProps)(OrderContainer)