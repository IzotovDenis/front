import React, { Component } from 'react'
import axios from 'axios'
import API from '../../helper/Api'

class ProfilePassword extends Component {
  constructor (props) {
    super(props)
    this.state = { user: { current_password: '', password: '', password_confirmation: '' }, errors: {}, success: false }
    this.labels = {
      current_password: { text: 'Старый пароль', type: 'password', field: 'input' },
      password: { text: 'Новый пароль', type: 'password', field: 'input' },
      password_confirmation: { text: 'Новый пароль еще раз', type: 'password', field: 'input' } }
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
    axios.put(API.buildUri('/users/update_password'), { user: this.state.user }).then(response => {
      if (response.data.success) {
        this.setState({ success: true, errors: {} })
      } else {
        this.setState({ errors: response.data.errors, success: false })
      }
    })
  }
  render () {
    const ListInputs = Object.keys(this.labels).map((key, index) =>
      <div className='form-group' key={index}>
        <label className='col-sm-3 control-label'>{this.labels[key].text}</label>
        <div className='col-sm-9'>
          { this.labels[key].field === 'input' &&
          <input name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state[key]} onChange={this.handleChange} />
          }
          { this.labels[key].field === 'textarea' &&
          <textarea name={key} type={this.labels[key].type} className='form-control'
            placeholder={this.labels[key].text} value={this.state[key]} onChange={this.handleChange} />
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
        <button type='submit' className='btn btn-default'>Изменить пароль</button>
      </form> </div>
  }
}

export default ProfilePassword
