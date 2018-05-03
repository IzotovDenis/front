import React from 'react'
import { RenderCurrency } from '../../helper/Helper'
import { connect } from 'react-redux'

class OrderFooter extends React.Component {
  render() {
    const { order, discount } = this.props
    return <div className='cartv2_order_footer'>
          <div className='row'>
            <div className='col-9'>
            </div>
            <div className='col-3 cartv2_order_total_container'>
              <div className="cartv2_order_total_label">
              <span> Сумма заказов </span>
              </div>
              <div className="cartv2_order_total_val">
              <RenderCurrency price={order.amount} discount={discount} />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='cartv2_order_footer_comment'>
              <textarea className='form-control' placeholder='Введите комментарий'/>
            </div>
            <div className='cartv2_order_footer_accept'>
              <input type='checkbox'/>
              наименование товаров и количество в заказе указано верно.
            </div>
            <div className='cartv2_order_footer_send_btn'>
              <button className='btn btn-primary'>Отправить заказ</button>
            </div>
          </div>
          </div>
  }
}

OrderFooter.defaultProps = {
  order: {
    amount: 0
  }
}

export default connect( state => {
  return {
    order: state.cart.shownOrder,
    discount: state.discount
  }
})(OrderFooter)