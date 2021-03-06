require('dotenv').config();

module.exports = {
    development: {
        username: "root",
        password: "",
        database: process.env.DB_NAME,
        host: "localhost",
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: "",
        password: "",
        database: "",
        host: "",
        dialect: ""
    }
}