import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ProfileUser from './User'
import ProfilePassword from './Password'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/userActions'

class ProfileIndex extends Component {
  render () {
    let page = 'index'
    switch (this.props.match.params.page) {
      case 'index':
        page = 'index'
        break
      case 'password':
        page = 'password'
        break
    }
    const tabs = [{ name: 'Карточка клиента', page: 'index', component: ProfileUser },
                { name: 'Пароль', page: 'password', component: ProfilePassword }]
    const components = { 'index': <ProfileUser />, 'password': <ProfilePassword /> }
    const listTabs = tabs.map((tab, index) => {
      return <li key={index} className={tab.page === page ? 'active' : ''}> <Link to={`profile/${tab.page}`}> {tab.name} </Link> </li>
    })
    return <div> <ul className='nav nav-tabs'>
      {listTabs}
    </ul>
      {React.cloneElement(components[page], { user: this.props.user, userActions: this.props.userActions })}
    </div>
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToActions (dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToActions)(ProfileIndex))
