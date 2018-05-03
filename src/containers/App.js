import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Menu from '../components/menu/Menu.js'
import Head from '../components/head/Head.js'
import Modals from '../components/Modals'
import ModalBackDrop from '../helper/modal/modalBackDrop'
import SearchBox from '../components/SearchBox'
import Main from '../components/Main'
import Group from '../components/Group'
import Search from '../components/Search'
import ProfileIndex from '../components/Profile/Index'
import CompletedOrders from '../components/completedOrders/CompletedOrders'
import CompletedOrder from '../components/completedOrders/CompletedOrder'
import * as userActions from '../actions/userActions'
import * as itemActions from '../actions/itemActions'
import * as completedOrdersActions from '../actions/completedOrdersActions'
import * as activeOrderActions from '../actions/activeOrderActions'
import * as groupActions from '../actions/groupActions'
import * as modalActions from '../actions/modalActions'
import * as searchActions from '../actions/searchActions'
import * as viewActions from '../actions/viewActions'
import * as discountActions from '../actions/discountActions'
import * as modalOrderActions from '../actions/modalOrderActions'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles.sass'

class App extends Component {
  componentWillMount () {
    this.props.userActions.getUserRequest()
    this.props.activeOrderActions.getActiveOrdersRequest()
    this.props.groupActions.getGroupsRequest()
  }
  render () {
    return <Router>
      <div>
        <Head />
        <div className='page-wrapper'>
          <Menu />
          <div id='centerblock-wrapper'>
            <div className='search-wrapper'>
              <SearchBox />
            </div>
            <div id='centerblock'>
              <Route exact path='/' component={Main} />
              <Route path='/groups/:groupsId' component={Group} />
              <Route exact path='/orders' component={CompletedOrders} />
              <Route path='/orders/:orderId' component={CompletedOrder} />
              <Route path='/search' component={Search} />
              <Route exact path='/profile' component={ProfileIndex} />
              <Route path='/profile/:page' component={ProfileIndex} />
            </div>
          </div>
        </div>
        <Modals {...this.props} />
        <ModalBackDrop />
      </div>
    </Router>
  }
}

App.propTypes = {
  userActions: PropTypes.object,
  activeOrderActions: PropTypes.object,
  groupActions: PropTypes.object,
  group: PropTypes.object,
  children: PropTypes.object
}

function mapStateToProps (state) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch),
    activeOrderActions: bindActionCreators(activeOrderActions, dispatch),
    completedOrdersActions: bindActionCreators(completedOrdersActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch),
    modalActions: bindActionCreators(modalActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch),
    viewActions: bindActionCreators(viewActions, dispatch),
    modalOrderActions: bindActionCreators(modalOrderActions, dispatch),
    discountActions: bindActionCreators(discountActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
