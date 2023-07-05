const db = require("../Config/dbConfig");

const getUser = (username) => {
    const getUser = db.select('*').from('user').where({ username: username }).first();
    return getUser;
}

module.exports = {
    getUser
}
