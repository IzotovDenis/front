import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './css/oemlist.sass'

export default class OemList extends Component {
  constructor (props) {
    super(props)
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.oems !== this.props.oems) {
      return true
    }
    return false
  }
  parseOems () {
    const { oems } = this.props
    if (oems !== null) {
      let oemList = oems.split(',')
      const listOems = oemList.slice(0, 5).map((oem, index) =>
        <Link className='oem cursor-pointer' key={index} to={`/search?q=${oem}`}> {oem.trim()} </Link>)
      const othersOems = () => {
        if (oemList.length > 5) {
          return <span> и еще {oemList.length-4} OEM</span>
        } else { return null }
      }
      return <div className='oems-list'>
        <span className='oems-label'>OEM: </span>
        {listOems}
        {othersOems()}
      </div>
    } else {
      return null
    }
  }
  render () {
    const { oems } = this.props
    return this.parseOems()
  }
}

OemList.propTypes = {
  oems: PropTypes.string
}
