interface IHost {
    task?: string,
    project: string,
}

function getCookieUrlByTask(config: IHost): string {
    let task = config.task ? `-${ config.task.toLowerCase() }-ss` : ''

    return `http://frontera${ task }-${ config.project }-${ String(process.env.ENVIRONMENT) }-mock.${ config.project }.svc.cluster.local`;
}
export function getTestUrlByTask(config: IHost): string {
    return `${ getCookieUrlByTask(config) }:2004`;
}
