const getRawData = require('./getRawData');
const writeStats = require('./writeStats');
const isSuppressed = require('./isSuppressed');
const logger = require('./logger');
const config = require('../config');

module.exports = ({suppressionList, tmpDir}) => {
    const rawReportFile = `${tmpDir}/${config.REPORT_RAW_FILE}`;
    try {
        const failedAudits = [];
        const data = getRawData({rawReportFile});
        const auditData = {
            ts: Date.now(),
        };
        data.split(/\r?\n/).forEach((line) => {
            try {
                if (line.length < 2) {
                    return;
                }
                const {
                    type,
                    data,
                } = JSON.parse(line);

                if (type === 'auditAdvisory' && !isSuppressed({
                    suppressionList,
                    auditAdvisory: data,
                })) {
                    failedAudits.push(data);
                }

                if (type !== 'auditSummary') {
                    return;
                }

                auditData.summary = data;
            } catch (error) {
                logger.error('Error parsing audit log line', null, error);
            }
        });

        writeStats({auditData});

        if (failedAudits.length > 0) {
            console.error(`Unhandled advisories were found for ${failedAudits.length} node_modules.`);
            process.exit(1);
        }
    } catch (error) {
        logger.error('Error processing audit logs', null, error);
    }
};
