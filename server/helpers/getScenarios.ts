import fs from "fs";

export default function getScenarios() {
    return JSON.parse(fs.readFileSync('./backstop/config/scenarios/index.json', 'utf8'));
}