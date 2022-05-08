const { Link } = ReactRouterDOM

export function Signup({ onSignup }) {
    // console.log(props.history);
    return <div className="log-sign">
        < div className="modal-content" >
            <Link to="/">
                <span className="close-button">X</span>
            </Link>
            <form onSubmit={() => onSignup(event)}>
                <label > Username:  <br />
                    <input placeholder="Username" type="text" required /> </label>
                <label > Password: <br />
                    <input placeholder="Password" type="password" required /> </label>
                <input type="submit" value="Signup" />
            </form>

        </div >
    </div >
}