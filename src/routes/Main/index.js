/* global __API__ */
import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router-dom'
import Items from '../../components/items/Items'
import * as itemActions from '../../actions/itemActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function SamplePrevArrow (props) {
  const { style, onClick } = props
  return (
    <div
      className='slide-arrow slide-arrow-prev'
      style={{ ...style }}
      onClick={onClick}>
      <i class="fas fa-angle-left"></i>
     </div>
  )
}

function SampleNextArrow (props) {
  const { style, onClick } = props
  return (
    <div
      className='slide-arrow slide-arrow-next'
      style={{ ...style }}
      onClick={onClick}>
      <i class="fas fa-angle-right"></i>
     </div>
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
      prevArrow: <SamplePrevArrow />,
      nextArrow: <SampleNextArrow />
    }
    return <div>
      <div className='slider-body'>
        <Slider {...settings}>
          <div><Link to='http://localhost:3000/groups/163'><img src='http://planeta-avtodv.ru/uploads/ffile/10/c0c7c76d30bd3dcaefc96f40275bdc0a.png' /></Link></div>
          <div><img src='http://planeta-avtodv.ru/uploads/ffile/5/8e296a067a37563370ded05f5a3bf3ec.png' /></div>
        </Slider>
      </div>
        <Items viewStyle='thumbs' />
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