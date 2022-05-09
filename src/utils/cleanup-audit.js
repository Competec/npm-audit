const fs = require('fs');
const config = require('../config');

module.exports = ({tmpDir}) => {
    try {
        if (tmpDir) {
            fs.rmSync(tmpDir, {recursive: true});
        }

        console.log(`Your audit summary has been created. See file ${config.REPORT_STATS_FILE}`);
    } catch (e) {
        console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
    }
};
