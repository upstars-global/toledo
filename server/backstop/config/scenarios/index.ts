import alpa from './alpa';
import thor from './thor';
import { PROJECT } from "@config";

const configs: Record<string, any> = {
    alpa,
    thor,
};

export default function getScenarios() {
    return configs[String(PROJECT)]();
}
