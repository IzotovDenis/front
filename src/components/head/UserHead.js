import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserHeadProfileDropdown from './UserHeadProfileDropdown'
import UserHeadDiscountDropdown from './UserHeadDiscountDropdown'
import UserHeadCartDropdown from './UserHeadCartDropdown'

export default class UserHead extends Component {
  render () {
    return <div className='flex-container'>
        <UserHeadDiscountDropdown />
        <UserHeadProfileDropdown />
        <UserHeadCartDropdown />
    </div>
  }
}

UserHead.propTypes = {
  discount: PropTypes.object,
  discountActions: PropTypes.object
}

