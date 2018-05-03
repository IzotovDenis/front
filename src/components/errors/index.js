import React, { Component } from 'react'
import { connect } from 'react-redux'

class IndexError extends Component {
  render () {
    return <div> ATTENTION!!! SOME ERRORS </div>
  }
}

export default connect(
  (state) => {
    return { ...state.error }
  })(IndexError)
