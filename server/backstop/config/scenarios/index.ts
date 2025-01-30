import alpa from './alpa';
import { PROJECT } from "@config";

const configs: Record<string, any> = {
    alpa,
};

export default function getScenarios() {
    return configs[String(PROJECT)]();
}
