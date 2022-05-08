import { BugApp } from './pages/bug-app.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        {/* <AppHeader /> */}
        <section className="app">
            <Route path="/" component={BugApp} />
        </section>
        {/* <AppFooter /> */}
        {/* <UserMsg /> */}
    </Router>
}