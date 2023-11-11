import type fileUpload from 'express-fileupload';

export interface FileSystemRepository {
    saveImg: (
        img: fileUpload.UploadedFile,
        file: string,
        nameImg: string,
        acceptGif?: boolean
    ) => Promise<string>;
}
