import { bugService } from '../services/bug.service.js'
import { userService } from '../services/user.service.js'

import { BugList } from '../cmps/bug-list.jsx'
import { Login } from '../cmps/login.jsx'
import { Signup } from '../cmps/signup.jsx'
import { UserDetails } from '../cmps/user-details.jsx'
import { UserList } from '../cmps/user-list.jsx'


const { Route, Link, Switch } = ReactRouterDOM

export class BugApp extends React.Component {
    state = {
        msg: '',
        bugs: [],
        user: userService.getLoggedinUser(),
        filterBy: {
            title: '',
            pageIdx: 1
        },
    }
    componentDidMount() {
        this.loadBugs()
    }

    loadBugs = () => {
        bugService.query(this.state.filterBy)
            .then(bugs => {
                this.setState({ bugs: bugs })
            })
    }

    flashMsg(msg) {
        this.setState({ msg })
        setTimeout(() => {
            this.setState({ msg: '' })
        }, 1000)
    }

    onRemoveBug = (bugId) => {
        bugService.remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!');
                let { bugs: bugs } = this.state
                bugs = bugs.filter(bug => bug._id !== bugId)
                this.setState({ bugs: bugs })
            })
            .catch(err => {
                this.flashMsg('Cannot remove bug')
            })
    }
    onAddBug = () => {
        const bug = {
            title: prompt('title?'),
            description: prompt('description?'),
            severity: prompt('severity?'),
            createdAt: new Date(),
            creator: this.state.user
        }
        bugService.save(bug)
            .then(savedBug => {
                this.setState({ bugs: [savedBug, ...this.state.bugs] })
            })
            .catch(err => {
                this.flashMsg('Cannot add bug')
            })
    }
    onEditBug = (bug) => {
        bug.title = prompt('title?')
        bugService.save(bug)
            .then(savedBug => {
                const bugs =
                    this.state.bugs.map(b => (b._id === bug._id) ? savedBug : b)

                this.setState({ bugs: bugs })
            })
            .catch(err => {
                this.flashMsg('Cannot update bug')
            })
    }
    onLogin = ({ target }) => {
        const username = target[0].value
        userService.login(username)
            .then(user => {
                this.props.history.push('/')
                this.setState({ user })
            })
            .catch(err => {
                this.flashMsg('Cannot login')
            })

    }
    onLogout = () => {
        userService.logout()
            .then(() => {
                this.setState({ user: null })
            })
            .catch(err => {
                this.flashMsg('Cannot logout')
            })
    }

    onSignup = ({ target }) => {
        const user = {
            username: target[0].value,
            pass: target[1].value
        }
        userService.signup(user)
            .then(user => {
                this.props.history.push('/')
                this.setState({ user })
            })
            .catch(err => {
                this.flashMsg('Cannot login')
            })
    }

    onPageChange(value) {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, pageIdx: value } }), () => this.loadBugs())
    }

    render() {
        const { bugs, user, msg, filterBy } = this.state
        return <div>
            {<Switch>
                <Route path='/login' component={() => <Login onLogin={this.onLogin} />} />
                <Route path='/signup' component={() => <Signup onSignup={this.onSignup} />} />
                <Route path='/:userId' component={() => <UserDetails user={user} onEditBug={this.onEditBug} onRemoveBug={this.onRemoveBug} />} />
            </Switch>}
            <header>
                <h1>Bug App</h1>
                {(user) ?
                    <h2>
                        Hello <Link to={`/${user._id}`}>{user.username}</Link>
                        <button onClick={this.onLogout}>Logout</button>
                    </h2>
                    : <div>
                        <Link to='/login'>
                            <button>Login</button>
                        </Link>
                        <Link to='/signup'>
                            <button>Signup</button>
                        </Link>
                    </div>
                }
                <h4>{msg}</h4>

            </header>

            <main>
                <button onClick={this.onAddBug}>Add Bug</button>
                <BugList user={user} onEditBug={this.onEditBug} onRemoveBug={this.onRemoveBug} bugs={bugs} />
                <input onInput={() => this.onPageChange(event.target.value)} defaultValue={filterBy.pageIdx} type="number" name="pageIdx" />
                {user && <UserList user={user} />}
            </main>
        </div>

    }
}

