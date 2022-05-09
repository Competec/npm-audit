const rootPath = process.cwd();

module.exports = {
    APP_PREFIX: 'competec-npm-audit',
    SUPPRESSION_FILE: `${rootPath}/.npm-audit-suppressions.js`,
    REPORT_RAW_FILE: 'report-raw.txt',
    REPORT_STATS_FILE: `${rootPath}/npm-audit/.temp/npm-audit-stats.json`,
};
