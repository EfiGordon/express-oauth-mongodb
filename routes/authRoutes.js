const express = require('express')
const router = express.Router()
const passport = require('passport');


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    console.log({
        reqBody: req.body,
    })
    next();
})

router.get('/api/current_user', (req, res) => {
    res.send(req.user);
})

router.get('/api/logout', (req, res) => {
    req.logout();
    res.send({
        msg: 'logged out',
        user: req.user
    })
})

module.exports = router
