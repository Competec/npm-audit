const rootPath = process.cwd();

module.exports = {
    rootPath,
    SUPPRESSION_FILE: `${rootPath}/.npm-audit-suppressions.js`,
    REPORT_RAW_FILE: `${rootPath}/npm-audit/.temp/report-raw.txt`,
    REPORT_STATS_FILE: `${rootPath}/npm-audit/.temp/npm-audit-stats.json`,
};
