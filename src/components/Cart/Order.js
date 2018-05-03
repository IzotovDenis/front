import React from 'react'
import RenderCurrency from '../RenderCurrency'
import CartItem from './CartItem'
import './css/cart.sass'

class Order extends React.Component {
  constructor (props) {
    super(props)
    this.state = { confirm: false, comment: '' }
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
  }
  handleSubmitOrder (event) {
    event.preventDefault()
    this.props.activeOrderActions.orderComplete(this.props.orderId, this.state.comment)
  }
  handleChangeConfirm (event) {
    this.setState({ confirm: !this.state.confirm })
  }
  handleItemChange () {
    this.setState({ confirm: false })
  }
  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }
  renderOrder () {
    const { modalOrder, activeOrderActions, discount, activeOrders } = this.props
    const thisOrder = {}
/*     const listItems = modalOrder.orderItems.map((item) =>
      <CartItem
        item={item}
        key={modalOrder.shownOrderId + item.id}
        orderId={modalOrder.shownOrderId}
        ordered={activeOrders.orderList[modalOrder.shownOrderId][item.id].qty}
        activeOrderActions={activeOrderActions}
        discount={discount}
        handleItemChange={this.handleItemChange} />) */
    return <div className='cart_container'>
        <div className='cart_body'>
          <table className='table item-list order'>
            <tbody>
              <tr className='head'>
                <th className='center'> Картинка </th>
                <th className='center'> Код/артикул </th>
                <th className='center'> Наименование </th>
                <th className='center'> Остаток </th>
                <th className='center'> Цена </th>
                <th className='center'> Заказ </th>
                <th className='center'> Сумма </th>
                <th className='center'> Удалить </th>
              </tr>
              <tr className='tr-order-total tr_middle'>
                <td className='label-amount' colSpan={6}> Итого: </td>
                <td className='label-amount' colSpan={2}><RenderCurrency price={thisOrder.amount} discount={discount} /> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='cart_footer'>
            <div className='row'>
              <span> Итого </span>
            </div>
            <div className='row'>
              <div className='col-7'>
                <span> Добавить комментарий </span>
              </div>
              <div className='col-5'>
                <button type='button' className='btn btn-primary' disabled={!this.state.confirm} onClick={this.handleSubmitOrder}>Отправить заказ</button>
              </div>
            </div>
        </div>
        </div>
  }
  render () {

      return this.renderOrder()
  }
}

export default Order