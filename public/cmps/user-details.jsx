import { bugService } from "../services/bug.service.js"

import { BugList } from "./bug-list.jsx"
const { Link } = ReactRouterDOM

export class UserDetails extends React.Component {
    state = {
        bugs: []
    }

    componentDidMount() {
        bugService.query()
            .then(bugs => {
                bugs = bugs.filter(bug => bug.creator._id === this.props.user._id)
                this.setState({ bugs: bugs })
            })
    }

    render() {
        const { user, onEditBug, onRemoveBug } = this.props
        const { bugs } = this.state
        return <div className="user-details">
            < div className="modal-content" >
                <Link to="/">
                    <span className="close-button">X</span>
                </Link>
                <h1>{user.username}</h1>
                <BugList onEditBug={onEditBug} onRemoveBug={onRemoveBug} bugs={bugs} />
            </div >
        </div >
    }
}