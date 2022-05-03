This module is built on the original yarn audit command. With the following additional features:

1. End with a non-zero code, if audit advisories exists for packages in your node-modules
2. Allow suppression of specified advisories for any given module
3. Generate a json file containing the yarn audit summary

## Installation

You need to add the following script to your package.json

```
"npm:audit": "rm -rf npm-audit/.temp; mkdir -p npm-audit/.temp; yarn audit --level info --json > 'npm-audit/.temp/report-raw.txt'; node npm-audit",
```
