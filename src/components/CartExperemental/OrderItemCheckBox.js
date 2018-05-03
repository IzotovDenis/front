import React from 'react'
import * as cartActions from '../../actions/cartActions'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'

class OrderItemCheckBox extends React.Component {
  handleCheked(cartId, itemId) {
    this.props.cartActions.selectItem(cartId, itemId)
  }
  render() {
    const {itemId, cartId, selected} = this.props
    return <input type="checkbox" checked={selected} onChange={() => this.handleCheked(cartId, itemId)} />
  }
}


export default connect((state, ownProps) =>{
  let selected
  if (state.cart.selectedItems[ownProps.cartId]) {
    selected = state.cart.selectedItems[ownProps.cartId][ownProps.itemId]
  }
return {
  selected: selected || false
        }
},
  dispatch => {
    return {
      cartActions: bindActionCreators(cartActions, dispatch)
    }
  })(OrderItemCheckBox)