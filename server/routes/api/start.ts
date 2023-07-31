import {config} from 'dotenv'
import {Request, Response} from 'express'
import command from '../../backstop'
import SlackService from '../../services/SlackService';
import {getTestUrlByTask} from '../../helpers/hostHelper';
import fs from 'fs'
import path from 'path'

config()

function getCurrentFormattedTime() {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function copyReference(project: string, folder: string) {
    const srcPathName = path.join(__dirname, `../../backstop/reference/${project}`)
    const destPathName = path.join(__dirname, `../../backstop/test/${project}/${folder}/reference`)
    fs.cpSync(srcPathName, destPathName, {recursive: true});
}

interface ITestResult {
    passed: number,
    failed: number
}
function getResults(testPath: string): ITestResult {
    try {
        const file = fs.readFileSync([testPath, 'report.json'].join('/'), 'utf8')

        const parsedFile = JSON.parse(file);

        return parsedFile.tests.reduce((accumulator: ITestResult, currentValue: any) => {
            switch (currentValue.status) {
                case 'pass':
                    accumulator.passed += 1;
                    break;
                case 'fail':
                default:
                    accumulator.failed += 1;
                    break;
            }

            return accumulator;
        }, {
            passed: 0,
            failed: 0,
        })
    } catch (e) {
        console.log(e)
        return {
            passed: 0,
            failed: 0,
        }
    }
}

export default function startRoute(req: Request, res: Response) {
    const {
        hostName,
        project,
        testId,
        dyn,
    } = req.query;

    let taskId = String(dyn || '') || String(testId || '');
    const projectName = String(project)
    const host = getTestUrlByTask({
        task: String(dyn || ''),
        project: projectName,
    })

    const folder = taskId || getCurrentFormattedTime()
    copyReference(projectName, folder)

    console.log('Host: ', host)
    command('test', {
        hostName: hostName || host,
        project: projectName,
        testId: folder,
    }).then(() => {
        console.log('complete')
    }).catch((err: Error) => {
        SlackService.send(projectName, taskId, getResults(`backstop/test/${project}/${folder}`))
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}