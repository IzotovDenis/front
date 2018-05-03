import React, { Component } from 'react'
import Items from '../../components/items/Items'
import GroupNavigation from '../../components/GroupNavigation'
import PropTypes from 'prop-types'
import ItemsControl from '../../components/items/ItemsControl'
import Pagination from '../../components/items/Pagination'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupActions from '../../actions/groupActions'
import { parse } from 'qs'

class Group extends Component {
  componentWillMount () {
    let props = parse(this.props.location.search.substr(1))
    this.props.groupActions.getGroupRequest(this.props.match.params.groupsId, props)
  }
  componentWillReceiveProps (nextProps) {
    let substr = (this.props.location.search.substr(1) === nextProps.location.search.substr(1))
    let groupId = (this.props.match.params.groupsId === nextProps.match.params.groupsId)
    if (!substr || !groupId) {
      let props = parse(nextProps.location.search.substr(1))
      this.props.groupActions.getGroupRequest(nextProps.match.params.groupsId, props)
    }
  }
  render () {
    const { match } = this.props
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

