import React from 'react'
import { connect } from 'react-redux'
import * as cartActions from '../../actions/cartActions'
import { bindActionCreators } from 'redux'

const DeleteItemIcon = (props) => {
  const {itemId, cartId, cartActions } = props
  return <div className='cell cartv2_order_head_delete'>
    <div className='cursor-pointer' onClick={() => cartActions.deleteItem(cartId, itemId)}>
     <i className="far fa-trash-alt" >
     </i>
     </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemIcon)