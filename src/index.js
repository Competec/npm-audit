const prepareAudit = require('./utils/prepare-audit');
const processAudit = require('./utils/process-audit');
const cleanupAudit = require('./utils/cleanup-audit');
const config = require('./config');
const logger = require('./utils/logger');

let data;
const main = async () => {
    try {
        data = require(config.SUPPRESSION_FILE);
        // eslint-disable-next-line no-empty
    } catch (e) {}

    if (!data) {
        logger.error(`Cannot find suppression file in this project. Please create one here => ${config.SUPPRESSION_FILE}. See our README.md for more details.`);
        process.exit(1);
    }

    const suppressionList = data?.list;
    if (!Array.isArray(suppressionList)) {
        logger.error(`The suppression file ${config.SUPPRESSION_FILE} is invalid. See our README.md for more details.`);
        process.exit(1);
    }

    try {
        const {
            tmpDir,
        } = await prepareAudit();

        processAudit({
            suppressionList,
            tmpDir,
        });

        cleanupAudit({tmpDir});
    } catch (error) {
        logger.error(`Unknown error occured`, null, error);
    }
};

main();
