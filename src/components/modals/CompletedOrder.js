import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CompletedOrder extends Component {
  render () {
    const { orderId, order } = this.props 
    return <div className='modal-dialog modal-xs'>
      <div className='modal-content'>
        <div className='modal-body center'>
          <h1>Ваш заказ {orderId} отправлен </h1>
          <p> <Link to={`/orders/${orderId}`}> Посмотреть заказ </Link> </p>
        </div>
      </div>
    </div>
  }
}

export default CompletedOrder
