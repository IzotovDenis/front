import React, { Component } from 'react'

class DropdownBodyList extends Component {
  render () {
    let children = []
    if (Array.isArray(this.props.children)) {
      children = this.props.children
    } else {
      children.push(this.props.children)
    }
    const listChidren = children.map((child, index) => {
      let _className = ''
      if (typeof child.props['data-parent-class'] !== 'undefined') {
        _className = child.props['data-parent-class']
      }
      return <li className={`pa-dropdown-item ${_className}`} key={index}> {child} </li>
    }
      )
    return <div className={`pa-dropdown-body`}>
      <ul className='pa-dropdown-list'>
        {listChidren}
      </ul>
    </div>
  }
}

DropdownBodyList.defaultProps = {
  children: []
}

export default DropdownBodyList
