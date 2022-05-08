import { userService } from "../services/user.service.js"

import { UserPreview } from "./user-preview.jsx"

export class UserList extends React.Component {
    state = {
        users: [],
        msg: ''
    }

    componentDidMount() {
        this.loadUsers()
    }

    loadUsers = () => {
        userService.query()
            .then(users => {
                this.setState({ users: users })
            })
    }

    onRemoveUser = (userId) => {
        userService.remove(userId)
            .then(() => {
                console.log('Deleted Succesfully!');
                this.loadUsers()
            })
    }

    render() {
        const { users } = this.state
        const { user } = this.props
        return <div className="user-list">
            {user.isAdmin === 'true' && <table className="bug-list">
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>ID</th>
                        <th>Actions</th>
                    </tr>
                    {users.map((user, idx) => <UserPreview key={idx} user={user} onRemoveUser={this.onRemoveUser} />)}
                </tbody>
            </table >
            }
        </div>
    }
}