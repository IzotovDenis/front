import React, { Component } from 'react'
import { RenderCurrency, ItemQty } from '../../helper/Helper'
import ItemImage from './ItemImage'
import PropTypes from 'prop-types'
import ItemOrderForm from './ItemOrderForm'
import ItemNewLabel from './ItemNewLabel'
import OemList from './_OemList'
import { Link } from 'react-router-dom'

class Item extends Component {
  constructor (props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
  }
  handleItemClick (event) {
    this.props.modalActions.showItemModal(this.props.item)
  }
  handleChange (event) {
    this.setState({ orderedItem: { qty: event.target.value } })
  }
  handleImageClick (event) {
    if (this.props.item.image === true) {
      this.props.modalActions.showItemImageModal(this.props.item)
    }
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      return true
    }
    return false
  }
  render () {
    const { item, viewStyle, discount } = this.props
    return <div className='item'>
      <div className='cell item-photo' onClick={this.handleImageClick} >
        <div className='item-photo-prev'>
          <ItemImage itemId={item.id} size='thumbs' image={item.image} />
        </div>
        <ItemImage itemId={item.id} size={viewStyle} image={item.image} />
      </div>
      <div className='cell item-article'>
        <div className='item-article-kod'>
          <div className='item-article-label'>
            код товара
          </div>
          <div className='item-article-value'>
            {item.kod}
          </div>
        </div>
        <div className='item-article-kod'>
          <div className='item-article-label'>
            Артикул
          </div>
          <div className='item-article-value'>
            {item.article}
          </div>
        </div>
      </div>
      <div className='cell item-title'>
        <Link className='text' to={{ pathname: `/items/${item.kod}`, state: { modal: true, item: item }}}>
          {item.title}
        </Link>
        <OemList oems={item.oems} />
        <div className='item-offers'>
          <ItemNewLabel newLabel={item.new_label} />
        </div>
      </div>
      <div className='cell item-qty'>
        <ItemQty qty={item.qty} />
      </div>
      <div className='cell item-price'>
        <RenderCurrency price={item.price} discount={discount} />
        <span className='item-unit'>
          {`за ${item.unit}`}
        </span>
      </div>
      <div className='cell item-order'>
        <ItemOrderForm itemId={item.id}/>
      </div>
    </div>
  }
}

Item.defaultProps = {
  item: {},
  orderedItem: { qty: '' }
}

export default Item

Item.propTypes = {
  item: PropTypes.object.isRequired,
  orderedItems: PropTypes.object,
  order: PropTypes.object,
  user: PropTypes.object,
  orderId: PropTypes.number,
  activeOrderActions: PropTypes.object,
  modalActions: PropTypes.object,
  viewStyle: PropTypes.string,
  discount: PropTypes.object
}
