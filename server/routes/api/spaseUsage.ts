import {Request, Response} from "express";
import du from 'du'

const PATHS = {
    TESTS: './backstop/test',
    REFERENCE: './backstop/reference'
};

function getFolderSize(folderPath: string): Promise<number | "error"> {
    return new Promise((resolve) => {
        du(folderPath, (err, size) => {
            if (err || !size) {
                console.error(err)
                resolve("error")
            } else {
                // Преобразуем размер в мегабайты
                const folderSizeInMegabytes = size / (1024 * 1024)
                resolve(folderSizeInMegabytes)
            }
        });
    })
}
export default async function (req: Request, res: Response) {
    const testFolderSize = await getFolderSize(PATHS.TESTS)
    const referenceFolderSize = await getFolderSize(PATHS.REFERENCE)

    res.send({
        testFolderSize,
        referenceFolderSize,
    })
}