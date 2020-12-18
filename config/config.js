require("dotenv").config();

module.exports = {
    "development": {
<<<<<<< HEAD:config/config.json
        "username": "root",
        "password": "password",
        "database": "NoGym",
=======
        "username": process.env.myUsername,
        "password": process.env.myPassword,
        "database": process.env.database,
>>>>>>> 7992298965c509849ac6faeb7132f4c178d5ac7c:config/config.js
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
}