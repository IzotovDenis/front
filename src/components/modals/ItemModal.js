import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemImage from '../items/ItemImage'
import Item from '../../routes/Item'
import { Link } from 'react-router-dom'
import { RenderCurrency } from '../../helper/Helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modalActions'


class ItemModal extends Component {
  constructor (props) {
    super(props)
    this.handleImageClick = this.handleImageClick.bind(this)
  }
  handleImageClick (event) {
    this.props.modalActions.showItemImageModal(this.props.item)
  }
  componentWillMount () {
    //this.props.modalActions.modalItemRequest(this.props.item.kod, this.props.modalId + 1)
  }
  render () {
    const { item, discount } = this.props
    return <div className='modal-dialog modal-item'>
      <div className='modal-content'>
        <Item />
      </div>
    </div>
  }
}

ItemModal.propTypes = {
  modalActions: PropTypes.object,
  modal: PropTypes.object
}

ItemModal.defaultProps = {
  item: {}
}

function mapStateToProps (state) {
  return {
    discount: state.discount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)