import fs from "fs";

interface ITestResult {
    passed: number,
    failed: number
}

export function getTestResult(testPath: string): ITestResult {
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
