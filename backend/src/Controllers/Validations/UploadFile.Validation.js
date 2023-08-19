const { fromBuffer } = require('file-type');
const { v4: uuidv4 } = require('uuid');
const imagekit = require('./../../Config/imagekitConfig');

const FilesBase = async (req, res, next) => {

    try {

        if (!req.body.cover || req.body.cover == null) {
            next();
            return false;
        }

        const allowedExtensions = ['png', 'jpg', 'JPG', 'PNG', 'webp', 'jpeg'];
        const allowedMimeTypes = ['image/png', 'image/webp', 'image/jpg', 'image/jpeg'];
        const matches = req.body.cover.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const Datastring = (!matches ? req.body.cover : matches[2]);
        const imgBuffer = Buffer.from(Datastring, 'base64');
        const mimeInfo = await fromBuffer(imgBuffer);
        const fileSize = Buffer.byteLength(imgBuffer);
        
        if (!mimeInfo) {
            return res.status(400).json({
                success: false,
                message: 'bukan format base64',
            });
        }

        if (!allowedMimeTypes.includes(mimeInfo.mime) && !allowedExtensions.includes(mimeInfo.ext)) {
            return res.status(400).json({
                success: false,
                message: 'file yang anda upload harus format image',
            });
        }
        if (fileSize > 10050000) {
            return res.status(400).json({
                success: false,
                message: 'max file size 10MB',
            });
        }

        const upload = await imagekit.upload({
            file: imgBuffer, //required
            fileName: `${uuidv4()}.${mimeInfo.ext}`,   //required
        })

        req.cover = upload;
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: error
        });
    }

}

module.exports = {
    FilesBase
}