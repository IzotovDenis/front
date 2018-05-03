import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemImage from '../../components/items/ItemImage'
import { Link, withRouter } from 'react-router-dom'
import { RenderCurrency } from '../../helper/Helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modalActions'
import * as itemActions from '../../actions/itemActions'
import './item.sass'
import ItemOrderForm from '../../components/items/ItemOrderForm'

class OEMS extends React.Component {
  render () {
    const { oems } = this.props
    console.log("______________")
    console.log(oems)
    console.log("______________")
    if (oems !== null && oems !== undefined) {
    let oemList = oems.split(',')
    let _oems = []
    oemList.map((oem, index) => {
      _oems.push(<Link to={`/search?q=${oem}`} className='item-oem col-3'>{oem}</Link>)
    })
    return <div className='item-oems-container row-column'>
      <div style={{fontWeight: 600}}>
      OEM:
      </div>
      <div className='row'>
      {_oems}
      </div>
    </div>
    }
    return <div className='item-oems-container row-column'>
      <div style={{fontWeight: 600}}>
      OEM:
      </div>
    </div>
  }
}

const Breadcums = (props) => {
  let breadcums = [{id: 1, title: 'Каталог'}, {id: 2, title: 'Аксессуары для интерьера'},{id: 2, title: 'Аксессуары "SKYWAY"'}, {id: 2, title: 'Декоративные подвески на зеркало авто "SKYWAY"'}]
  return (
    <div className='item-breadcums'>
      <Link to={'/groups/1'} className='item-breadcum'>
      Каталог
      </Link>
      <Link to={{ pathname: `/items/33823/sds`, state: { modal: true }}} className='item-breadcum'>
      Аксессуары для интерьера
      </Link>
      <Link to={'/groups/1'} className='item-breadcum'>
      Аксессуары "SKYWAY"
      </Link>
      <Link to={'/groups/1'} className='item-breadcum'>
      Декоративные подвески на зеркало авто "SKYWAY"
      </Link>
    </div>
  )
}

const ItemProps = (props) => {
  let a = [
    {title: 'Страна происхождения', value: props.country},
    {title: 'Размер', value: props.size},
    {title: 'Тип', value: props.type},
    {title: 'В упаковке', value: props.in_pack},
    {title: 'Применяемость', value: props.applicability},
]
  return (
      <div className='item-props-content'>
        <div className='item-props'>
                  <div className='item-props__value' style={{fontWeight: 600}}>
                      Характеристики:
                  </div>
                </div>
        {a.map((item, index) => {
          return <div className='item-props'>
                  <div className='item-props__title'>
                    {item.title}:
                  </div>
                  <div className='item-props__value'>
                      {item.value}
                  </div>
                </div>
              })}
      </div>
  )
  }

class Item extends Component {
  constructor (props) {
    super(props)
    this.handleImageClick = this.handleImageClick.bind(this)
  }
  handleImageClick (event) {
    this.props.modalActions.showItemImageModal(this.props.item)
  }
  componentWillMount () {
    const { itemId } = this.props.match.params
    const { item } = this.props.location.state
    if (item) {
      this.props.itemActions.setItem(item)
    }
    this.props.itemActions.fetchItem(itemId)
  }
  render () {
    const { item, discount } = this.props
    return <div className='item-container'>
        <div>
          <div className='item-props-title'>
          {item.title}
        </div>
        </div>
        <div className='row'>
          <div className='col-auto'>
            <div className='item-image-container' onClick={this.handleImageClick}>
                <ItemImage itemId={item.id} size={'img_item'} image={item.image} />
            </div>
          </div>
          <div className='item-props-container col-auto'>
            <div>
                <div>Код товара: {item.kod}</div>   
                <div>Артикул: {item.article}</div>
<div className='row-column'>
                <ItemProps {...item} />
              </div>
            </div>
            <div className='item-props-form-container'>
              <div>
              <span className='modal-item-price-title'>
                  Цена:
              </span>
              <span className='modal-item-price-value'>
                <RenderCurrency price={item.price} discount={discount} /><span className='price-currency'> / {item.unit} </span>
              </span>
              </div>
            <div className='modal-item-price-type'>
              Тип цены: розничная
            </div>
            <div>
              Остаток: 10-49
            </div>
            <div>
              <ItemOrderForm
                itemId={item.id}/>
            </div>
            </div>
          </div>
        </div>
          <div className='row'>
            <div className='col-6'>
              <OEMS oems={item.oems} />
            </div>
          </div>
          <div className='modal-item-text'>
            <h5> Описание {item.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
      </div>
  }
}

Item.propTypes = {
  modalActions: PropTypes.object,
  
}

Item.defaultProps = {
  item: {}
}

function mapStateToProps (state) {
  return {
    discount: state.discount,
    item: state.item.item
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    itemActions: bindActionCreators(itemActions, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Item))

