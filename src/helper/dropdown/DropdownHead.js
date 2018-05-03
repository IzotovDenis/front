import React, { Component } from 'react'

export default class DropdownHead extends Component {

  render () {
    return <div className={`pa-dropdown-header ${this.props.className}`} onClick={(event) => this.props.onClick(event)}>
      {this.props.children}
    </div>
  }
}
