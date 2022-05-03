const fs = require('fs-extra')
const config = require('../config');

module.exports = ({auditData}) => {
    fs.outputFileSync(
        config.REPORT_STATS_FILE,
        JSON.stringify(auditData, null, 2));
};
