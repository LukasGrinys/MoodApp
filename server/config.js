const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        PORT: process.env.PORT
    },
    default: {
        SECRET: 'thisisasecret',
        DATABASE: 'mongodb://localhost:27017/moodapp',
        PORT: 3001
    }
}

exports.get = function get(env) {
    return config[env] || config.default 
}