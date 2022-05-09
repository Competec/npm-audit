const prepareAudit = require('./utils/prepare-audit');
const processAudit = require('./utils/process-audit');
const cleanupAudit = require('./utils/cleanup-audit');
const config = require('./config');
const logger = require('./utils/logger');

let data;
const main = async () => {
    try {
        data = require(config.SUPPRESSION_FILE);
    } catch (e) {}

    const suppressionList = data?.list;
    if (!Array.isArray(suppressionList)) {
        logger.error(`Cannot find suppression file in this project. Please create one here => ${config.SUPPRESSION_FILE}. See our README.md for more details.`)
        process.exit(1);
        return;
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
        console.error(error);
    }
};

main();
