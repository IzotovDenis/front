import React from 'react'
import { Link } from 'react-router-dom'
import SearchBox from '../SearchBox'
import LogoImage from '../../images/logo.png'
import UserBlock from '../head/UserBlock'

const Header = (props) => {
  return ([ 
      <div class="logo-container">
          <Link to={`/`}>
            <img src={LogoImage} />
          </Link>
      <span class="text"> автотовары и автозапчасти </span>
      </div>,
    <div className="centerblock-wrapper">
      <div className="centerblock headContent">
        <SearchBox />
        <UserBlock />
      </div>
    </div>
  ]
)
}

export default Header