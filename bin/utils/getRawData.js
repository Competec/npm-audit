const fs = require('fs')
const config = require('../config');
const logger = require('./logger');

module.exports = () => {
    let error = null;
    try {
        if (fs.existsSync(config.REPORT_RAW_FILE)) {
            return fs.readFileSync(config.REPORT_RAW_FILE, 'UTF-8');
        }
    } catch(e) {
        error = e;
    }

    logger.error(`Cannot load raw report file at: ${config.REPORT_RAW_FILE}`, null, error);
    return '';
};
