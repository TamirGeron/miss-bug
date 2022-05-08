const fs = require('fs')
const Cryptr = require('cryptr')
const utilService = require('./util.service')

const cryptr = new Cryptr(process.env.SECRET1)

module.exports = {
    checkLogin,
    signup,
    getLoginToken,
    validateToken,
    query,
    remove
}

const gUsers = require('../data/user.json')


function checkLogin({ username }) {
    const user = gUsers.find(user => user.username === username)
    return Promise.resolve(user)
}

function signup({ username, pass }) {
    const userExist = gUsers.find(user => user.username === username)
    if (userExist) return Promise.reject('Username is taken')

    const user = {
        _id: utilService.makeId(),
        username,
        pass,
        isAdmin: "false"
    }
    console.log(user);
    gUsers.push(user)
    return _saveUsersToFile().then(() => user)
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

function query() {
    return Promise.resolve(gUsers)
}

function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    gUsers.splice(idx, 1)
    return _saveUsersToFile()
}