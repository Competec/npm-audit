const fs = require('fs');
const config = require('../config');
const logger = require('./logger');

module.exports = ({tmpDir}) => {
    try {
        if (tmpDir) {
            fs.rmSync(tmpDir, {recursive: true});
        }

        logger.info(`Your audit summary has been created. See file ${config.REPORT_STATS_FILE}`);
    } catch (e) {
        logger.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
    }
};
