const log = (severity, message, data, error) => {
    console.log(JSON.stringify({
        severity,
        message,
        data,
    }, null, 2));

    if (!error) {
        return;
    }

    console.error(error);
};

module.exports = {
    success: (...args) => log('success', ...args),
    info: (...args) => log('info', ...args),
    error: (...args) => log('error', ...args),
    warn: (...args) => log('warn', ...args),
};
