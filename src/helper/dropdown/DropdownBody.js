import React, { Component } from 'react'

class DropdownBody extends Component {
  componentWillMount() {
    document.getElementById('modal-backdrop').style.display = 'block'
    document.getElementById('head').style.zIndex = '1041'
  }
  componentWillUnmount() {
    document.getElementById('modal-backdrop').style.display = 'none'
    document.getElementById('head').style.zIndex = '60'
  }
  render () {
    return <div className={`pa-dropdown-body`}>
        {this.props.children}
    </div>
  }
}

DropdownBody.defaultProps = {
  children: []
}

export default DropdownBody
