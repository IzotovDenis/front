import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../../helper/dropdown/Dropdown'
import DropdownHead from '../../helper/dropdown/DropdownHead'
import DropdownBodyList from '../../helper/dropdown/DropdownBodyList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as discountActions from '../../actions/discountActions'

class UserHeadDiscountDropdown extends Component {
  render () {
    const { discount, discountActions } = this.props
    const discounts = []
    const discountsArray = [1, 2, 3, 4, 5, 6, 7]
    discounts.push(<div key={0} onClick={() => discountActions.setDiscountValue(0)}> убрать скидку </div>)
    discounts.push(<div data-parent-class='pa-dropdown-label' key={100}>установить скидку:</div>)
    discountsArray.map((val) => {
      let _className
      if (discount.value === val) {
        _className = 'pa-discount-active'
      }
      discounts.push(<div data-parent-class={_className} key={val} onClick={() => discountActions.setDiscountValue(val)}>{`${val} %`}</div>)
    })
    return <Dropdown className='user-head-discount-dropdown'>
      <DropdownHead className='user-head-discount-dropdown-head'>
        <span className='user-head-discount-dropdown-label'>Скидка {discount.value}%</span>
      </DropdownHead>
      <DropdownBodyList>
        {discounts}
      </DropdownBodyList>
    </Dropdown>
  }
}

UserHeadDiscountDropdown.propTypes = {
  discount: PropTypes.object,
  discountActions: PropTypes.object
}

export default connect(
  (state) => {
    return {
      discount: state.discount }
  },
  (dispatch) => {
    return {
      discountActions: bindActionCreators(discountActions, dispatch)
    }
  })(UserHeadDiscountDropdown)
