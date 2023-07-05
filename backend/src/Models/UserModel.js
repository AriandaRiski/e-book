const db = require('./../Config/dbConfig');

const getUser = () => {
    const getUser = db.select('*').from('user');
    return getUser;
}

const userById = (id_user) => {    
    const cek = db.select('id','username').from('user').where('id', id_user).first();
    return cek;
}

const cekUsername = (username) => {
    const cek = db.select('username').from('user').where('username', username).first();
}

module.exports = {
    getUser,
    userById
}