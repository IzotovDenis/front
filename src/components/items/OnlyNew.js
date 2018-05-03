import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { parse } from 'qs'

class OnlyNew extends Component {
  render () {
    const { isGroup, group, location, match } = this.props
    const isOnlyNew = parse(location.search.substr(1)).only_new || false
    console.log(isOnlyNew)
    if (isGroup && group.new && !isOnlyNew) {
      return <Link to={`${match.url}?only_new=true`} className='label label-green label-new' >Показать только новинки</Link>
    } else if (isGroup && group.new && isOnlyNew) {
      return <Link to={`${match.url}`} className='label label-default'> Внимание! Показываются только новинки. Показать все товары </Link>
    } else {
      return null
    }
  }
}

function mapStateToProps (state, props) {
  let _state = {}
  if (props.match.params.groupsId) {
    _state = { ..._state, isGroup: true, group: state.group.groups[parseInt(props.match.params.groupsId)] || {} }
  }
  return {
    ..._state
  }
}

export default withRouter(connect(mapStateToProps)(OnlyNew))
