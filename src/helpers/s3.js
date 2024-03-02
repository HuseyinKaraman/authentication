import S3 from "aws-sdk/clients/s3.js";
import multer from "multer";
import s3Config from "../configs/s3Config.js";
import Boom from "boom";


const { bucketName, region, accessKeyId, secretAccessKey } = s3Config;
const fileFilter = (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(Boom.badRequest("Only image files allowed!"), false);
    }
};
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 2 } }).array("images", 3);

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const uploadToS3 = (file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        s3.upload(params, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

const multipleImageUpload = async (images) => {
    let locations = [];
    for (let i = 0; i < images.length; i++) {
        const data = await uploadToS3(images[i]);
        locations.push(data.Location);
    }

    return locations;
};

export {
    multipleImageUpload,
    upload,
};
