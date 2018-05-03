import React, { Component, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import DropdownBody from './DropdownBody'
import DropdownHead from './DropdownHead'
import './css/index.sass'
import cx from 'classnames'

export default class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = { active:false }
    this._onWindowClick = this._onWindowClick.bind(this)
    this._onToggleClick = this._onToggleClick.bind(this)
  }
  componentDidMount () {
    window.addEventListener('click', this._onWindowClick)
    window.addEventListener('touchstart', this._onWindowClick)
    console.log('render DROPDOWN')
  }

  componentWillUnmount () {
    window.removeEventListener('click', this._onWindowClick)
    window.removeEventListener('touchstart', this._onWindowClick)
  }
  _onWindowClick (event) {
    const dropdownElement = findDOMNode(this)
    if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
      this.hide()
    }
  }

  _onToggleClick (event) {
    event.preventDefault()
    if (this.isActive()) {
      this.hide()
    } else {
      this.show()
    }
  }

  isActive () {
    return (typeof this.props.active === 'boolean')
        ? this.props.active
        : this.state.active
  }

  hide () {
    this.setState({
      active: false
    }, () => {
      if (this.props.onHide) {
        this.props.onHide()
      }
    })
  }

  show () {
    this.setState({
      active: true
    }, () => {
      if (this.props.onShow) {
        this.props.onShow()
      }
    })
  }
  render () {
    const isOpen = cx({ 'pa-dropdown-active':this.state.active })
    let children = []
    if (Array.isArray(this.props.children)) {
      children = this.props.children
    }
    else {
      children.push(this.props.children)
    }
    const listChidren = children.map((child, index) => {
      if (child.type === DropdownHead) {
        child = cloneElement(child, { ...child.props, ...this.state, onClick: (event) => this._onToggleClick(event), key: index })
      }
      return cloneElement(child, { ...child.props, ...this.state, key: index, sr:'dsd' })
    }
      )
    return <div className={`pa-dropdown ${this.props.className} ${isOpen} `} ref='dropdown'>
      {listChidren}
    </div>
  }
}
