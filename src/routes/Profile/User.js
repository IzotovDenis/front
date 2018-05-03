import React, { Component, defaultProps } from 'react'
import axios from 'axios'
import API from '../../helper/Api'

class ProfileUser extends Component {
  constructor (props) {
    super(props)
    this.labels = {
      email: { text: 'email', type: 'text', field: 'input' },
      name: { text: 'Наименование', type: 'text', field: 'input' },
      city: { text: 'Город', type: 'text', field: 'input' },
      person: { text: 'Контактное лицо', type: 'text', field: 'input' },
      phone: { text: 'Телефон', type: 'text', field: 'input' },
      inn: { text: 'ИНН', type: 'text', field: 'input' },
      kpp: { text: 'КПП', type: 'text', field: 'input' },
      legal_address: { text: 'Юридический адрес', type: 'text', field: 'input' },
      actual_address: { text: 'Фактический адрес', type: 'text', field: 'input' },
      bank_name: { text: 'Наименование банка', type: 'text', field: 'input' },
      bik: { text: 'БИК', type: 'text', field: 'input' },
      corr_account: { text: 'Корреспондентский счет', type: 'text', field: 'input' },
      curr_account: { text: 'Лицевой счет', type: 'text', field: 'input' },
      note: { text: 'Примечание', type: 'text', field: 'textarea' } }
    let user = {}
    Object.keys(this.labels).map((key) =>
      user[key] = '')
    this.state = { user: user, errors: {}, success: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    const target = event.target
    const name = target.name
    const value = target.value
    let user = this.state.user
    user[name] = value
    this.setState({ user: user })
  }
  handleSubmit (event) {
    event.preventDefault()
    axios.put(API.buildUri('/users/update'), { user: this.state.user
    }).then(response => {
      if (response.data.success) {
        this.setState({ success: true })
        this.props.userActions.updateUserProfile(response.data.profile)
      } else {
        this.setState({ errors: response.data.errors, success: false })
      }
    })
  }
  componentDidMount () {
    let user = {}
    Object.keys(this.labels).map((key) =>
      user[key] = this.props.user.profile[key] || '')
    this.setState({ user:user })
  }
  componentWillReceiveProps (nextProps) {
    let user = {}
    Object.keys(this.labels).map((key) =>
    user[key] = nextProps.user.profile[key] || '')
    this.setState({ user:user })
  }
  render () {
    const ListInputs = Object.keys(this.labels).map((key, index) =>
      <div className='form-group' key={index}>
        <label className='col-sm-3 control-label'>{this.labels[key].text}</label>
        <div className='col-sm-9'>
          { this.labels[key].field === 'input' &&
          <input name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state.user[key]} onChange={this.handleChange} />
          }
          { this.labels[key].field === 'textarea' &&
          <textarea name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state.user[key]} onChange={this.handleChange} />
          }
          { this.state.errors[key]
            ? this.state.errors[key].map((msg, index) => <span className='error' key={index}>{msg} </span>)
            : null}
        </div>
      </div>
      )
    return <div>
      { this.state.success === true &&
        <div className='alert alert-success' role='alert'>Успешно сохранено</div>
        }
      <form className='form-horizontal' onSubmit={this.handleSubmit}>
        {ListInputs}
        <button type='submit' className='btn btn-default'>Сохранить</button>
      </form> </div>
  }
}

ProfileUser.defaultProps = {
  user: {}
}
export default ProfileUser
