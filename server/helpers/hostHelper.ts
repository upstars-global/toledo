import { ENVIRONMENT, PROJECT } from '@config';

interface IHost {
    task?: string,
}

function getCookieUrlByTask(config?: IHost): string {
    let task = '';
    const env = String(ENVIRONMENT);

    if (config?.task && PROJECT === 'alpa') {
        task = `-${ config.task.toLowerCase() }-ss`;
        return `frontera${ task }-mock`;
    }

    if (PROJECT === 'thor') {
        if (config?.task) {
            task = `-${ config.task?.toLowerCase() }-thor`;
            return `frontera${ task }-mock`;
        }
        const _env = env === 'develop' ? 'development' : env;
        return `frontera${ task }-${ PROJECT }-${ _env }-mock`;
    }

    return `frontera${ task }-${ PROJECT }-${ env }-mock`;
}
export function getTestUrlByTask(config?: IHost): string {
    return `http://${ getCookieUrlByTask(config) }:2004`;
}
