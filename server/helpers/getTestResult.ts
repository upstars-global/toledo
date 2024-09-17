import { readFileSync } from 'fs';

interface ITestResult {
    passed: number,
    failed: number
}

export function getTestResult(testPath: string): ITestResult {
    try {
        const file = readFileSync([ testPath, 'report.json' ].join('/'), 'utf8');

        const parsedFile = JSON.parse(file);

        return parsedFile.tests.reduce((accumulator: ITestResult, currentValue: Record<string, unknown>) => {
            switch (currentValue.status) {
                case 'pass':
                    accumulator.passed = accumulator.passed + 1;
                    break;
                case 'fail':
                default:
                    accumulator.failed = accumulator.failed + 1;
                    break;
            }

            return accumulator;
        }, {
            passed: 0,
            failed: 0,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return {
            passed: 0,
            failed: 0,
        };
    }
}
