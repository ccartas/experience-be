const winston = require('winston');
const path = require('path');
const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.align(),
    winston.format.printf(
        info => `[${info.level.toUpperCase()}][${info.timestamp}]: ${info.message}`
    )
);
const logger = winston.createLogger({
    level: 'info',
    format: format,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'application.log') }),
        new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'application_errors.log'), level: 'error'})
    ]
});

module.exports = logger;