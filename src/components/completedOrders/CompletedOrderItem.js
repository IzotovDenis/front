import React, { Component } from 'react'
import ItemImage from '../items/ItemImage'
import { RenderCurrency } from '../../helper/Helper'
import PropTypes from 'prop-types'

export default class CompletedOrderItem extends Component {
  render () {
    const { item } = this.props
    return <tr className='tr_middle'>
      <td className='center photo'> <ItemImage itemId={parseInt(item.id)} size={'table'} image={item.image} /> </td>
      <td className='kod'>
        <div className='table-kod-lable'>артикул</div>
        <div className='table-kod-value'>{item.kod}</div>
        <div className='table-kod-lable'>код</div>
        <div className='table-kod-value'>{item.article}</div>
      </td>
      <td className='title'> {item.title} </td>
      <td className='center price'> <RenderCurrency price={parseInt(item.price)} /> </td>
      <td className='center order'> {item.ordered} </td>
      <td className='center item-total'> <RenderCurrency price={item.ordered * item.price} /> </td>
    </tr>
  }
}

CompletedOrderItem.propTypes = {
  item: PropTypes.object
}
