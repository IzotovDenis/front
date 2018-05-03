import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ItemImage from '../items/ItemImage'
import { Link } from 'react-router-dom'
import { RenderCurrency } from '../../helper/Helper'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as modalActions from '../../actions/modalActions'
//import './css.sass'

class OEMS extends Component {
  render () {
    let _oems = []
    if (this.props.oems !== null) {
      let oems = this.props.oems.split(',')
      oems.map((oem, index) => {
        let _oem = oem.trim()
        _oems.push(<Link to={`/search?q=${_oem}`} className='modal-oem'>{_oem}</Link>)
      })
      return <div className='line'>
        <div className='param'>
        OEM
      </div>
        <div> {_oems} </div>
      </div>
    } else { return null }
  }
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
    //this.props.modalActions.modalItemRequest(this.props.item.kod, this.props.modalId + 1)
  }
  render () {
    const { item, discount } = this.props
    return <div>
        <div className='modal-header' />
        <div className='modal-body'>
          <div className='modal-item-image-area' onClick={this.handleImageClick}>
            <ItemImage itemId={item.id} size={'img_item'} image={item.image} />
          </div>
          <div className='modal-item-content-area'>
            <div className='line underline'>
              <span className='item-modal-title'>{item.title}</span>
            </div>
            <div className='line underline'>
              <span className='bold'>
                <Link to={`/groups/${item.group_id}`}>{item.group_title}</Link>
              </span>
            </div>

            <div className='line row'>
              <div className='col-xs-6'>
                <span className='param'>
                    Код товара:
                </span>
                <span className='bold'>
                  {item.kod}
                </span>
              </div>
              <div className='col-xs-6'>
                <span className='param'>
                    Артикул:
                </span>
                <span className='bold'>
                  {item.article}
                </span>
              </div>
            </div>

            <div className='price-container'>
              <div className='line'>
                <span className='param'>
                                    Количество в упаковке:
                                </span>
                <span className='bold'>
                  {item.in_pack}
                </span>
              </div>
              <div className='line'>
                <span className='param'>
                                      Наличие:
                                  </span>
                <span className='bold'>
                  {item.qty}
                </span>
              </div>
              <div className='line'>
                <span className='modal-item-price'>
                    Цена:
                </span>
                <span className='modal-item-price'>
                  <RenderCurrency price={item.price} discount={discount} /> / {item.unit}
                </span>
              </div>
            </div>
            <div className='line'>
              <span className='param'>
                  Страна происхождения:
              </span>
              <span className='bold'>
                {item.country}
              </span>
            </div>
            <div className='line'>
              <span className='param'>
                  Применяемость
              </span>
              <span className='bold'>
                {item.applicability}
              </span>
            </div>
          </div>
          <div className='modal-item-text'>
            <p className='lead'> Описание товара</p>
            <div dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        </div>
      </div>
  }
}

Item.propTypes = {
  modalActions: PropTypes.object,
  modal: PropTypes.object
}

Item.defaultProps = {
  item: {}
}

function mapStateToProps (state) {
  return {
    discount: state.discount
  }
}

function mapDispatchToProps (dispatch) {
  return {
    modalActions: bindActionCreators(modalActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)