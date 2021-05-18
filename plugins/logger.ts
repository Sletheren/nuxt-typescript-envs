
/**
 * Here we control the level of logging for the application using Winston, Morgan and NewRelic
 * There are 6 levels of logging { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 * For Dev we use INFO, but for prod we care only about errors and above (Using an env variable `NEW_RELIC_LOG_LEVEL`)
 * For Dev we use a custom format for the logs for better visibility
 * In prod, we are using `@newrelic/winston-enricher` to spit a format that can be easily read by NewRelic dashboards
 */

import {createLogger, transports, format} from 'winston';
import newRelicFormatter from '@newrelic/winston-enricher';
  
export default function ({ $config }, inject) {
  const isDev = process.env.NODE_ENV === 'development';
  
  const errorFileTransport = new transports.File({filename: './win-ssr-error.log', level: 'error'});
  const combinedFileTransport = new transports.File({filename: './win-ssr-info.log'});

  // Settings for Development
  const devFormat = format.combine(
    format.colorize({
      all: true,
    }),
    format.errors({ stack: true }),
    format.prettyPrint(),
    format.timestamp({
      format: 'YY-MM-DD HH:MM:SS',
    }),
    format.printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        return `${timestamp} [${level}]: ${message} - ${stack}`;
      }
      return `${timestamp} [${level}]: ${message}`;
    }),
  );
  // Settings for Production
  const prodFormat = format.combine(
    format.timestamp({
      format: 'YY-MM-DD HH:MM:SS',
    }),
    newRelicFormatter(),
  );

  const logger = createLogger({
    exitOnError: false,
    level: 'error',
    format: isDev ? devFormat : prodFormat,
    transports: [
        errorFileTransport,
        combinedFileTransport,
        isDev ?
        new transports.Console() :
        new transports.Stream({
          stream: process.stderr,
        }),
      ]
  });

  inject('logger', logger)
}
 