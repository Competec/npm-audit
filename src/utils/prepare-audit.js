const {exec} = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const config = require('../config');

let tmpDir;
const rootPath = process.cwd();

module.exports = async () => {
    try {
        tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), config.APP_PREFIX));
    } catch {
        throw new Error('Cannot access tmpdir on O.S');
    }

    await new Promise((resolve, reject) => {
        exec(`cd ${rootPath}; yarn audit --level info --json > ${tmpDir}/${config.REPORT_RAW_FILE}`, (error, stdout, stderr) => {
            if (!stderr) {
                resolve();
                return;
            }

            reject(stderr);
        });
    });

    return {
        tmpDir,
    };
};
