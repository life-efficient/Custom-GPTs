// import yaml from 'js-yaml';
// import fs from 'fs';
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
const actionDir = './actions/sheets/action.yml';
const doc = yaml.load(fs.readFileSync(`${actionDir}`, 'utf8'));
// save to file
fs.writeFileSync(`${actionDir}`.replace('.yml', '.json'), JSON.stringify(doc, null, 2));