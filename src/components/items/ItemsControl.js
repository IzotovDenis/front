import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import OnlyNew from './OnlyNew'
import * as viewActions from '../../actions/viewActions'
import * as filterActions from '../../actions/filterActions'

class ItemsControl extends Component {
  constructor (props) {
    super(props)
    this.handleIsNew = this.handleIsNew.bind(this)
    this.handleOnlyInStock = this.handleOnlyInStock.bind(this)
  }
  handleIsNew () {
    this.props.filterActions.setFilterIsNew()
  }
  componentWillMount () {
  }
  handleOnlyInStock () {
    this.props.filterActions.setFilterOnlyInStock()
  }
  _render () {
    const { view, filterButtons, viewButtons, isGroup, group } = this.props
    return <div className='items-control row'>
      <div className='col-6'>
        <OnlyNew />
      </div>
      <div className='col-6 items-buttons'>
        { filterButtons
          ? <label className={`btn btn-xs btn-default ${view.onlyInStock ? 'btn-success' : 'btn-default'}`}
            onClick={this.handleOnlyInStock}>только в наличии</label>
          : null}
        { viewButtons
          ? <span className='btn btn-default'
            onClick={() => this.props.viewActions.setViewStyle('table')}>
            <i class="fas fa-th-list"></i>
          </span>
          : null}
        { viewButtons
          ? <span className='btn btn-default'
            onClick={() => this.props.viewActions.setViewStyle('thumbs')}>
            <i class="fas fa-th"></i>
          </span>
          : null}
      </div>
    </div>
  }
  render () {
    const { items } = this.props
    if (items.totalEntries > 0) {
      return this._render()
    } else {
      return null
    }
  }
}

ItemsControl.propTypes = {
  view: PropTypes.object,
  viewActions: PropTypes.object,
  filterButtons: PropTypes.bool,
  viewButtons: PropTypes.bool,
  filterActions: PropTypes.object
}

export default withRouter(connect(
  (state) => {
    return {
      items: state.items,
      view: state.view,
      filters: state.filters
    }
  },
  (dispatch) => {
    return {
      viewActions: bindActionCreators(viewActions, dispatch),
      filterActions: bindActionCreators(filterActions, dispatch)
    }
  })(ItemsControl))
