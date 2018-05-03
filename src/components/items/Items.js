import React, { Component } from 'react'
import Item from './Item'
import PropTypes from 'prop-types'
import loadItem from '../../hoc/LoadItem'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import * as activeOrderActions from '../../actions/activeOrderActions'

const RenderHead = (props) => {
  console.log(props)
  return (
    <div className='item-list-table-head'>
      <div className='cell item-photo'>Картинка</div>
      <div className='cell item-article'>Код/артикул</div>
      <div className='cell item-title'>Наименование </div>
      <div className='cell item-qty'>Остаток</div>
      <div className='cell item-price'>Цена</div>
      <div className='cell item-order'>Заказ</div>
    </div>
  )
}

RenderHead.propTypes = {
  length: PropTypes.number
}

class Items extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }
  render () {
    const { user, items, activeOrderActions, modalActions, viewStyle, discount, orderedItems, orderId } = this.props
    const listItems = items.list.map((item, index) => {
      return <Item
        item={item}
        key={item.id}
        modalActions={modalActions}
        orderId={orderId}
        discount={discount}
        user={user}
        activeOrderActions={activeOrderActions}
        viewStyle={viewStyle} />
    }
  )
    return <div className={`item-list-${viewStyle} item-new`}>
      <RenderHead items={items} />
      {listItems}
    </div>
  }
}

Items.propTypes = {
  items: PropTypes.object.isRequired,
  user: PropTypes.object,
  activeOrders: PropTypes.object,
  modalActions: PropTypes.object,
  activeOrderActions: PropTypes.object,
  discount: PropTypes.object,
  viewStyle: PropTypes.string
}

export default connect(
  (state, ownProps) => {
    return {
      user: state.user,
      items: state.items,
      orderedItems: state.activeOrders.orderList[state.activeOrders.currentOrderId] || {},
      orderId: state.activeOrders.currentOrderId,
      discount: state.discount,
      viewStyle: ownProps.viewStyle || state.view.style
    }
  },
  (dispatch) => {
    return {
      modalActions: bindActionCreators(modalActions, dispatch),
      activeOrderActions: bindActionCreators(activeOrderActions, dispatch)
    }
  })(loadItem(Items))
