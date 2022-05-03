const config = require('../config');
const logger = require('./logger');

module.exports = ({auditAdvisory}) => {
    const data = require(config.SUPPRESSION_FILE);

    if (!Array.isArray(data.supressed)) {
        logger.error('Cannot find suppression file in this project.');
        process.exit(1);
    }
    const {advisory} = auditAdvisory;
    const logData = {
        findings: advisory.findings,
        githubAadvisoryId: advisory.github_advisory_id,
    };

    const supressionData = (data?.supressed || []).find(({githubAadvisoryId}) => githubAadvisoryId === advisory.github_advisory_id);

    if (!supressionData?.suppress) {
        logger.error(`An advisory has been found. You can suppress this in ${config.SUPPRESSION_FILE}`, logData)
        return false;
    }

    const isSuppressed = new Date(supressionData.suppress?.until).getTime() > Date.now();

    if (!isSuppressed) {
        logger.error('Suppression has expired!', logData)
    }

    return isSuppressed;
};
