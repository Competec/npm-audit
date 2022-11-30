const {JestMockT} = require('jest');
const isSuppressed = require('./isSuppressed');
const logger = require('./logger');

jest.mock('./logger');
const mockedLogger = jest.mocked(logger);

test('should return true', () => {
    const suppressionList =
           [
               {
                   githubAadvisoryId: 'GHSA-hjp8-2cm3-cc45',
                   suppress: {
                       until: '2022-12-31Z',
                       reason: 'Third party',
                   },
               },
               {
                   githubAdvisoryId: 'GHSA-hhq3-ff78-jv3g',
                   suppress: {
                       until: '2023-03-31Z',
                       reason: 'eslint-loader, resolve-url-loader, react-dev-utils',
                   },
               },
           ];

    const auditAdvisory = {
        advisory: {
            findings: 'test',
            github_advisory_id: 'GHSA-hjp8-2cm3-cc45',
        },
    };
    expect(isSuppressed({suppressionList, auditAdvisory})).toBeTruthy();
});

test('should return false', () => {
    const suppressionList =
        [
            {
                githubAadvisoryId: 'GHSA-hjp8-2cm3-cc45',
                suppress: {
                    until: '2022-12-31Z',
                    reason: 'Third party',
                },
            },
        ];

    const auditAdvisory = {
        advisory: {
            findings: 'test',
            github_advisory_id: 'id',
        },
    };

    expect(isSuppressed({suppressionList, auditAdvisory})).toBeFalsy();
});

test('should return a logger with info: An advisory has been found...', () => {
    const suppressionList =
        [
            {
                githubAadvisoryId: 'GHSA-hjp8-2cm3-cc45',
            },
        ];

    const auditAdvisory = {
        advisory: {
            findings: 'test',
            github_advisory_id: 'GHSA-hjp8-2cm3-cc45',
        },
    };

    isSuppressed({suppressionList, auditAdvisory});
    expect(mockedLogger.warn).toMatchSnapshot();
});

test('should return a logger with info: Suppression has expired...', () => {
    const suppressionList =
        [
            {
                githubAadvisoryId: 'GHSA-hjp8-2cm3-cc45',
                suppress: {
                    until: '2021-12-31Z',
                    reason: 'Third party',
                },
            },
        ];

    const auditAdvisory = {
        advisory: {
            findings: 'test',
            github_advisory_id: 'GHSA-hjp8-2cm3-cc45',
        },
    };

    isSuppressed({suppressionList, auditAdvisory});
    expect(mockedLogger.warn).toMatchSnapshot();
});
