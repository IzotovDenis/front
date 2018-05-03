import React from 'react'
import PropTypes from 'prop-types'

class CartItemForm extends React.Component {
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

CartItemForm.propTypes = {
  itemOrdered: PropTypes.number,
  orderId: PropTypes.number,
  activeOrderActions: PropTypes.object,
  itemId: PropTypes.any
}

export default CartItemForm