import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { RenderCurrency } from '../../helper/Helper'
import { DateFormat } from '../../helper/Date'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as completedOrdersActions from '../../actions/completedOrdersActions'

class OrderList extends Component {
  render () {
    const { order } = this.props
    return <tr>
      <td>{order.id}</td>
      <td>{order.name}</td>
      <td>{order.comment}</td>
      <td>{DateFormat(order.formed)}</td>
      <td><RenderCurrency price={order.amount} /></td>
      <td><Link to={`/orders/${order.id}`} className='btn btn-default btn-xs'>открыть</Link> </td>
    </tr>
  }
}

OrderList.propTypes = {
  order: PropTypes.object
}

class Orders extends Component {
  componentWillMount () {
    this.props.completedOrdersActions.getOrdersCompleted()
  }
  render () {
    const listOrders = this.props.completedOrders.ids.map((order, index) =>
      <OrderList key={index} order={this.props.completedOrders.orders[order]} />)
    return <div id='content' className='content-alignment'>
      <h1> История заказов </h1>
      <div className='pa-card'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Название</th>
              <th>Комментарий</th>
              <th>Дата</th>
              <th>Сумма</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {listOrders}
          </tbody>
        </table>
      </div>
    </div>
  }
}

Orders.propTypes = {
  completedOrdersActions: PropTypes.object,
  orders: PropTypes.object
}

function mapStateToProps (state) {
  return {
    completedOrders: state.completedOrders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    completedOrdersActions: bindActionCreators(completedOrdersActions, dispatch)
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders))
