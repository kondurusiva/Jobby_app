import './index.css'

const Header = () => (
  <nav className="nav-container">
    <div className="items-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul className="ul-items">
        <li className="li-items">Home</li>
        <li className="li-items">Jobs</li>
      </ul>
      <button className="logout-btn" type="button">
        Logout
      </button>
    </div>
  </nav>
)

export default Header
