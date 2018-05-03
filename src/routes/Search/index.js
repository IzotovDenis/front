import React, { Component } from 'react'
import Items from '../../components/items/Items'
import PropTypes from 'prop-types'
import SorryImg from '../../images/sorry.png'
import Pagination from '../../components/items/Pagination'
import ItemsControl from '../../components/items/ItemsControl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActions from '../../actions/searchActions'
import { withRouter } from 'react-router'
import { parse } from 'qs'

const SearchResult = (search) => {
  return <div>
    <span className='search-head'> Результат поиска <span className='search-query'>{search.query_string} </span> </span>
    { (search.total_entries === 0 && search.fetching === false) &&
      <img src={SorryImg} />}
  </div>
}

class Search extends Component {
  searchRequest (props) {
    let query = parse(props.location.search.substr(1))
    this.props.searchActions.searchRequest(query)
  }
  componentWillMount () {
    this.searchRequest(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.searchRequest(nextProps)
  }
  RenderNoResult (search) {
    return <div>
      <h4>Результаты поиска: {search.query_string}</h4>
      <img src={SorryImg} />
    </div>
  }

  RenderFetching () {
    return <div> Идет поиск </div>
  }

  RenderItems () {
    return <Items {...this.props} />
  }

  render () {
    const { search, view, user, items, activeOrders, modalActions, router, discount } = this.props
    return <div id='content' className='content-alignment'>
      <SearchResult {...search} />
      <ItemsControl filterButtons={false} viewButtons {...this.props} />
      <Items />
      <Pagination />
    </div>
  }
}

Search.propTypes = {
  search: PropTypes.object,
  view: PropTypes.object
}

export default withRouter(connect(
  (state) => {
    return {
    }
  },
  (dispatch) => {
    return {
      searchActions: bindActionCreators(searchActions, dispatch)
    }
  })(Search))
