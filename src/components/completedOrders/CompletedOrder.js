import React, { Component } from 'react'
import CompletedOrderItems from './CompletedOrderItems'
import { DateFormat } from '../../helper/Date'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as completedOrdersActions from '../../actions/completedOrdersActions'
import * as activeOrderActions from '../../actions/activeOrderActions'
import actionCable from 'actioncable'
const CableApp = {}
const Run = () => {
  console.log("HELLO BODY")
}
class CompletedOrder extends Component {
  constructor(props) {
    super(props)
    this.ff = this.ff.bind(this)
  }
  ff() {
    console.log('receiver')
    this.props.activeOrderActions.getActiveOrdersRequest()
  }
  componentWillMount () {
    const { ff } = this
    this.props.completedOrdersActions.getOrder(this.props.match.params.orderId)
    CableApp.cable = actionCable.createConsumer(`ws://192.168.0.39:3000/cable`)
    console.dir(CableApp)
    CableApp.cable.subscriptions.create("OrderChannel", {
      connected: function() {
        Run()
      },
      disconnected: function() {
        console.log("install")
      },
      received: function() {
        ff()
      },
      rejected: function() {
        console.log("install")
      }
    });
  }
  render () {
    const { completedOrders } = this.props
    const order = completedOrders.orders[this.props.match.params.orderId] || {}
    return <div>
      <div> <Link to='/orders' className='btn btn-default'> Все заказы </Link> </div>
      <h3>Заказ {this.props.match.params.orderId}</h3>
      <button onClick={() => CableApp.cable.server.broadcast("chat_", {
  sent_by: 'Paul',
  body: 'This is a cool chat app.'
})
}>HELLO </button>
      <p>Дата формирования {DateFormat(order.formed)}</p>
      { order &&
      <CompletedOrderItems items={order.items} />
      }
    </div>
  }
}

function mapStateToProps (state) {
  return {
    completedOrders: state.completedOrders
  }
}

function mapDispatchToProps (dispatch) {
  return {
    completedOrdersActions: bindActionCreators(completedOrdersActions, dispatch),
    activeOrderActions: bindActionCreators(activeOrderActions, dispatch)
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompletedOrder))
