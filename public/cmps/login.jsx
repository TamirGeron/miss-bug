const { Link } = ReactRouterDOM

export function Login({ onLogin }) {
    return <div className="log-sign">
        < div className="modal-content" >
            <Link to="/">
                <span className="close-button">X</span>
            </Link>

            <form onSubmit={() => onLogin(event)}>
                <label > Username: </label>
                <input placeholder="username" type="text" required />
                <input type="submit" value="Login" />
            </form>
        </div >
    </div >
}