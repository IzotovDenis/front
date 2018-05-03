import React from 'react'
import PropTypes from 'prop-types'
import RenderCurrency from '../RenderCurrency'
import ItemImage from '../items/ItemImage'
import CartItemForm from './CartItemForm'

class CartItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { comment: '' }
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.item !== this.props.item) {
      return true
    }
    if (nextProps.orderId !== this.props.orderId) {
      return true
    }
    if (nextProps.ordered !== this.props.ordered) {
      return true
    }
    return false
  }
  handleDeleteItem () {
    this.props.activeOrderActions.deleteItemFromOrderRequest(this.props.orderId, [this.props.item.id])
  }
  render () {
    const { item, orderId, activeOrderActions, discount, ordered } = this.props
    return <tr className='tr_middle'>
      <td className='center photo'> <ItemImage itemId={parseInt(item.id)} size={'table'} image={item.image} /> </td>
      <td className='kod'>
        <div className='table-kod-lable'>артикул</div>
        <div className='table-kod-value'>{item.kod}</div>
        <div className='table-kod-lable'>код</div>
        <div className='table-kod-value'>{item.article}</div>
      </td>
      <td className='title'> {item.title} </td>
      <td className='center qty'> {item.qty} </td>
      <td className='center price'> <RenderCurrency price={parseInt(item.price)} discount={discount} /> </td>
      <td className='center order'>
        <CartItemForm
          itemId={item.id}
          orderId={orderId}
          itemOrdered={ordered}
          activeOrderActions={activeOrderActions}
          handleItemChange={this.props.handleItemChange} />
      </td>
      <td className='center item-total'> <RenderCurrency price={ordered * item.price} discount={discount} /> </td>
      <td className='center action'>
        <button className='btn btn-xs btn-danger' onClick={this.handleDeleteItem}> удалить </button>
      </td>
    </tr>
  }
}

CartItem.propTypes = {
  item: PropTypes.object,
  orderId: PropTypes.number,
  activeOrderActions: PropTypes.object
}

export default CartItem