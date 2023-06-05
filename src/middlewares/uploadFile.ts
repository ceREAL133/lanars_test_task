import multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'Images');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

export const upload = multer({ storage });
