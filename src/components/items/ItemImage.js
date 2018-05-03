import React, { Component } from 'react'
import md5 from 'md5'
import PropTypes from 'prop-types'

function RenderImage (props) {
  const { itemId, size, image } = props
  const i = { table: { noimage: 'img_thumb', isize: 'thumb' },
    thumbs: { noimage: 'img_thumb_m', isize: 'thumb_m' },
    img_item: { noimage: 'img_item', isize: 'item' },
    large: { noimage: 'img_large', isize: 'large' }
  }
  if (image) {
    return (
      <img
        src={`${process.env.REACT_APP_HOST}/uploads/item/${itemId % 20}/${i[size].isize}_${md5(itemId + i[size].isize)}.jpg`}
    />)
  }
  return (
    <div className={i[size].noimage} />
  )
}

RenderImage.propTypes = {
  itemId: PropTypes.number,
  size: PropTypes.string,
  image: PropTypes.bool
}

export default class ItemImage extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return true
  }
  render () {
    return <RenderImage {...this.props} />
  }
}
