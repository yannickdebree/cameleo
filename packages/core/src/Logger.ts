import { Injectable } from "./di";
import { isInProduction } from './environment';

@Injectable()
export class Logger {
    info(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.info('(CAMELEO) LOGGER INFO |', message, ...optionalParams)
    }

    error(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.error('(CAMELEO) LOGGER ERROR |', message, ...optionalParams);
    }
}