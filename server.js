const express = require('express')
const cookieParser = require('cookie-parser');

const bugService = require('./services/bug.service')
const userService = require('./services/user.service')
const app = express()

// Config the Express App
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.get('/api/bug', (req, res) => {
    const filterBy = { title: req.query.txt || '' }
    if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    bugService.query(filterBy)
        .then(bugs => {
            res.send(bugs)
        })
})

app.post('/api/bug', (req, res) => {
    const user = userService.validateToken(req.cookies.loginToken)
    if (!user) return res.status(401).send('Cannot add bug')

    const bug = req.body
    bug.ownerId = user
    bugService.save(bug)
        .then((savedBug) => {
            res.send(savedBug)
        })
})

app.put('/api/bug/:bugId', (req, res) => {
    const user = userService.validateToken(req.cookies.loginToken)
    if (!user) return res.status(401).send('Cannot update bug')
    const bug = req.body
    bugService.save(bug)
        .then((savedBug) => {
            res.send(savedBug)
        })
})

app.delete('/api/bug/:bugId', (req, res) => {
    const user = userService.validateToken(req.cookies.loginToken)
    if (!user) return res.status(401).send('Cannot delete bug')

    const { bugId } = req.params
    bugService.remove(bugId, user)
        .then(() => {
            console.log('Removed Bug', bugId)
            res.send('Removed Succesfully')
        })
        .catch(err => {
            res.status(401).send('Cannot delete bug')
        })
})

app.post('/api/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged out')
})

app.post('/api/login', (req, res) => {
    const credentials = req.body
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(401).send('Invalid Credentials')
            }
        })

})

app.post('/api/signup', (req, res) => {
    const credentials = req.body
    userService.signup(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(401).send('Username taken')
            }
        })

})

app.get('/api/user', (req, res) => {
    userService.query()
        .then(users => {
            res.send(users)
        })
})

app.delete('/api/user/:userId', (req, res) => {
    const { userId } = req.params
    userService.remove(userId)
        .then(() => {
            console.log('Removed User', userId)
            res.send('Removed Succesfully')
        })
        .catch(err => {
            res.status(401).send('Cannot delete user')
        })
})

const port = process.env.PORT || 3030;
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});