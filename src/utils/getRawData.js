const fs = require('fs')
const logger = require('./logger');

module.exports = ({rawReportFile}) => {
    let error = null;
    try {
        if (fs.existsSync(rawReportFile)) {
            return fs.readFileSync(rawReportFile, 'UTF-8');
        }
    } catch(e) {
        error = e;
    }

    logger.error(`Cannot load raw report file at: ${rawReportFile}`, null, error);
    return '';
};
