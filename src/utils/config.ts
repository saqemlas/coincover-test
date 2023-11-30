export interface Config {
    isLocal: boolean;
    logLevel: string;
    environment: string;
    port: number;
}

export const config: Config = {
    isLocal: process.env['isLocal'] ? true : false,
    logLevel: process.env['LOG_LEVEL'] || 'info',
    environment: process.env['ENVIRONMENT'] || 'local',
    port: Number(process.env['PORT']) || 3000,
}
