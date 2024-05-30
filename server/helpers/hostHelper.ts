import { ENVIRONMENT }from '@config'

interface IHost {
    task?: string,
    project: string,
}

function getCookieUrlByTask(config: IHost): string {
    let task = ''
    let env = String(ENVIRONMENT)

    if (config.task && config.project === 'alpa') {
        task = `-${ config.task.toLowerCase() }`
        return `frontera${ task }-mock.${ config.project }.svc.cluster.local`;
    }

    if (config.project === 'thor') {
        return `frontera${ task }-${ config.project }-${ env }-mock.thor-frontera.svc.cluster.local`;
    }

    return `frontera${ task }-${ config.project }-${ env }-mock.${ config.project }.svc.cluster.local`;
}
export function getTestUrlByTask(config: IHost): string {
    return `http://${ getCookieUrlByTask(config) }:2004`;
}
