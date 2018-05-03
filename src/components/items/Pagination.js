import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { parse } from 'qs'
import { connect } from 'react-redux'
import './css/pagination.sass'

class Pagination extends Component {
  render () {
    const { currentPage } = this.props
    const buildUrl = (page) => {
      let url = ''
      let urlParams = parse(this.props.location.search.substr(1))
      let query = { ...urlParams, page: page }
      let params = []
      for (let d in query) {
        params.push(encodeURIComponent(d) + '=' + encodeURIComponent(query[d]))
      }
      url = this.props.location.pathname + '?' + params.join('&')
      return url
    }
    function calcPages (num = 0, perPage = 60) {
      let count = parseInt(num / perPage)
      if ((num % perPage) != 0) {
        count++
      }
      return count
    }
    let pages = []
    let countPages = calcPages(this.props.items.totalEntries)
    if (countPages > 1) {
      for (let i = 1; i <= countPages; i++) {
        if (currentPage === i) {
          pages.push(<span className='pagination-item pagination-item-active' key={i}>{i}</span>)
        } else {
          pages.push(<Link to={`${buildUrl(i)}`} className='pagination-item' key={i}>{i}</Link>)
        }
      }
    }
    return <div className='pagination-box'>
      {pages}
    </div>
  }
}

function mapStateToProps (state, props) {
  return {
    items: state.items,
    currentPage: parseInt(parse(props.location.search.substr(1)).page || 1)
  }
}

export default withRouter(connect(mapStateToProps)(Pagination))
