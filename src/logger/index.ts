import pino from "pino";
const log = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        messageFormat: '{filename}: {msg}',
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname'
      }
    }
  })
export default log;

