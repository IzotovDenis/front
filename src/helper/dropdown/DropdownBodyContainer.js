import React from 'react'
import DropdowBody from './DropdownBody'

class DropdownBodyContainer extends React.Component {
  render() {
    const {active} = this.props
    if (active) {
    return (
    <DropdowBody children={this.props.children}/>
    )}
    return null
  }
}

export default DropdownBodyContainer