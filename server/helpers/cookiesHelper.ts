import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export function processHost(host: string): string {
    const domain = host.replace(':2004', '');
    const pasePath = '../backstop/config/cookies';
    const file = readFileSync(path.resolve(__dirname, pasePath, 'default.json'), 'utf8');
    const parsedFile = JSON.parse(file);
    parsedFile[0].domain = domain;
    parsedFile[0].name = (/rocketplay|alpa/).test(domain) ? '_casino_session' : 'default_token';
    const fileName = `cookies-${domain.replace('https://', '').replace(/\./g, '-')}.json`;
    writeFileSync(path.resolve(__dirname, pasePath, fileName), JSON.stringify(parsedFile));

    return `backstop/config/cookies/${fileName}`;
}
