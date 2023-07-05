const config = {
    client : "mysql2",
    connection : {
        host : 'localhost',
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'buku'
    },
    debug: true
}

const knex = require('knex')(config);
module.exports = knex;