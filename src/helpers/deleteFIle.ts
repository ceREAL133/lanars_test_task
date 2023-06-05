import * as fs from 'fs';

export const deleteFile = async (filePath: string) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			console.error('Error deleting file:', err);
			return;
		}

		console.log('File deleted successfully');
	});
};
