const rootPath = process.cwd();

module.exports = {
    APP_PREFIX: 'yarn-audit-competec',
    SUPPRESSION_FILE: `${rootPath}/.yarn-audit-competec/suppressions.js`,
    REPORT_RAW_FILE: 'report-raw.txt',
    REPORT_STATS_FILE: `${rootPath}/.yarn-audit-competec/stats.json`,
};
