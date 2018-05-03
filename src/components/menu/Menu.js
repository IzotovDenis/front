import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RenderDialog from './RenderDialog'
import { Link } from 'react-router-dom'
import trackImgMenu from '../../images/trackparts-menu.jpg'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

function loadMenu (Component) {
  return class LoadMenu extends React.Component {
    render () {
      const { loaded } = this.props
      if (loaded) {
        return <Component {...this.props} />
      } else {
        return <div id='leftside'/>
      }
    }
  }
}

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = { shown: null, active: null, dialog_move: false, columns: 0 }
    this.handleDialogLeave = this.handleDialogLeave.bind(this)
    this.handleDialogMove = this.handleDialogMove.bind(this)
    this.handleMenuLeave = this.handleMenuLeave.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
        this.setState({ active: null, shown: null, dialog_move: false })
    }
  }
  handleHover (id) {
    this.setState({ active: id })
    setTimeout(() => {
      if (this.state.active === id && !this.state.dialog_move) {
        this.setState({
          shown: id, columns: this.props.tree[id].col })
      }
    }, 500)
  }
  handleClick (id) {
    this.setState({ shown: id, columns: this.props.tree[id].col })
  }
  handleDialogMove () {
    if (this.state.dialog_move !== true) {
      this.setState({ dialog_move: true })
    }
  }
  handleDialogLeave () {
    if (this.state.dialog_move !== false) {
      this.setState({ dialog_move: false })
    }
  }
  componentDidMount() {
    this.setState({ height: this.divElement.clientHeight - 60 })
    window.addEventListener('resize', () => this.setState({ height: this.divElement.clientHeight - 60 }))
  }
  handleMenuLeave () {
    this.setState({ active: null, shown: null })
  }
  renderParent (g, index) {
    const { groups } = this.props
    return <li className={groups[g.id].new ? 'menu-bar-root menu-bar-has-new' : 'menu-bar-root'} 
      key={index} onMouseOver={() => this.handleHover(index)}
      onClick={() => this.handleClick(index)}>
      <span className='title'>
        {groups[g.id].title}
      </span>
      <i class="menu-arrow fas fa-angle-right"></i>
    </li>
  }
  render () {
    const { groups, tree } = this.props
    let menuDialogStyle = `menu-dialog menu-column-${this.state.columns} lovely_scroll`
    const listGroupsSupplier = tree.map((g, index) => {
      if (groups[g.id].supplier_id === 1 && groups[g.id].ancestry === null) {
        return <div className='menu-bar-supplier'
          key={index}>
          <Link to={`/groups/${g.id}`}>
            <img src={trackImgMenu} />
          </Link>
        </div>
      }
    }
      )
    const listGroup = tree.map((g, index) => {
      if (groups[g.id].supplier_id === 0) {
        return this.renderParent(g, index)
      }
    }
  )
    return <div id='leftside' ref={ (divElement) => this.divElement = divElement}>
      {listGroupsSupplier}
      <div onMouseLeave={this.handleMenuLeave}>
        <div id='menuCointainer' className='menu-container'>
          <div className='left-menu menu-bar' style={{height:this.state.height - 39}}>
            {listGroup}
          </div>
        </div>
        <div className={menuDialogStyle}
          onMouseMove={this.handleDialogMove}
          onMouseLeave={this.handleDialogLeave}
          style={(typeof this.state.shown === 'number' ? { display: 'block', height: this.state.height } : { display: 'none' })}>
          <RenderDialog groups={tree[this.state.shown]} head groups1={groups}/>
        </div>
      </div>
    </div>
  }
}

Menu.propTypes = {
  groups: PropTypes.object.isRequired,
  tree: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  return {
    groups: state.groups
  }
}

export default withRouter(connect(
  (state) => {
    return { tree: state.group.tree, groups: state.group.groups, loaded: state.group.loaded }
  }
  )(loadMenu(Menu)))
