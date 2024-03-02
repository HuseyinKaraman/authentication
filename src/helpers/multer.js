import multer from "multer";
import fs from "fs";


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./uploads")) {
            fs.mkdirSync("./uploads");
        }

        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)+"."+file.mimetype.split("/")[1];
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 2 }}).array("images", 3);

export { upload };
