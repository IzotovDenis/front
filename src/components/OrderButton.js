import React from 'react'

const OrderButton = (props) => {
  const { orderedItem, orderedItemCurrent, baseStyle } = props
  console.log(baseStyle)
  let ordered = parseInt(orderedItem)
  if (orderedItem === '' || orderedItem === 0) {
    ordered = 0
  }
  const button = {label: 'В КОРЗИНУ', style:'btn-order'}
  if (orderedItemCurrent > 0 && ordered === 0) {
    button.label = 'УБРАТЬ'
    button.style = 'btn-unorder'
  }
  if (orderedItemCurrent > 0 && ordered !== orderedItemCurrent && ordered !==0) {
    button.label = 'ПРИМЕНИТЬ'
    button.style = 'btn-order'
  }
  if (orderedItemCurrent > 0 && ordered === orderedItemCurrent) {
    button.label = 'В КОРЗИНЕ'
    button.style = 'btn-ordered'
  }
  return (
          <input type='submit'  
          value={button.label}
          className={baseStyle+ ' ' + button.style} />
  )
}

OrderButton.defaultProps = {
  baseStyle: 'btn btn-default btn-qty'
}

export default OrderButton