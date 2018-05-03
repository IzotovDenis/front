import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemImage from '../items/ItemImage'

class ItemImageModal extends Component {
  render () {
    const { item } = this.props
    return <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4>{item.title}</h4>
        </div>
        <div className='modal-body center'>

        </div>
      </div>
    </div>
  }
}

ItemImageModal.defaultProps = {
  item: {}
}

ItemImageModal.propTypes = {
  modal: PropTypes.object
}

export default ItemImageModal
