import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as cartActions from '../../actions/cartActions'

class OrderItemForm extends React.Component {
  constructor(props) {
    super(props)
    const { ordered } = this.props
    this.state = {ordered: ordered}
    this.handleBlur = this.handleBlur.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleBlur() {
    const { ordered } = this.state
    const { itemId, cartId } = this.props
    if (this.state.ordered !== this.props.ordered) {
    this.props.cartActions.setItemQty(cartId,itemId,ordered)
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ordered: nextProps.ordered})
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.refs.input.blur()
    }
  }
  render() {
    let { ordered } = this.state
    return <input className='form-control'
            ref="input"
            value={ordered} 
            onChange={(e) => this.setState({ordered: e.target.value})}
            onKeyPress={(e) => this.handleKeyPress(e)} 
            onBlur={() => this.handleBlur()}/>
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemForm)