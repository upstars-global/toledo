import alpa from './alpa';
import thor from './thor';
import { PROJECT } from "@config";

const configs: Record<string, any> = {
    alpa,
    thor,
};

export default function getScenarios(host: string) {
    let baseUrl = host;
    if (!baseUrl.startsWith('http')) {
        baseUrl = `http://${baseUrl}`;
    }
    return configs[String(PROJECT)](baseUrl);
}
