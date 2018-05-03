import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modalActions'
import { PlusIcon } from '../../helper/Icons'
function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  }
}

class AddOrder extends React.Component {
  render() {
    const { modalActions } = this.props
    return <div className="cartv2_thumb cartv2_add_order" onClick={() => modalActions.setModalNewOrder()}>
        <div className="cartv2_icon">
          <PlusIcon/>
        </div>
        <div className="cartv2_thumb_content">
          Создать корзину
        </div>
      </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrder)