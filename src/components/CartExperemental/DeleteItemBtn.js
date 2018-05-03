import React from 'react'
import { connect } from 'react-redux'
import * as cartActions from '../../actions/cartActions'
import { bindActionCreators } from 'redux'

const DeleteItemBtn = (props) => {
  const {itemId, cartId, cartActions } = props
  return  <div className='cell cartv2_order_head_unordered'>
     <button className='btn btn-outline-danger btn-sm' onClick={() => cartActions.deleteItem(cartId, itemId)}>Удалить</button>
     </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemBtn)