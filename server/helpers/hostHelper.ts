interface IHost {
    task?: string,
    project: string,
}

function getCookieUrlByTask(config: IHost): string {
    let task = ''
    let env = String(process.env.ENVIRONMENT)

    if (config.task) {
        task = `-${ config.task.toLowerCase() }-ss`
        env = 'develop'
    }

    return `http://frontera${ task }-${ config.project }-${ env }-mock.${ config.project }.svc.cluster.local`;
}
export function getTestUrlByTask(config: IHost): string {
    return `${ getCookieUrlByTask(config) }:2004`;
}
