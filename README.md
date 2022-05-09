This module is built on the original yarn audit command `yarn audit`. With the following additional features:

1. End with a non-zero code, if audit advisories exists for packages in your node-modules
2. Allow suppression of specified advisories for any given module
3. Generate a json file containing the yarn audit summary

## Installation

1. Install the npm audit module (`yarn add @competec/npm-audit`)
2. Add the suppression file
3. Add the following script to your package.json

```
"yarn:audit": "yarn competec-yarn-audit",
```

## Suppression file

The suppression file `.npm-audit-suppressions.js` should be places in the root folder of your project and structured as follows:

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
