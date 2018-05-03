import React from 'react'
import accounting from 'accounting'
import PropTypes from 'prop-types'

export function RenderCurrency (props) {
  if (props.price) {
  let price
  if (props.discount && props.discount.value > 0) {
    price = props.price * ((100 - props.discount.value) / 100)
  } else {
    price = props.price
  }
  return (<span>
    <span className='price-value'>{accounting.formatMoney(price, '', 2, ' ', ',')}</span>
    <span className='price-currency'>₽</span>
  </span>
  )
  }
  return null
}

export function ItemQty (props) {
  let qty = ''
  if (props.qty === 'in_stock') {
    return (<span className='glyphicon glyphicon-ok-sign' />)
  } else if (props.qty === 'out_of_stock') {
    return (<span className='glyphicon glyphicon-remove-sign' />)
  } else {
    return (<span>{props.qty}</span>)
  }
}

ItemQty.propTypes = {
  qty: PropTypes.string.isRequired
}

