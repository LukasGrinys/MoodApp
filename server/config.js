const config = {
    production: {
        SECRET: process.env.SECRET,
        PORT: process.env.PORT
    },
    default: {
        SECRET: 'thisisasecret',
        PORT: 3001
    }
}

exports.get = function get(env) {
    return config[env] || config.default 
}