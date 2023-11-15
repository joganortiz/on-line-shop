import type fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';
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
        const extensions = ['png', 'jpg', 'jpeg'];
        if (acceptGif !== undefined && acceptGif) {
            extensions.push('gif');
        }

        const nameImgArray = img.name.split('.');
        const extensionImg = nameImgArray[nameImgArray.length - 1];

        // Validate the extension
        if (!extensions.includes(extensionImg.toLowerCase())) {
            throw new Error(
                `The extension ${extensionImg} is not allowed - ${extensions.toLocaleString()}`
            );
        }

        return await new Promise((resolve, reject) => {
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

                    resolve(`${file}/${nameTemp}`);
                });
            }
        });
    };

    /**
     * @description function that deletes an image by path
     * @date 11/14/2023 - 10:26:20 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(pathImg: string) => Promise<void>}
     */
    removeImg = async (pathImg: string): Promise<void> => {
        const pathRelativeImg = path.join(
            path.resolve(__dirname, '../../../../../public/imgs'),
            pathImg
        );

        const existImg = fs.existsSync(pathRelativeImg);

        if (existImg) {
            fs.chmodSync(pathRelativeImg, '0777');
            fs.unlinkSync(pathRelativeImg);
        }
    };
}
