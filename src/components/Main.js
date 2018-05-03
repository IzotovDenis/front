/* global __API__ */
import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import trackImg from '../images/trackparts.jpg'
import { Link } from 'react-router-dom'
import TruckPartsAdv from './adv/TruckPartsAdv'
import Items from './items/Items'
import * as itemActions from '../actions/itemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function SampleNextArrow (props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
     />
  )
}

class Main extends Component {
  componentWillMount () {
    this.props.itemActions.loadPopularItems(12)
  }
  render () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />
    }
    return <div>
      <div className='row'>
        <div className='col-xs-12'>
          <div className='slider-body'>
            <Slider {...settings}>
              <div><Link to='http://localhost:3000/groups/163'><img src='http://planeta-avtodv.ru/uploads/ffile/10/c0c7c76d30bd3dcaefc96f40275bdc0a.png' /></Link></div>
              <div><img src='http://planeta-avtodv.ru/uploads/ffile/5/8e296a067a37563370ded05f5a3bf3ec.png' /></div>
            </Slider>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-6'>
          <img src={trackImg} />
        </div>
        <div className='col-xs-6'>
          <img src={trackImg} />
        </div>
        <Items viewStyle='thumbs' />
      </div>
    </div>
  }
}

function mapStateToProps (state) {
  return {
  }
} 

function mapDispatchToProps (dispatch) {
  return {
    itemActions: bindActionCreators(itemActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)