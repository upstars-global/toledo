import { ENVIRONMENT } from '@config';

interface IHost {
    task?: string,
    project: string,
    isAws?: boolean
}

function getCookieUrlByTask(config: IHost): string {
    let task = '';
    const env = String(ENVIRONMENT);

    if (config.task && config.project === 'alpa') {
        task = `-${ config.task.toLowerCase() }-ss`;
        return `frontera${ task }-mock.${ config.project }.svc.cluster.local`;
    }

    if (config.project === 'thor' && config.isAws) {
        if (config.task) {
            task = `-${ config.task?.toLowerCase() }-thor`;
            return `frontera${ task }-mock.thor-frontera.svc.cluster.local`;
        }
        const _env = env === 'develop' ? 'development' : env;
        return `frontera${ task }-${ config.project }-${ _env }-mock.thor-frontera.svc.cluster.local`;
    }

    return `frontera${ task }-${ config.project }-${ env }-mock.${ config.project }.svc.cluster.local`;
}
export function getTestUrlByTask(config: IHost): string {
    return `http://${ getCookieUrlByTask(config) }:2004`;
}
