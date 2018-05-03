import React from 'react'
import ItemImage from '../items/ItemImage'
import DeleteItemIcon from './DeleteItemIcon'
import DeleteItemBtn from './DeleteItemBtn'
import OrderItemForm from './OrderItemForm'
import OrderItemCheckBox from './OrderItemCheckBox'
import OrderEmpty from './OrderEmpty'
import { RenderCurrency } from '../../helper/Helper'
import {connect} from 'react-redux'

class OrderBody extends React.Component {
  render() {
    const { cart } = this.props
    if (cart.fetching) {
      return <div className='cartv2_order_body cart_bg cartv2_empty progress-bar-animated'>
        <div className='row cartv2_empty_label'>
          Загрузка корзины...
        </div>
        </div>
    }
    if (cart.items.length !== 0) {
      return <OrderList cart={cart}/>
    }
    else {
      return <OrderEmpty cartId={cart.cartId} />
    }
}
}

class OrderList extends React.Component {
  render() {
    const { cart } = this.props
    return <div className='cartv2_order_body cartv2_table lovely_scroll'>
      <OrderHead cart={cart}/>
      <div className='cart_bg'>
      {cart.items.map((item) => {
      return <OrderItem item={item} key={item.id} cartId={cart.cartId}/>
    })
  }
  </div>
  </div>
}
}

class OrderItem extends React.PureComponent {
  state = {checked: false}
  render() {
    const { item, cartId, discount } = this.props
  return (
    <div className={`table-row cartv2_order_item ${(item.ordered === "0") ? 'cartv2_unordered': null}`}>
      <div className='cell cartv2_order_head_select'>
        <OrderItemCheckBox cartId={cartId} itemId={item.id} />
      </div>
      <div className='cell cartv2_order_head_img'>
        <ItemImage itemId={item.id} size='table' image={item.image} />
      </div>
      <div className='cell cartv2_order_head_code'>
        <div className='cartv2_order_head_code_block'>
          <div className='item-article-label'>
            код
          </div>
          <div className='item-article-value'>
            {item.kod}
          </div>
          <div className='item-article-label'>
            артикул
          </div>
          <div className='item-article-value'>
            {item.article}
          </div>
        </div>
      </div>
      <div className='cell cartv2_order_head_title'>
        <div className='cartv2_title_label_container'>
          <ItemLabel item={item} />
        </div>
        {item.title}
      </div>
      <div className='cell cartv2_order_head_price'>
        <RenderCurrency price={item.price} discount={discount} />
        <span className="item-unit">за шт</span>
      </div>
      <div className='cell cartv2_order_head_qty'>
        {item.qty}
      </div>
      <div className='cell cartv2_order_head_ordered'>
        <OrderItemForm ordered={item.ordered} itemId={item.id} cartId={cartId} />
      </div>
      <div className='cell cartv2_order_head_amount'>
        <RenderCurrency price={item.price*item.ordered} discount={discount} />
      </div>
      <DeleteItemIcon itemId={item.id} cartId={cartId} />
      <DeleteItemBtn itemId={item.id} cartId={cartId} />
    </div>
  )
  }
}

OrderItem = connect(state => {return { discount: state.discount}})(OrderItem)

const OrderHead = (props) => {
  const {cart} = props
  if (cart.items.length === 0) {
    return null
  }
  return (
    <div className='table-row cartv2_order_head'>
      <div className='cell cartv2_order_head_select'>
      </div>
      <div className='cell cartv2_order_head_img'>
      </div>
      <div className='cell cartv2_order_head_code'>
        код/артикул
      </div>
      <div className='cell cartv2_order_head_title'>
        наименование
      </div>
      <div className='cell cartv2_order_head_price'>
        цена
      </div>
      <div className='cell cartv2_order_head_qty'>
        остаток
      </div>
      <div className='cell cartv2_order_head_ordered'>
        заказ
      </div>
      <div className='cell cartv2_order_head_amount'>
        сумма
      </div>
      <div className='cell cartv2_order_head_delete'>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

const ItemLabel = (props) => {
  const {item} = props
  let labels = []
  if (item.booking) {
    labels.push(<div className='item_label'>
            <div className='item_label_text'>
              Товар под заказ
            </div>
          </div>)
  }
  if (labels.length > 0) {
    return labels.map((label, index) => {
      return label
    })
  }
  return null
}

export default connect(mapStateToProps)(OrderBody)