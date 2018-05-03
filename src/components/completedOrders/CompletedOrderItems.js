import React, { Component } from 'react'
import CompletedOrderItem from './CompletedOrderItem'

class CompletedOrderItems extends Component {
  render () {
    const { items } = this.props
    const listItems = items.map((item, index) =>
      <CompletedOrderItem item={item} key={index} />)
    return <div>
      <table className='table item-list order'>
        <tbody>
          <tr className='head'>
            <th className='center'> Картинка </th>
            <th className='center'> Код/артикул </th>
            <th className='center'> Наименование </th>
            <th className='center'> Цена </th>
            <th className='center'> Заказ </th>
            <th className='center'> Сумма </th>
          </tr>
          {listItems}
        </tbody>
      </table></div>
  }
}

CompletedOrderItems.defaultProps = {
  items: []
}

export default CompletedOrderItems
