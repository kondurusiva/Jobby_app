import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="items-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="ul-items">
          <li className="li-items">
            <Link to="/">Home</Link>
          </li>
          <li className="li-items">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button onClick={onClickLogout} className="logout-btn" type="button">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
