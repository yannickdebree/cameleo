import { Injectable } from "./di";
import { isInProduction } from './environment';

@Injectable()
export class Logger {
    log(message?: any, ...optionalParams: any[]) {
        console.log('(CAMELEO) LOGGER |', message, ...optionalParams)
    }

    info(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.info('(CAMELEO) LOGGER INFO |', message, ...optionalParams)
    }

    error(message?: any, ...optionalParams: any[]) {
        if (isInProduction()) return;
        console.error('(CAMELEO) LOGGER ERROR |', message, ...optionalParams);
    }
}