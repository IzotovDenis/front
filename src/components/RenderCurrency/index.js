import React from 'react'
import accounting from 'accounting'
import PropTypes from 'prop-types'

export default function RenderCurrency (props) {
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

RenderCurrency.propTypes = {
  price: PropTypes.number.isRequired,
  discount: PropTypes.object
}

