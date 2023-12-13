import { createLogger, format, transports } from 'winston'

const { simple } = format 

const levels = { 
    FATAL: 1,
    ERROR: 2,
    WARNING: 3,
    INFO: 4,
    HTTP: 5
}


export default createLogger({
    levels,
    transports: [  
        new transports.Console({
            level: 'HTTP',
            format: simple()
        }),
        new transports.File({
            level: 'ERROR',
            format: simple(),
            filename: './src/log-register/register.log' 
        })
    ]
})