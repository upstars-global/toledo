import {Request, Response, Router} from 'express'
import command from '../../backstop'
import {getTestUrlByTask} from '../../helpers/hostHelper'
import {MOCK_ADDR} from '@config'
import fs from "fs";
import path from "path";

function backupFiles(directory: string) {
    try {
        const files = fs.readdirSync(directory);
        const backupDirectory = path.join(directory, '../backup');

        if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory);
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            const backupPath = path.join(backupDirectory, `backup_${file}`);

            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(filePath, backupPath);
            }
        });
    } catch (err) {
        console.log("backupFiles err", err)
    }
}

function restoreBackupFiles(directory: string) {
    try {
        const backupDirectory = path.join(directory, '../backup');
        const backupFiles = fs.readdirSync(backupDirectory);

        backupFiles.forEach(backupFile => {
            const originalFileName = backupFile.replace(/^backup_/, ''); // Удаляем префикс "backup_"
            const originalFilePath = path.join(directory, originalFileName);
            const backupFilePath = path.join(backupDirectory, backupFile);

            if (!fs.existsSync(originalFilePath)) {
                fs.copyFileSync(backupFilePath, originalFilePath);
            }
        });

        fs.rmdirSync(backupDirectory, {recursive: true});
    } catch (err) {
        console.log("restoreBackupFiles err", err);
    }
}


function reference(req: Request, res: Response) {
    const {
        project,
    } = req.query
    const pathReferenceDir = path.join(__dirname, `../../backstop/reference/${project}`)
    backupFiles(pathReferenceDir)


    command('reference', {
        hostName: MOCK_ADDR || getTestUrlByTask({
            project: String(project),
        }),
        project,
        testId: '',
        selectedScenariosLabels: req.body
    }).then(() => {
        console.log('complete')
        if (req.body) {
            restoreBackupFiles(pathReferenceDir)
        }

    }).catch((err: Error) => {
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}

export default function (): Router {
    const referenceRouter = Router()

    referenceRouter.get('/', reference)
    referenceRouter.post('/select-scenarios', reference)
    return referenceRouter
};
