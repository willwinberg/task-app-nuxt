const router = require('express').Router()
const bcrypt = require('bcrypt')
const axios = require('axios')
const User = require('../models/User')
// const validateToken = require('../middleware/validate-token')

router
    .use('/auth', router)

    .post('/eclipse', (req, res) => {
        const { username, password } = req.body
        axios({
            url: 'http://192.168.2.205/eserv/eclipse.ecl',
            method: 'post',
            data:
                '<?xml version="1.0" encoding="UTF-8" ?>\n' +
                '<!DOCTYPE IDMS-XML SYSTEM "http://www.eclipseinc.com/dtd/IDMS-XML.dtd">\n' +
                '<IDMS-XML>\n' +
                '\t<CheckEclipseLogin>\n' +
                '\t\t<Security>\n' +
                '\t         <SitePass>\n' +
                '\t\t      <LoginID>IDMS</LoginID>\n' +
                '\t\t      <Password>SWPLUMB89</Password>\n' +
                '\t        </SitePass>\n' +
                '                </Security>\n' +
                '\t\t<UserName>' +
                username.toUpperCase() +
                '</UserName>\n' +
                '                 <UserPassword>' +
                password +
                '</UserPassword>\n' +
                '\t</CheckEclipseLogin>\n' +
                '</IDMS-XML>'
        })
            .then((response) => {
                // this ugly af code asks eclipse if the username and password
                // are a match and parses the result accordingly
                const parseString = require('xml2js').parseString
                const xml = response.data
                parseString(xml, function(err, result) {
                    if (err) return err
                    const eclipse =
                        result['IDMS-XML'].CheckEclipseLoginResponse[0]
                            .StatusResult[0]
                    const success = eclipse.$.Success === 'Yes'
                    let message = eclipse.Description[0]
                    if (!success) {
                        message =
                            eclipse.ErrorMessageList[0].ErrorMessage[0]
                                .Description[0]
                    }
                    return res.json({ success, message })
                })
            })
            .catch((err) => {
                res.status(418).json({ message: err })
            })
    })

    .post('/login', (req, res, next) => {
        const { username, password } = req.body
        const user = User.find({ username })
        // checks if login matches Eclipse :o
        axios({
            url: 'http://192.168.2.205/eserv/eclipse.ecl',
            method: 'post',
            data:
                '<?xml version="1.0" encoding="UTF-8" ?>\n' +
                '<!DOCTYPE IDMS-XML SYSTEM "http://www.eclipseinc.com/dtd/IDMS-XML.dtd">\n' +
                '<IDMS-XML>\n' +
                '\t<CheckEclipseLogin>\n' +
                '\t\t<Security>\n' +
                '\t         <SitePass>\n' +
                '\t\t      <LoginID>IDMS</LoginID>\n' +
                '\t\t      <Password>SWPLUMB89</Password>\n' +
                '\t        </SitePass>\n' +
                '                </Security>\n' +
                '\t\t<UserName>' +
                username.toUpperCase() +
                '</UserName>\n' +
                '                 <UserPassword>' +
                password +
                '</UserPassword>\n' +
                '\t</CheckEclipseLogin>\n' +
                '</IDMS-XML>'
        })
            .then((response) => {
                // this ugly af code asks eclipse if the username and password
                // are a match and parses the result accordingly
                const parseString = require('xml2js').parseString
                const xml = response.data
                parseString(xml, function(err, result) {
                    if (err)
                        res.status(401).json({
                            error: err
                        })
                    const eclipse =
                        result['IDMS-XML'].CheckEclipseLoginResponse[0]
                            .StatusResult[0]
                    const success = eclipse.$.Success === 'Yes'
                    let message = eclipse.Description[0]
                    if (!success) {
                        message =
                            eclipse.ErrorMessageList[0].ErrorMessage[0]
                                .Description[0]
                        res.status(401).json({
                            error: `EclipseError: ${message}`
                        })
                    }
                    // return res.json({ success, message })
                })

                if (!user.username) {
                    User.create(
                        {
                            firstName: 'New',
                            lastName: 'User',
                            username,
                            password
                        },
                        function(err, user) {
                            if (err) return next(err)
                            req.session.user = user
                            return res.json({ user })
                        }
                    )
                }
            })
            .catch((err) => {
                res.status(418).json({ message: err })
            })

        user.findOne(function(err, user) {
            if (err) {
                res.status(400).json({ message: err })
            }
            if (user) {
                if (
                    !bcrypt.compare(password, user.password) ||
                    user.username !== username
                ) {
                    res.status(406).json({ message: 'Bad credentials' })
                } else {
                    req.session.user = user
                    return res.json({ user })
                }
            }
        })
        return res
    })

    .get('/user', (req, res, next) => {
        res.json({ user: req.session.user })
    })

    .post('/logout', (req, res, next) => {
        delete req.session.user
        res.json({
            status: 'OK',
            message: 'You have been logged out'
        })
    })

    .use((err, req, res, next) => {
        res.status(401).send(err + '')
    })

module.exports.router = router
