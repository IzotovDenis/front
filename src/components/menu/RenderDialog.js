import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class RenderDialog extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.groups !== this.props.groups) {
      return true
    }
    return false
  }
  render () {
    if (this.props.groups instanceof Object) {
      let titleStyle = `menu-block ${this.props.head ? 'head-title' : ''}`
      let headDivPadding = `${this.props.head ? 'head-div-padding' : ''}`
      let nested = 1 + (this.props.nested || 1)
      let nestedStyle = ''
      if (nested > 2) {
        nestedStyle = 'nested_menu'
      }
      if (nested > 3) {
        return null
      }
      const Groups = this.props.groups.c.map((g, index) =>
        <li key={index}>
          <div className={headDivPadding}>
            <Link to={`/groups/${this.props.groups1[g.id].id}`}>
              <span className={titleStyle}>
                {this.props.groups1[g.id].title}
              </span>
              { this.props.groups1[g.id].new_items_count > 0
                ? <span className='menu-new'> ({this.props.groups1[g.id].new_items_count}) </span> : null}
            </Link>
            <RenderDialog groups={g} groups1={this.props.groups1} nested={nested} />
          </div>
        </li>)
      return <ul className={`${nestedStyle} ` + (this.props.head ? ` count-column-${this.props.groups.col}` : '')}>
        {Groups}
      </ul>
    }
    return null
  }
}

RenderDialog.propTypes = {
  groups: PropTypes.object,
  head: PropTypes.bool,
  nested: PropTypes.number,
  groups1: PropTypes.object
}
