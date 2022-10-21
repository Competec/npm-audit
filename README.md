This module is built on the original yarn audit command `yarn audit`. With the following additional features:

1. End with a non-zero code, if audit advisories exists for packages in your node-modules
2. Allow suppression of specified advisories for any given module
3. Generate a json file containing the yarn audit summary

## Installation

1. Install the npm audit module (`yarn add yarn-audit-competec`)
2. Add the suppression file
3. Add the following script to your package.json

```
"audit:competec": "yarn audit-competec",
```

## Suppression file

The suppression file `~/.yarn-audit-competec/suppressions.js` should be places in the folder `.yarn-audit-competec`, which should be located at the root of your project and structured as follows:

```
module.exports = {
    list: [
        {
            githubAadvisoryId: 'GHSA-hjp8-2cm3-cc45',
            suppress: {
                until: '2022-12-31Z',
                reason: 'Third party',
            },
        },
        ...more suppression entries
    ],
}
```
* githubAadvisoryId: The Github Advisory ID of the entry you wish to suppress
* suppress.until: The validity of the grace period until this audit is finished with error
* suppress.reason: A note for yourself, to remember why you are suppressing this advisory


## Audit summary
An audit summary is generated in JSON format and is structured as follows:

* ts: The timestamp at which the audit took place
* summary.vulnerabilities: a map of all severity levels found and the frequencies
* summary.dependencies: the number of modules with advisories in the dependencies
* summary.devDependencies: the number of modules with advisories in the devDependencies
* summary.optionalDependencies: the number of modules with advisories in the optionalDependencies
* summary.totalDependencies: the total number of modules with advisories

Example of audit summary:
```
{
  "ts": 1652107729515,
  "summary": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 0,
      "critical": 0
    },
    "dependencies": 4,
    "devDependencies": 0,
    "optionalDependencies": 0,
    "totalDependencies": 4
  }
}
```

Version history

* 1.0.0: Initial release
* 1.0.1: Ignore licence check
