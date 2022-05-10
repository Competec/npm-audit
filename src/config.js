const rootPath = process.cwd();

module.exports = {
    APP_PREFIX: 'competec-npm-audit',
    SUPPRESSION_FILE: `${rootPath}/.yarn-audit-competec/suppressions.js`,
    REPORT_RAW_FILE: 'report-raw.txt',
    REPORT_STATS_FILE: `${rootPath}/.yarn-audit-competec/stats.json`,
};
