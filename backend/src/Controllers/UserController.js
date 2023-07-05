const UserModel = require('../Models/UserModel');

const ListUser = async(req, res) => {

    try {

        const ListUser = await UserModel.getUser();

        return res.status(201).json({
            success: true,
            data: ListUser,
            keterangan: "List User"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}

const UserById = async(req, res) => {

    try {

        const getUser = await UserModel.userById(req.params.id)

        if (!getUser) {
            return res.json({ message: `data dengan id = ${req.params.id} tidak ditemukan!` });
        }

        return res.status(201).json({
            success: true,
            data: getUser
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}

module.exports = {
    ListUser,
    UserById
}