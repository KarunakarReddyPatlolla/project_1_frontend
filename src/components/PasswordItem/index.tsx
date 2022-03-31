import './index.css';

const PasswordItem = (props:any )=> {
    const {passwordDetails, deletePassword, showPassword} = props
    const {id, website, username, password} = passwordDetails
  
    const onDeletePassword = () => {
      deletePassword(id)
    }
  
    return (
      <li className="password-container">
        <div className="container">
          <div className="initial-container">
            <p className="initial-text">{username[0].toUpperCase()}</p>
          </div>
          <div className="details-container">
            <p className="text">{website}</p>
            <p className="text">{username}</p>
            {showPassword ? (
              <p className="text">{password}</p>
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                alt="stars"
                className="stars"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={onDeletePassword}
          className="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
    )
  }
  
  export default PasswordItem