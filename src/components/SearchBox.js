import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as groupActions from '../actions/groupActions'

class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = { search_string:'' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.history.push(`/search?q=${this.state.search_string}`)
  }
  handleChange (event) {
    this.setState({ search_string: event.target.value })
  }
  render () {
    return <div id='search-wrapper'>
      <form className='search-form' onSubmit={this.handleSubmit}>
        <input className='form-control search-input' type='text'
          value={this.state.search_string} onChange={this.handleChange} placeholder='Поиск по каталогу товаров'/>
        <input className='btn btn-search' type='submit' value='Найти' />
      </form>
    </div>
  }
}

SearchBox.propTypes = {
  router: PropTypes.object
}

export default withRouter(SearchBox)