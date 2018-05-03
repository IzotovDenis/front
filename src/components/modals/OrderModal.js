import React, { Component } from 'react'
import ItemImage from '../items/ItemImage'
import { RenderCurrency } from '../../helper/Helper'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modalActions'
import * as activeOrderActions from '../../actions/activeOrderActions'
import * as modalOrderActions from '../../actions/modalOrderActions'

class ItemOrderForm extends Component {
  constructor (props) {
    super(props)
    this.state = { order: this.props.itemOrdered, orderId: this.props.orderId }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.activeOrderActions.setItemsRequest(this.props.orderId, this.props.itemId, this.state.order, true)
  }
  handleChange (event) {
    this.setState({ order: event.target.value })
  }
  handleBlur (event) {
    event.preventDefault()
    this.props.activeOrderActions.setItemsRequest(this.props.orderId, this.props.itemId, this.state.order, true)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ order: nextProps.itemOrdered, orderId: nextProps.orderId })
    this.props.handleItemChange()
  }
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }
  render () {
    return <form onSubmit={this.handleSubmit}>
      <input type='text' value={this.state.order} onChange={this.handleChange}
        onBlur={this.handleBlur} className='order-qty' placeholder='0' />
    </form>
  }
}

ItemOrderForm.propTypes = {
  itemOrdered: PropTypes.number,
  orderId: PropTypes.number,
  activeOrderActions: PropTypes.object,
  itemId: PropTypes.any
}

class OrderModalItem extends Component {
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
        <ItemOrderForm
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

OrderModalItem.propTypes = {
  item: PropTypes.object,
  orderId: PropTypes.number,
  activeOrderActions: PropTypes.object
}

class OrderModal extends Component {
  constructor (props) {
    super(props)
    this.state = { confirm: false, comment: '' }
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeConfirm = this.handleChangeConfirm.bind(this)
    this.handleItemChange = this.handleItemChange.bind(this)
  }
  componentDidMount () {
    this.props.modalOrderActions.getOrderItems(this.props.orderId)
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
    const thisOrder = activeOrders.orders[modalOrder.shownOrderId] || {}
    console.log('modalOrder.shownOrderId',modalOrder.shownOrderId)
    console.log('activeOrders.orderList[modalOrder.shownOrderId]',activeOrders)
    const listItems = modalOrder.orderItems.map((item) =>
      <OrderModalItem
        item={item}
        key={modalOrder.shownOrderId + item.id}
        orderId={modalOrder.shownOrderId}
        ordered={activeOrders.orderList[modalOrder.shownOrderId][item.id].qty}
        activeOrderActions={activeOrderActions}
        discount={discount}
        handleItemChange={this.handleItemChange} />)
    return <div className='modal-dialog modal-lg modal-order'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>{thisOrder.name}</h4>
        </div>
        <div className='modal-body'>
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
              {listItems}
              <tr className='tr-order-total tr_middle'>
                <td className='label-amount' colSpan={6}> Итого: </td>
                <td className='label-amount' colSpan={2}><RenderCurrency price={thisOrder.amount} discount={discount} /> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='modal-footer'>
          <form onSubmit={this.handleSubmitOrder}>
            <div className='row'>
              <div className='col-xs-7'>
                <textarea className='form-control' placeholder='Коментарий к заказу' onChange={this.handleChange} value={this.state.comment} name='comment' />
              </div>
              <div className='col-xs-5'>
                <div className='checkbox'>
                  <label className='bg-success'>
                    <input type='checkbox' checked={this.state.confirm} onChange={this.handleChangeConfirm} /> Наименование товаров и количество в заказе указано верно.
                  </label>
                </div>
                <button type='button' className='btn btn-primary' disabled={!this.state.confirm} onClick={this.handleSubmitOrder}>Отправить заказ</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
  renderOrderCompeleted () {
    return <div className='modal-dialog modal-lg modal-order'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>Корзина заказа{this.props.modal.orderId}</h4>
        </div>
        <div className='modal-body'>
                        Спасибо! Ваш заказ отправлен.
                    </div>
        <div className='modal-footer' />
      </div>
    </div>
  }
  render () {
    if (this.props.order_completed === true) {
      return this.renderOrderCompeleted()
    } else if (this.props.modalOrder.shownOrderId) {
      return this.renderOrder()
    } else {
      return null
    }
  }
}

OrderModal.propTypes = {
  modalActions: PropTypes.object,
  activeOrderActions: PropTypes.object,
  modal: PropTypes.object
}

function mapStateToProps (state) {
  return {
    activeOrders: state.activeOrders,
    modalOrder: state.modalOrder,
    discount: state.discount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    activeOrderActions: bindActionCreators(activeOrderActions, dispatch),
    modalOrderActions: bindActionCreators(modalOrderActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderModal)
