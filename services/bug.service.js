const fs = require('fs')
const gBugs = require('../data/bug.json')

const PAGE_SIZE = 10
module.exports = {
    query,
    getById,
    remove,
    save
}


function query(filterBy = { txt: '' }) {
    const regex = new RegExp(filterBy.txt, 'i')
    var bugs = gBugs.filter(bug => regex.test(bug.title))

    if (filterBy.pageIdx !== undefined) {
        const startIdx = (filterBy.pageIdx - 1) * PAGE_SIZE;
        const endIdx = filterBy.pageIdx * PAGE_SIZE;
        bugs = bugs.slice(startIdx, endIdx)
        bugs.slice()
    }
    return Promise.resolve(bugs)
}


function save(bug) {
    if (bug._id) {
        const idx = gBugs.findIndex(currBug => currBug._id === bug._id)
        gBugs[idx] = bug
    } else {
        bug._id = _makeId()
        gBugs.push(bug)
    }
    return _saveBugsToFile().then(() => bug)
}

function remove(bugId, loggedinUserId) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    if (gBugs[idx].creator._id !== loggedinUserId._id) {
        return Promise.reject('Not your Bug')
    }
    gBugs.splice(idx, 1)
    return _saveBugsToFile()
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
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