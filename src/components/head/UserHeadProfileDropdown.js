import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../../helper/dropdown/Dropdown'
import DropdownHead from '../../helper/dropdown/DropdownHead'
import DropdownBodyList from '../../helper/dropdown/DropdownBodyList'
import * as userActions from '../../actions/userActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { UserIcon } from '../../helper/Icons' 
import cookie from 'react-cookie'

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}


class UserHeadProfileDropdown extends Component {
  constructor (props) {
    super(props)
    this.LogOut = this.LogOut.bind(this)
  }
  LogOut () {
    this.props.userActions.logoutUser()
  }
  componentWillUpdate () {
  }
  render () {
    return <Dropdown className='user-head-profile-dropdown'>
      <DropdownHead className='user-head-profile-dropdown-width'>
        <div className='user-head-profile'><UserIcon/></div>
      </DropdownHead>
      <DropdownBodyList>
        <Link to='/profile'> Профиль </Link>
        <Link to='/orders'> История заказов </Link>
        <span onClick={() => this.LogOut()}> Выйти </span>
      </DropdownBodyList>
    </Dropdown>
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHeadProfileDropdown)