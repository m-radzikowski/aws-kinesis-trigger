/* eslint-disable @typescript-eslint/ban-types */
import {createLogger, format, Logger, transports} from 'winston';
import {Context} from 'aws-lambda';

const baseLogger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    format: process.env.IS_LOCAL ? format.combine(format.colorize(), format.align(), format.simple()) : format.json(),
    transports: [
        new transports.Console(),
    ],
});

const wrapLogger = (logger: Logger) => ({
    debug: (msg: string, data?: object): Logger => logger.debug(msg, {data}),
    info: (msg: string, data?: object): Logger => logger.info(msg, {data}),
    warn: (msg: string, data?: object): Logger => logger.warn(msg, {data}),
    error: (msg: string, data?: object): Logger => logger.error(msg, {data}),
    winston: logger,
});

export const logger = wrapLogger(baseLogger.child({}));

export const setupLogger = (context?: Context, options?: LoggingOptions): void => {
    baseLogger.defaultMeta = {requestId: context?.awsRequestId};

    if (options?.utilLogsLevel) {
        baseLogger.level = options.utilLogsLevel;
    }
};

export interface LoggingOptions {
    utilLogsLevel?: string;
}
