const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('ERROR: ' + err))
})

router.route('/FindUser').get((req, res) => {
    const email = req.body.email;
    User.find({ email: email })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('ERROR: ' + err))
})

router.route('/addUser').post((req, res) => {
    const email = req.body.email;
    const newUser = new User({ email })
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('ERROR: ' + err))
})

router.route('/addFile').post((req, res) => {
    const email = req.body.email;
    const file = req.body.file;
    const selectedUser = User.find({ email: email })
    selectedUser.files
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(err => res.status(400).json('ERROR: ' + err))
})

module.exports = router;