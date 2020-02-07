if (process.env.NODE_ENV === 'production') {
    module.exports = {}
} else {
    module.exports = {
        seedData: true,
        connection: 'mongodb://127.0.0.1:27017/gogrellodb',
        jwtSecret: 'prettydumbsecret'
    }
}
