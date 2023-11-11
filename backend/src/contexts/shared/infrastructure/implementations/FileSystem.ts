import type fileUpload from 'express-fileupload';
import path from 'path';
import { type FileSystemRepository } from '../../domain/plugins/FileSystemRepository';

export class FileSystem implements FileSystemRepository {
    /**
     * @description function that saves an image with the extensions png, jpg, jpeg, gif
     * @date 10/8/2023 - 8:03:35 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @param {fileUpload.UploadedFile} img
     * @param {string} file
     * @param {string} nameImg
     * @returns {Promise<string>}
     */
    saveImg = async (
        img: fileUpload.UploadedFile,
        file: string,
        nameImg: string,
        acceptGif?: boolean
    ): Promise<string> => {
        return await new Promise((resolve, reject) => {
            // We validate that only one image comes
            // if (img instanceof Array) reject('error, el valor es un array');

            const extensions = ['png', 'jpg', 'jpeg'];
            if (acceptGif !== undefined && acceptGif) {
                extensions.push('gif');
            }

            const nameImgArray = img.name.split('.');
            const extensionImg = nameImgArray[nameImgArray.length - 1];

            // Validate the extension
            if (!extensions.includes(extensionImg.toLowerCase())) {
                reject(
                    `The extension ${extensionImg} is not allowed - ${extensions}`
                );
            }

            if (nameImg !== undefined) {
                const nameTemp = nameImg + '.' + extensionImg;
                const uploadPath = path.join(
                    path.resolve(__dirname, '../../../../../public/imgs'),
                    file,
                    nameTemp
                );

                img.mv(uploadPath, (err) => {
                    if (err !== undefined) {
                        reject(err);
                    }

                    resolve(`imgs/${file}/${nameTemp}`);
                });
            }
        });
    };
}
