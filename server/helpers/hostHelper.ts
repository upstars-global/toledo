import { ENVIRONMENT, IS_AWS }from '@config'

interface IHost {
    task?: string,
    project: string,
}

function getCookieUrlByTask(config: IHost): string {
    let task = ''
    let env = String(ENVIRONMENT)

    if (config.task) {
        task = `-${ config.task.toLowerCase() }-ss`
        env = 'develop'
    }

    if (IS_AWS) {
        return `frontera${ task }-${ env }-${ config.project }-mock.${ config.project }.svc.cluster.local`;
    }

    return `frontera${ task }-${ config.project }-${ env }-mock.${ config.project }.svc.cluster.local`;
}
export function getTestUrlByTask(config: IHost): string {
    return `http://${ getCookieUrlByTask(config) }:2004`;
}
