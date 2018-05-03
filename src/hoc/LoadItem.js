import React from 'react'
import './css/loadItems.css'

function loadItem (Component) {
  return class LoadItem extends React.Component {
    render () {
      const { items } = this.props
      if (items.loaded) {
        return <Component {...this.props} />
      } else {
        return <div className='loader'>Loading...</div>
      }
    }
  }
}

export default loadItem
