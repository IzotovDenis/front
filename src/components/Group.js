import React, { Component } from 'react'
import Items from './items/Items'
import GroupNavigation from './GroupNavigation'
import PropTypes from 'prop-types'
import ItemsControl from './items/ItemsControl'
import Pagination from './items/Pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupActions from '../actions/groupActions'
import { parse } from 'qs'

class Group extends Component {
  componentWillMount () {
    let props = parse(this.props.location.search.substr(1))
    this.props.groupActions.getGroupRequest(this.props.match.params.groupsId, props)
  }
  componentWillReceiveProps (nextProps) {
    let props = parse(nextProps.location.search.substr(1))
    this.props.groupActions.getGroupRequest(nextProps.match.params.groupsId, props)
  }
  render () {
    const { match } = this.props
    console.log('render new')
    return <div id='content' className='content-alignment'>
      <GroupNavigation group={match.params.groupsId} />
      <ItemsControl filterButtons viewButtons groupId={this.props.match.params.groupsId} />
      <Items />
      <Pagination />
    </div>
  }
}

Group.propTypes = {
  params: PropTypes.object
}

function mapStateToProps (state, props) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    groupActions: bindActionCreators(groupActions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Group)

