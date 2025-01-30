import {DEFAULT_SERVICE, MOCK_ADDR} from '@config';

export function getTestUrlByTask(service?: String): string {
    return MOCK_ADDR || `http://${ service || DEFAULT_SERVICE }:2004`;
}
