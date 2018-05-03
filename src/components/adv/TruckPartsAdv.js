import React, { Component } from 'react'
import './css/truckpartsadv.sass'
import { Link } from 'react-router-dom'

export default class TruckPartsAdv extends Component {
  render () {
    return <div className='truck-parts-adv'>
      <div className='truck-parts-image' />
      <Link to='groups/1107'>
        <div className='truck-parts-title'>
          ЗАПЧАСТИ ДЛЯ ГРУЗОВИКОВ
          </div>
      </Link>
    </div>
  }
}
