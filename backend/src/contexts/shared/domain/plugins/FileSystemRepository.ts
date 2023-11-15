import type fileUpload from 'express-fileupload';

export interface FileSystemRepository {
    /**
     * @description function that saves an image with the extensions png, jpg, jpeg, gif
     * @date 11/14/2023 - 10:25:22 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(
     *         img: fileUpload.UploadedFile,
     *         file: string,
     *         nameImg: string,
     *         acceptGif?: boolean
     *     ) => Promise<string>}
     */
    saveImg: (
        img: fileUpload.UploadedFile,
        file: string,
        nameImg: string,
        acceptGif?: boolean
    ) => Promise<string>;

    /**
     * @description function that deletes an image by path
     * @date 11/14/2023 - 10:25:35 PM
     * @author Jogan Ortiz Muñoz
     *
     * @type {(path: string) => Promise<void>}
     */
    removeImg: (path: string) => Promise<void>;
}
