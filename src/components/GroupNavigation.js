import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const svg = <svg className='group-navigation-svg-folder' x='0px' y='0px' width='20px' height='20px' viewBox='0 0 20 20' enableBackground='new 0 0 20 20'><path xmlns='http://www.w3.org/2000/svg' fill='#999' d='M13.2,0.8H7.8C7.8,0.3,7.4,0,7,0H0.8C0.3,0,0,0.3,0,0.8v12.4C0,13.7,0.3,14,0.8,14h12.4c0.4,0,0.8-0.3,0.8-0.8
	V1.6C14,1.1,13.7,0.8,13.2,0.8z M12.4,12.4H1.6v-7h10.9V12.4z M12.4,3.9H1.6V1.6h4.7v0.8h6.2V3.9z' /></svg>
class GroupNavigation extends Component {
  componentDidUpdate() {
    const { group, groups } = this.props
    document.title = `${groups[group].title} - Планета Авто`
  }
  render () {
    const { group, groups } = this.props
    if (!groups[group]) {
      return (null)
    }
    const ancestry = groups[group].ancestry
    let parents = []
    if (typeof ancestry === 'string') {
      parents = ancestry.split('/')
    }
    let children = [...parents, group].join('/')

    const getChildrens = function (o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
      s = s.replace(/^\./, '')           // strip a leading dot
      var a = s.split('/')
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i]
        if (k in o) {
          o = o[k]
        } else {
          return
        }
      }
      return o
    }

    const listParentGroup = parents.map((id, index) => {
      return (
        <li key={index} className={`li-group-navigation li-group-navigation-${index + 1}`}>
          <Link to={`/groups/${id}`}>
            {svg}{groups[id].title}
          </Link>
        </li>

      )
    }
  )

    function SortingGroups () {
      let el = []
      Object.keys(groups).map((id, index) => {
        if (groups[id].ancestry === children) {
          el.push(groups[id])
        }
      })
      return el.sort((a, b) => a.title.localeCompare(b.title))
    }

    const listGroup = SortingGroups().map((group, index) => {
      let id = group.id
      return (
        <li key={id} className='li-group-navigation li-group-navigation-1'>
          <Link key={index} to={`/groups/${id}`}>
            {svg}{groups[id].title}
          </Link>
        </li>
      )
    }
  )

    return <div>
      <ul className='group-navigation-parent-box'>
        {listParentGroup}
      </ul>
      <h4 className='group-navigation-current-group'>{groups[group].title}</h4>
      <ul className='group-navigation-parent-box group-navigation-sub-box '>
        {listGroup}
      </ul>
    </div>
  }
}

GroupNavigation.propTypes = {
  group: PropTypes.string.isRequired,
  groups: PropTypes.object.isRequired,
  tree: PropTypes.array
}

export default connect(
  (state) => {
    return {
      ...state.group
    }
  })(GroupNavigation)
