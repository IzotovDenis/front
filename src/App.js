import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Menu from './components/menu/Menu.js'
import Head from './components/head/Head.js'
import CartExperemental from './components/CartExperemental'
import Modals from './components/Modals'
import Main from './routes/Main'
import Group from './routes/Group'
import Item from './routes/Item'
import ItemModal from './components/modals/ItemModal'
import Search from './routes/Search'
import ProfileIndex from './routes/Profile'
import CompletedOrders from './components/completedOrders/CompletedOrders'
import CompletedOrder from './components/completedOrders/CompletedOrder'
import * as userActions from './actions/userActions'
import * as activeOrderActions from './actions/activeOrderActions'
import * as groupActions from './actions/groupActions'
import * as modalBackdropActions from './actions/modalBackdropActions'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import PropTypes from 'prop-types'
import './styles.sass'
import ReactDOM from 'react-dom'

class App extends Component {
  componentWillMount () {
    this.props.userActions.getUserRequest()
    this.props.activeOrderActions.getActiveOrdersRequest()
    this.props.groupActions.getGroupsRequest()
    this.el = document.getElementById("route-modal")
    const modalRoot = document.body;
    modalRoot.appendChild(this.el);
  }
  render () {
    return <Router>
      <div className='app-container'>
        <Head />
        <div className='page-wrapper'>
          <Menu />
          <div className='centerblock-wrapper'>
            <div className='centerblock'>
              <Route component={ModalSwitch} />
            </div>
          </div>
        </div>
        <Route path='/cart' component={CartExperemental} />
        <Modals {...this.props} />
        {ReactDOM.createPortal(<ModalBackDrop1/>, this.el)}
      </div>
    </Router>
  }
}

class ModalSwitch extends React.Component {
  previousLocation = this.props.location;
  componentWillMount() {
    this.props.history.replace({
        pathname: this.previousLocation.pathname,
        state: {}
    });
  }

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render
    const isCart = !!(
      location.pathname === "/cart" &&
      this.previousLocation !== location
    ); // not initial render
    return (
      <div>
        <Switch location={(isModal || isCart) ? this.previousLocation : location}>
              <Route exact path='/' component={Main} />
              <Route path='/groups/:groupsId' component={Group} />
              <Route exact path='/orders' component={CompletedOrders} />
              <Route path='/orders/:orderId' component={CompletedOrder} />
              <Route path='/search' component={Search} />
              <Route exact path='/profile' component={ProfileIndex} />
              <Route path='/profile/:page' component={ProfileIndex} />
              <Route path='/items/:itemId' component={Item} />
              <Route path='/cart' component={CartExperemental} />
        </Switch>
        {isModal ? <Route path="/" component={Modal} /> : null}
      </div>
    );
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    //
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {

    this.props.modalBackdropActions.addModal()
  }
  componentWillUnmount() {
    this.props.modalBackdropActions.destroyModal()
  }
  handleClick(e) {
    if (e.target.id === 'route-modal-dialog') {
      this.props.history.goBack()
    }
  }
  render() {
    return (
        <div id='route-modal-dialog' className='modal' onClick={(e) => this.handleClick(e)}>
            <Route path='/items/:itemId' component={ItemModal} />
        </div>
    ) 
  }
}

Modal = connect(
  (state) => { 
    return {
    }
  },
  dispatch => {
    return {
      modalBackdropActions: bindActionCreators(modalBackdropActions, dispatch)
    }
  }
)(Modal)


class ModalBackDrop1 extends React.Component {
  render() {
    const { zIndex, shown } = this.props.modalBackdrop
    if (shown) {
      return <ModalBackDropDiv zIndex={zIndex}/>
    }
    return null
}
}
ModalBackDrop1 = connect((state) => { return { modalBackdrop: state.modalBackdrop}})(ModalBackDrop1)

class ModalBackDropDiv extends React.Component {
  componentWillMount() {
    document.body.className += 'modal-open'
  }
  componentWillUnmount() {
    document.body.className = ''
  }
  render() {
    const {zIndex} = this.props
    return <div className="modal-backdrop fade show" style={{zIndex: zIndex}}></div>
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
    activeOrderActions: bindActionCreators(activeOrderActions, dispatch),
    groupActions: bindActionCreators(groupActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
