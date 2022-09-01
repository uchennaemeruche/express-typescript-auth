/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createLogger, format, transports } from 'winston';
const { combine, colorize, timestamp, printf } = format;

// eslint-disable-next-line @typescript-eslint/no-shadow
const customFormat = printf(({ level, message, timestamp, label }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(
    colorize(), // Remove color in production
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),

  defaultMeta: {
    service: 'MyService'
  }
});
