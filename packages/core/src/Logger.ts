import { Injectable } from "./di";
import { isInProduction } from './environment';

@Injectable()
export class Logger {
    info(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.info('(LEO) LOGGER INFO |', message, ...optionalParams)
    }

    error(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.error('(LEO) LOGGER ERROR |', message, ...optionalParams);
    }
}