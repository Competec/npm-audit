const getRawData = require('./utils/getRawData');
const writeStats = require('./utils/writeStats');
const isSuppressed = require('./utils/isSuppressed');
const logger = require('./utils/logger');

try {
    const failedAudits = [];
    const data = getRawData();
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

            if (type === 'auditAdvisory' && !isSuppressed({auditAdvisory: data})) {
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
