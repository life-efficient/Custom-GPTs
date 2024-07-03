// import yaml from 'js-yaml';
// import fs from 'fs';
const yaml = require('js-yaml');
const fs   = require('fs');

// Get document, or throw exception on error
const doc = yaml.load(fs.readFileSync('./actions/drive+cal/action.yml', 'utf8'));
// save to file
fs.writeFileSync('./actions/drive+cal/action.json', JSON.stringify(doc, null, 2));